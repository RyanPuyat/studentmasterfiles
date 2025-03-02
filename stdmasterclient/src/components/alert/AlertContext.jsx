import { createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer';
import { ALERT } from './Alert';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type) => {
    dispatch({
      type: ALERT.SETALERT,
      payload: { msg, type },
    });
    setTimeout(() => dispatch({ type: ALERT.REMOVEALERT }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
