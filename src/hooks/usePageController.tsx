import { useEffect, useState } from "react";

function usePageController(numOfSteps: number) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [maxStepIndex, setMaxStepIndex] = useState(currentStepIndex);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === numOfSteps - 1;

  useEffect(() => {
    setMaxStepIndex(Math.max(currentStepIndex, maxStepIndex));
    // eslint-disable-next-line
  }, [currentStepIndex]);

  const next = () => {
    setCurrentStepIndex((prev) => {
      if (prev >= numOfSteps - 1) return prev;
      return prev + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goTo = (target: number) => {
    if (target <= currentStepIndex || maxStepIndex >= target)
      setCurrentStepIndex(target);
  };

  return {
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    back,
    goTo,
  };
}

export default usePageController;
