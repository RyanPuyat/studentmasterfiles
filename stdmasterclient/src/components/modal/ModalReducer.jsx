import { MODAL_MODE } from './mode';

const modalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_MODE.OPENMODAL:
      return {
        ...state,
        isOpen: true,
        modalMode: action.payload.mode,
        formData: action.payload.formData || {
          fname: '',
          lname: '',
          course: '',
          studentemail: '',
        },
      };
    case MODAL_MODE.CLOSEMODAL:
      return {
        ...state,
        isOpen: false,
        modalMode: '',
        formData: {
          fname: '',
          lname: '',
          course: '',
          studentemail: '',
        },
      };
    case MODAL_MODE.SETFORMDATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default modalReducer;
