import { useContext } from 'react';
import AlertContext from './alert/AlertContext';

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return (
    <div
      className={'fixed inset-0 flex items-center justify-center z-100'}
      style={{
        visibility: alert ? 'visible' : 'hidden',
      }}
    >
      <div role="alert" className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{alert?.msg}</span>
      </div>
    </div>
  );
};

export default Alert;
