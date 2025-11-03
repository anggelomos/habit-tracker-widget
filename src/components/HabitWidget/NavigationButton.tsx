import { ArrowIcon } from './icons';
import { useApp } from '../../context/AppContext';
import { getCurrentDateUTC5 } from '../../utils/dateUtils';

type NavigationButtonProps = {
  direction: 'previous' | 'next';
};

export function NavigationButton({ direction }: NavigationButtonProps) {
  const { currentDate, setCurrentDate } = useApp();
  const isPrevious = direction === 'previous';
  
  // Check if current date is today or in the future
  const isFutureDisabled = () => {
    if (!currentDate?.date || isPrevious) return false;
    
    const today = getCurrentDateUTC5();
    const currentDateOnly = new Date(currentDate.date);
    
    // Set time to midnight for comparison
    today.setHours(0, 0, 0, 0);
    currentDateOnly.setHours(0, 0, 0, 0);
    
    // Disable if current date is today or later
    return currentDateOnly >= today;
  };
  
  const isDisabled = isFutureDisabled();
  
  const handleClick = async () => {
    if (!currentDate?.date || isDisabled) return;
    
    // Calculate new date
    const newDate = new Date(currentDate.date);
    if (isPrevious) {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    
    // Update date and fetch new data
    await setCurrentDate(newDate);
  };
  
  return (
    <button
      className={`habit-widget__nav nav--${direction} ${isDisabled ? 'habit-widget__nav--disabled' : ''}`}
      aria-label={`${isPrevious ? "Previous" : "Next"} day`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <ArrowIcon
        direction={isPrevious ? "left" : "right"}
      />
    </button>
  );
}

