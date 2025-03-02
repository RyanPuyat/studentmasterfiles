import { createContext, useReducer } from 'react';
import modalReducer from './ModalReducer';
import { MODAL_MODE } from './mode';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const initialState = {
    modalMode: MODAL_MODE.ADDMODE,
    isOpen: false,
    formData: {
      fname: '',
      lname: '',
      course: '',
      studentemail: '',
    },
  };

  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (mode, formData) => {
    dispatch({ type: MODAL_MODE.OPENMODAL, payload: { mode, formData } });
    // console.log('open');
  };

  const closeModal = () => {
    dispatch({ type: MODAL_MODE.CLOSEMODAL });
  };

  const setFormData = (updatedFields) => {
    dispatch({ type: MODAL_MODE.SETFORMDATA, payload: updatedFields });
  };

  return (
    <ModalContext.Provider
      value={{ state, openModal, closeModal, setFormData }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
