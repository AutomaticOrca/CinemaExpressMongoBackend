import React, { useState } from "react";

const ProgressStepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex justify-between items-center w-full my-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full">
          <div
            className="flex flex-col items-center cursor-pointer mx-8"
            onClick={() => onStepClick(index)}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                index === currentStep
                  ? "bg-ritzBgBlue text-white"
                  : "bg-gray-200 text-ritzBgBlue"
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`text-sm ${
                index === currentStep
                  ? "font-bold text-ritzBgBlue"
                  : "text-ritzBgBlue"
              }`}
            >
              {step}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className="flex-1 border-t-2 mx-8"
              style={{
                borderColor: "#d1d5db",
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressStepper;
