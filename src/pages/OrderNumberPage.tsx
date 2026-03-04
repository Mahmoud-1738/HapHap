import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../data/menu";
import { getLocaleForLanguage, getUiText } from "../i18n";
import type { LanguageCode } from "../i18n";
import type { SubmittedOrder } from "../types/order";

type OrderNumberPageProps = {
  languageCode: LanguageCode;
  order: SubmittedOrder | null;
  onStartNewOrder: () => void;
};

type OrderNumberLocationState = {
  orderNumber?: string;
};

function OrderNumberPage({ languageCode, order, onStartNewOrder }: OrderNumberPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [secondsLeft, setSecondsLeft] = useState(9);
  const [isPrinting, setIsPrinting] = useState(false);
  const text = getUiText(languageCode);
  const locationState = location.state as OrderNumberLocationState | null;
  const displayOrderNumber = order?.orderNumber ?? locationState?.orderNumber ?? null;
  const receiptDate = order?.createdAt ? new Date(order.createdAt) : new Date();
  const hasValidReceiptDate = Number.isNaN(receiptDate.getTime()) === false;
  const receiptDateLabel = hasValidReceiptDate
    ? receiptDate.toLocaleString(getLocaleForLanguage(languageCode))
    : null;

  useEffect(() => {
    const handleBeforePrint = () => {
      setIsPrinting(true);
    };
    const handleAfterPrint = () => {
      setIsPrinting(false);
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  useEffect(() => {
    if (!displayOrderNumber || isPrinting) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          onStartNewOrder();
          navigate("/");
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [displayOrderNumber, isPrinting, navigate, onStartNewOrder]);

  if (!displayOrderNumber) {
    return <Navigate to="/" replace />;
  }

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <main className="thankyou-screen">
      <div className="thankyou-screen__icon" aria-hidden="true">
        <svg viewBox="0 0 64 64" className="thankyou-screen__icon-svg">
          <circle cx="32" cy="32" r="22" />
          <path d="M22 33.5l7 7L43 26.5" />
        </svg>
      </div>
      <h1>{text.order.thankYou}</h1>
      <p className="thankyou-screen__label">{text.order.orderNumberLabel}</p>
      <div className="thankyou-screen__number">{displayOrderNumber}</div>
      <p className="thankyou-screen__subtitle">{text.order.preparing}</p>
      <p className="thankyou-screen__countdown-label">{text.order.returnToStartIn}</p>
      <p className="thankyou-screen__countdown">
        {secondsLeft} {text.order.seconds}
      </p>
      <button type="button" className="btn btn--primary thankyou-screen__print-btn" onClick={handlePrintReceipt}>
        {text.order.printReceipt}
      </button>

      <section className="receipt-print" aria-hidden="true">
        <h1 className="receipt-print__title">{text.order.receiptTitle}</h1>
        <p className="receipt-print__row">
          <span>{text.order.receiptOrderLabel}</span>
          <strong>{displayOrderNumber}</strong>
        </p>
        {receiptDateLabel && (
          <p className="receipt-print__row">
            <span>{text.order.receiptDateLabel}</span>
            <strong>{receiptDateLabel}</strong>
          </p>
        )}
        <div className="receipt-print__divider" />

        {order && order.items.length > 0 && (
          <ul className="receipt-print__items">
            {order.items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.quantity} {text.order.receiptQtyShort} - {item.name}
                </span>
                <strong>{formatPrice(item.lineTotal, languageCode)}</strong>
              </li>
            ))}
          </ul>
        )}

        {order && (
          <p className="receipt-print__total">
            <span>{text.order.receiptTotalLabel}</span>
            <strong>{formatPrice(order.total, languageCode)}</strong>
          </p>
        )}
      </section>
    </main>
  );
}

export default OrderNumberPage;
