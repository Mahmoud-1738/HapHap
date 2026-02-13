import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import type { SubmittedOrder } from "../types/order";

type OrderNumberPageProps = {
  order: SubmittedOrder | null;
  onStartNewOrder: () => void;
};

function OrderNumberPage({ order, onStartNewOrder }: OrderNumberPageProps) {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(9);

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
      <h1>BEDANKT VOOR UW BESTELLING!</h1>
      <p className="thankyou-screen__label">UW ORDERNUMMER</p>
      <div className="thankyou-screen__number">{order.orderNumber}</div>
      <p className="thankyou-screen__subtitle">Uw bestelling wordt nu bereid</p>
      <p className="thankyou-screen__countdown-label">Terugkeren naar startscherm in</p>
      <p className="thankyou-screen__countdown">{secondsLeft} seconden</p>
    </main>
  );
}

export default OrderNumberPage;
