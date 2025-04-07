import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const StepProcess = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: "Login", description: "Create an account or sign in to get started." },
    { number: 2, title: "Tell Us About You", description: "Enter your health details & lifestyle preferences." },
    { number: 3, title: "Get Your Plan", description: "AI generates a personalized diet & workout plan for you." },
    { number: 4, title: "Start Your Journey", description: "Follow the plan and track your progress!" }
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
    <div className="w-full mx-auto p-6 bg-gradient-to-t from-gray-950 via-gray-950 to-transparent rounded-lg shadow-lg text-gray-100">
      <div className="flex flex-col md:flex-row gap-8">
        
      
        <div className="relative md:w-1/3">
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="flex items-start mb-8 relative cursor-pointer"
                onClick={() => handleStepClick(step.number)}
              >
               
                {index < steps.length - 1 && (
                  <div className="absolute left-4 top-10 w-1 bg-gray-800 h-full -ml-px">
                    <div 
                      className="h-full bg-green-400 transition-all duration-500" 
                      style={{ height: currentStep > step.number ? '100%' : '0%' }}
                    />
                  </div>
                )}
                
               
                <div className={`rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold 
                  transition-all duration-300 shrink-0 border-2
                  ${currentStep >= step.number ? 'bg-green-500 text-black border-green-300' : 'bg-gray-800 text-gray-400 border-gray-600'}
                  ${currentStep === step.number ? 'ring-4 ring-green-400/50' : ''}`}>
                  {step.number}
                </div>
                
              
                <div className="ml-5 flex-grow">
                  <h3 className={`text-lg font-bold tracking-wide transition-colors 
                    ${currentStep >= step.number ? 'text-green-400' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
     
        <div className="md:w-2/3">
          <div className="mb-8 p-6 border border-gray-800 rounded-lg bg-gray-900 shadow-md">
            <h2 className="text-2xl font-extrabold text-green-400 tracking-wide mb-2">
              {currentStep}. {steps[currentStep-1].title}
            </h2>
            <p className="text-sm text-gray-300">
              {steps[currentStep-1].description}
            </p>
            
            <div className="h-32 mt-4 flex items-center justify-center rounded-lg bg-gray-800 border border-dashed border-gray-600">
              <p className="text-gray-400">  
                Login/Signup


              </p>




              <SignedOut>
        <SignInButton />
      </SignedOut>
      
      <SignedIn>
        <UserButton />
      </SignedIn>

            </div>
          </div>
          
        
          <div className="flex justify-between">
            <button 
              onClick={handlePrev} 
              className={`px-4 py-2 rounded-md font-medium text-sm sm:text-base transition-all duration-300 border 
                ${currentStep === 1 
                  ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed' 
                  : 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'}
              `}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            
            <button 
              onClick={handleNext} 
              className={`px-4 py-2 rounded-md font-medium text-sm sm:text-base transition-all duration-300 border 
                ${currentStep === 4 
                  ? 'bg-green-500 text-black border-green-400 hover:bg-green-400' 
                  : 'bg-green-400 text-black border-green-300 hover:bg-green-300'}
              `}
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
