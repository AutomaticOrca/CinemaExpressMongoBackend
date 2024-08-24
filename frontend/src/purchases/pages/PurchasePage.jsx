import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import Menu from "../components/Menu";
import ProgressStepper from "../../shared/components/UIElements/ProgressStepper";
import TicketMenu from "../components/TicketsMenu";
import Cart from "../components/Cart";
import PaymentForm from "../components/PaymentForm";
import Button from "../../shared/components/UIElements/Button";
import SuccessPurchased from "../components/SuccessPurchased";

function PurchasePage() {
  const [countdown, setCountdown] = useState(5);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  // const steps = ["Tickets", "Cart", "Payment", "Success"];
  // const [currentStep, setCurrentStep] = useState(0);
  // const [isNextDisabled, setIsNextDisabled] = useState(true);

  // const handleStepClick = (index) => {
  //   setCurrentStep(index);
  // };

  // const handleNextButton = () => {
  //   setCurrentStep(currentStep + 1);
  // };

  // const updateNextButtonStatus = (status) => {
  //   setIsNextDisabled(!status);
  // };

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            navigate("/auth");
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <>
        {" "}
        <p>Please log in to buy tickets.</p>
        <p>You will be redirected to the login page in {countdown} seconds.</p>
      </>
    );
  }
  return (
    <div>
      <Menu />
      {/* <ProgressStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      <div className="mt-8">
        {currentStep === 0 && (
          <TicketMenu updateNextButtonStatus={updateNextButtonStatus} />
        )}
        {currentStep === 1 && <Cart />}
        {currentStep === 2 && (
          <PaymentForm updateNextButtonStatus={updateNextButtonStatus} />
        )}
        {currentStep === 4 && <SuccessPurchased />}
        {currentStep < steps.length - 1 && (
          <Button
            onClick={handleNextButton}
            className="mt-4"
            disabled={isNextDisabled}
          >
            Next
          </Button>
        )}
      </div> */}
    </div>
  );
}

export default PurchasePage;
