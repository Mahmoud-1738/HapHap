<?php

declare(strict_types=1);

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

$rawBody = file_get_contents("php://input");
$payload = json_decode($rawBody ?? "", true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Invalid JSON payload"]);
    exit;
}

$orderNumber = (string)($payload["orderNumber"] ?? "");
$total = (float)($payload["total"] ?? 0);
$items = $payload["items"] ?? null;

if ($orderNumber === "" || $total < 0 || !is_array($items) || count($items) === 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Missing or invalid order fields"]);
    exit;
}

$dbHost = getenv("KIOSK_DB_HOST") ?: "mysql_db";
$dbUser = getenv("KIOSK_DB_USER") ?: "root";
$dbPass = getenv("KIOSK_DB_PASSWORD") ?: "";
$dbName = getenv("KIOSK_DB_NAME") ?: "kiosk";
$dbPort = (int)(getenv("KIOSK_DB_PORT") ?: 3306);

$pickupNumber = (int)$orderNumber;
if ($pickupNumber < 0) {
    $pickupNumber = 0;
}
$pickupNumber = $pickupNumber % 256;

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName, $dbPort);
    $mysqli->set_charset("utf8mb4");
    $mysqli->begin_transaction();

    $orderStatement = $mysqli->prepare(
        "INSERT INTO orders (order_status_id, pickup_number, price_total) VALUES (2, ?, ?)"
    );
    $orderStatement->bind_param("id", $pickupNumber, $total);
    $orderStatement->execute();

    $orderId = (int)$mysqli->insert_id;

    $orderLineStatement = $mysqli->prepare(
        "INSERT INTO order_product (order_id, product_id, price) VALUES (?, ?, ?)"
    );
    $insertedLines = 0;

    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }

        $productId = (int)($item["productId"] ?? 0);
        $quantity = (int)($item["quantity"] ?? 0);
        $unitPrice = (float)($item["unitPrice"] ?? 0);

        if ($productId <= 0 || $quantity <= 0 || $unitPrice < 0) {
            continue;
        }

        $linePrice = round($unitPrice * $quantity, 2);
        $orderLineStatement->bind_param("iid", $orderId, $productId, $linePrice);
        $orderLineStatement->execute();
        $insertedLines++;
    }

    if ($insertedLines === 0) {
        throw new RuntimeException("No valid order lines provided");
    }

    $mysqli->commit();

    echo json_encode([
        "ok" => true,
        "orderId" => $orderId,
        "pickupNumber" => $pickupNumber,
    ]);
} catch (Throwable $exception) {
    if (isset($mysqli) && $mysqli instanceof mysqli) {
        $mysqli->rollback();
    }

    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "error" => "Failed to persist order",
        "details" => $exception->getMessage(),
    ]);
}
