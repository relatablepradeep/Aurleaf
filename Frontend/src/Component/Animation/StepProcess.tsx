import React, { useState } from 'react';

const  StepProcess = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1-based indexing (1 to 4)
  
  const steps = [
    { 
      number: 1, 
      title: "Login", 
      description: "Create an account or sign in to get started."
    },
    { 
      number: 2, 
      title: "Tell Us About You", 
      description: "Enter your health details & lifestyle preferences."
    },
    { 
      number: 3, 
      title: "Get Your Plan", 
      description: "AI generates a personalized diet & workout plan for you."
    },
    { 
      number: 4, 
      title: "Start Your Journey", 
      description: "Follow the plan and track your progress!"
    }
  ];

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Vertical Progress Indicator */}
        <div className="relative md:w-1/3">
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="flex items-start mb-8 relative cursor-pointer"
                onClick={() => handleStepClick(step.number)}
              >
                {/* Vertical line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-4 top-10 w-1 bg-gray-200 h-full -ml-px">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500" 
                      style={{ 
                        height: currentStep > step.number ? '100%' : '0%'
                      }}
                    />
                  </div>
                )}
                
                {/* Step circle */}
                <div className={`
                  rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold z-10
                  transition-all duration-300 shrink-0
                  ${currentStep >= step.number 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'}
                  ${currentStep === step.number ? 'ring-4 ring-blue-200' : ''}
                `}>
                  {step.number}
                </div>
                
                {/* Step content */}
                <div className="ml-4 flex-grow">
                  <h3 className={`
                    font-medium text-base sm:text-lg
                    ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}
                  `}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Current Step Content */}
        <div className="md:w-2/3">
          <div className="mb-8 p-4 sm:p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {currentStep}. {steps[currentStep-1].title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {steps[currentStep-1].description}
            </p>
            
            {/* Placeholder for step content */}
            <div className="h-32 mt-4 flex items-center justify-center rounded-lg bg-gray-100 border border-dashed border-gray-300">
              <p className="text-gray-500">Content for step {currentStep}</p>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button 
              onClick={handlePrev} 
              className={`px-3 sm:px-6 py-2 rounded font-medium text-sm sm:text-base ${
                currentStep === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            
            <button 
              onClick={handleNext} 
              className={`px-3 sm:px-6 py-2 rounded font-medium text-sm sm:text-base ${
                currentStep === 4 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {currentStep === 4 ? 'Get Started!' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProcess;