import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUiText } from "../i18n";
import type { LanguageCode } from "../i18n";
import type { SubmittedOrder } from "../types/order";

type OrderNumberPageProps = {
  languageCode: LanguageCode;
  order: SubmittedOrder | null;
  onStartNewOrder: () => void;
};

function OrderNumberPage({ languageCode, order, onStartNewOrder }: OrderNumberPageProps) {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(9);
  const text = getUiText(languageCode);

  useEffect(() => {
    if (!order) {
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
  }, [navigate, onStartNewOrder, order]);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="thankyou-screen">
      <div className="thankyou-screen__icon">OK</div>
      <h1>{text.order.thankYou}</h1>
      <p className="thankyou-screen__label">{text.order.orderNumberLabel}</p>
      <div className="thankyou-screen__number">{order.orderNumber}</div>
      <p className="thankyou-screen__subtitle">{text.order.preparing}</p>
      <p className="thankyou-screen__countdown-label">{text.order.returnToStartIn}</p>
      <p className="thankyou-screen__countdown">
        {secondsLeft} {text.order.seconds}
      </p>
    </main>
  );
}

export default OrderNumberPage;
