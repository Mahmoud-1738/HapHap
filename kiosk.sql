-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 04 feb 2026 om 10:59
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiosk`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`) VALUES
(1, 'Breakfast', 'Breakfast'),
(2, 'Lunch & Dinner', 'Lunch & Dinner'),
(3, 'Handhelds', 'Handhelds'),
(4, 'Sides & Small Plates', 'Sides & Small Plates'),
(5, 'Signature Dips', 'Signature Dips'),
(6, 'Drinks', 'Drinks');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `images`
--

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `images`
--

INSERT INTO `images` (`image_id`, `filename`, `description`) VALUES
(1, 'Morning_Boost.webp', 'Morning Boost Açaí Bowl'),
(2, 'the_Garden_Breakfast_Warp.webp', 'The Garden Breakfast Wrap (V)'),
(3, 'Overnight_Oats.webp', 'Overnight Oats: Apple Pie Style (VG)'),
(4, 'Peanut_Butter&Cacao_Toast.webp', 'Peanut Butter & Cacao Toast (VG)');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_status_id` int(11) NOT NULL,
  `pickup_number` tinyint(3) UNSIGNED NOT NULL,
  `price_total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `order_product`
--

CREATE TABLE `order_product` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `order_status`
--

INSERT INTO `order_status` (`order_status_id`, `description`) VALUES
(1, 'Started'),
(2, 'Placed and paid'),
(3, 'Preparing'),
(4, 'Ready for pickup'),
(5, 'Picked up');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `kcal` int(11) DEFAULT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `image_id`, `name`, `description`, `price`, `kcal`, `available`) VALUES
(1, 1, 1, 'Morning Boost Açaí Bowl (VG)', 'A chilled blend of açaí and banana topped with crunchy granola, chia seeds, and coconut.', 7.50, 320, 1),
(3, 1, 2, 'The Garden Breakfast Wrap (V)', 'Whole-grain wrap with fluffy scrambled eggs, baby spinach, and a light yogurt-herb sauce.', 6.50, 280, 1),
(4, 1, 4, 'Peanut Butter & Cacao Toast (VG)', 'Sourdough toast with 100% natural peanut butter, banana, and a sprinkle of cacao nibs.', 5.00, 240, 1),
(5, 1, 3, 'Overnight Oats: Apple Pie Style (VG)', 'Oats soaked in almond milk with grated apple, cinnamon, and crushed walnuts.', 5.50, 290, 1),
(6, 2, NULL, 'Tofu Power Tahini Bowl (VG)', 'Tri-color quinoa, maple-glazed tofu, roasted sweet potatoes, and kale with tahini dressing.', 10.50, 480, 1),
(7, 2, NULL, 'The Supergreen Harvest (VG)', 'Massaged kale, edamame, avocado, cucumber, and toasted pumpkin seeds with lemon-olive oil.', 9.50, 310, 1),
(8, 2, NULL, 'Mediterranean Falafel Bowl (VG)', 'Baked falafel, hummus, pickled red onions, cherry tomatoes, and cucumber on a bed of greens.', 10.00, 440, 1),
(9, 2, NULL, 'Warm Teriyaki Tempeh Bowl (VG) ', 'Steamed brown rice, seared tempeh, broccoli, and shredded carrots with a ginger-soy glaze.', 11.00, 500, 1),
(10, 3, NULL, 'Zesty Chickpea Hummus Wrap (VG)', 'Spiced chickpeas, shredded carrots, crisp lettuce, and signature hummus in a whole-wheat wrap.', 8.50, 410, 1),
(11, 3, NULL, 'Smoky BBQ Jackfruit Slider (VG)', 'Pulled jackfruit in BBQ sauce with a crunchy purple slaw on a vegan brioche bun.', 7.50, 350, 1),
(14, 3, NULL, 'Avocado & Halloumi Toastie (V)', 'Grilled halloumi cheese, smashed avocado, and chili flakes on thick-cut multi-grain bread.', 9.00, 460, 1),
(15, 4, NULL, 'Oven-Baked Sweet Potato Wedges (VG) ', 'Seasoned with smoked paprika. (Best with Avocado Lime Dip).', 4.50, 260, 1),
(16, 4, NULL, 'Zucchini Fries (V)', 'Crispy breaded zucchini sticks. (Best with Greek Yogurt Ranch).', 4.50, 190, 1),
(17, 4, NULL, 'Baked Falafel Bites - 5pcs (VG)', NULL, 5.00, 230, 1),
(18, 4, NULL, 'Mini Veggie Platter & Hummus (VG)', 'Fresh crunch: Celery, carrots, and cucumber.', 4.00, 160, 1),
(19, 5, NULL, 'Classic Hummus (VG)', NULL, 1.00, 120, 1),
(20, 5, NULL, 'Avocado Lime Crema (VG)', NULL, 1.00, 110, 1),
(21, 5, NULL, 'Greek Yogurt Ranch (V)', NULL, 1.00, 90, 1),
(22, 5, NULL, 'Spicy Sriracha Mayo (VG) ', NULL, 1.00, 180, 1),
(23, 5, NULL, 'Peanut Satay Sauce (VG)', NULL, 1.00, 200, 1),
(24, 6, NULL, 'Green Glow Smoothie', 'Spinach, pineapple, cucumber, and coconut water.', 3.50, 120, 1),
(25, 6, NULL, 'Iced Matcha Latte ', 'Lightly sweetened matcha green tea with almond milk.', 3.00, 90, 1),
(26, 6, NULL, 'Fruit-Infused Water', 'Freshly infused water with a choice of lemon-mint, strawberry-basil, or cucumber-lime.', 1.50, 0, 1),
(27, 6, NULL, 'Berry Blast Smoothie', 'A creamy blend of strawberries, blueberries, and raspberries with almond milk.', 3.80, 140, 1),
(28, 6, NULL, 'Citrus Cooler', 'A refreshing mix of orange juice, sparkling water, and a hint of lime.', 3.00, 90, 1);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexen voor tabel `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexen voor tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_orders_status` (`order_status_id`),
  ADD KEY `idx_orders_datetime` (`datetime`),
  ADD KEY `idx_orders_pickup` (`pickup_number`);

--
-- Indexen voor tabel `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `fk_op_product` (`product_id`);

--
-- Indexen voor tabel `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`order_status_id`);

--
-- Indexen voor tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `fk_products_category` (`category_id`),
  ADD KEY `fk_products_image` (`image_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `order_status`
--
ALTER TABLE `order_status`
  MODIFY `order_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT voor een tabel `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_status` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`) ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `fk_op_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_op_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_products_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
