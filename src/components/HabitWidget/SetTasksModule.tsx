import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { setTasksDay } from '../../api';
import './HabitWidget.css';

type ButtonStatus = 'normal' | 'loading' | 'success' | 'error';

export function SetTasksModule() {
  const { currentDate } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>('normal');

  const handleButtonClick = () => {
    if (buttonStatus === 'loading') return;
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (!currentDate?.date) return;
    
    setShowConfirmation(false);
    setButtonStatus('loading');

    try {
      await setTasksDay(currentDate.date);
      setButtonStatus('success');
      setTimeout(() => setButtonStatus('normal'), 2000);
    } catch (error) {
      console.error('Failed to set tasks:', error);
      setButtonStatus('error');
      setTimeout(() => setButtonStatus('normal'), 2000);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const getButtonClass = () => {
    switch (buttonStatus) {
      case 'loading':
        return 'set-tasks-module__button--loading';
      case 'success':
        return 'set-tasks-module__button--success';
      case 'error':
        return 'set-tasks-module__button--error';
      default:
        return '';
    }
  };

  return (
    <section className="set-tasks-module" aria-label="Task setup">
      {showConfirmation && (
        <div className="set-tasks-module__confirmation">
          <p className="set-tasks-module__confirmation-text">
            set tasks for today?
          </p>
          <div className="set-tasks-module__confirmation-actions">
            <button
              type="button"
              className="set-tasks-module__confirmation-btn"
              onClick={handleConfirm}
            >
              yes
            </button>
            <button
              type="button"
              className="set-tasks-module__confirmation-btn"
              onClick={handleCancel}
            >
              no
            </button>
          </div>
        </div>
      )}
      
      <button
        type="button"
        className={`set-tasks-module__button ${getButtonClass()}`}
        onClick={handleButtonClick}
        disabled={buttonStatus === 'loading'}
      >
        {buttonStatus === 'loading' ? (
          <span className="set-tasks-module__loader"></span>
        ) : (
          <>
            set
            <br />
            tasks
          </>
        )}
      </button>
    </section>
  );
}

