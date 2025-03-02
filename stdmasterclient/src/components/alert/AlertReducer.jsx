import { ALERT } from './alert';

const AlertReducer = (state, action) => {
  switch (action.type) {
    case ALERT.SETALERT:
      return action.payload;
    case ALERT.REMOVEALERT:
      return null;
    default:
      return state;
  }
};

export default AlertReducer;
