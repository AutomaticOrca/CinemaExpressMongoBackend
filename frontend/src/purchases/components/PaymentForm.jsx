import { useEffect } from "react";

function PaymentForm({ updateNextButtonStatus }) {
  const paymentIsValidated = true;
  useEffect(() => {
    // Check if at least one ticket is selected
    const hasTickets = Object.values(paymentIsValidated).some(
      (count) => count > 0
    );
    updateNextButtonStatus(hasTickets);
  }, [paymentIsValidated, updateNextButtonStatus]);
  return <div>PaymentForm</div>;
}

export default PaymentForm;
