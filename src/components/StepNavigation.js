import React from 'react';
import Button from './Button';

const StepNavigation = ({ onPrev, onNext, prevDisabled = false, nextDisabled = false }) => {
  return (
    <div className="step-navigation">
      <Button 
        secondary 
        onClick={onPrev} 
        className="w-auto" 
        icon="arrow-left"
        disabled={prevDisabled}
      >
        上一步
      </Button>
      <Button 
        onClick={onNext} 
        className="w-auto" 
        icon="arrow-right"
        disabled={nextDisabled}
      >
        下一步
      </Button>
    </div>
  );
};

export default StepNavigation; 