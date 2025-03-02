import { ACTION } from './Action';

const StudentReducer = (state, action) => {
  switch (action.type) {
    case ACTION.GETDATA:
      return {
        ...state,
        studentData: action.payload,
        loading: false,
      };
    case ACTION.ADDDATA:
      return {
        ...state,
        studentData: [...state.studentData, action.payload],
        loading: false,
      };

    case ACTION.DELETEDATA:
      return {
        ...state,
        studentData: state.studentData.filter(
          (student) => student.id != action.payload
        ),
        loading: false,
      };

    case ACTION.UPDATEDATA:
      return {
        ...state,
        studentData: state.studentData.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
        loading: false,
      };

    case ACTION.SETSEARCH:
      return {
        ...state,
        searchData: action.payload,
        loading: false,
      };

    // case ACTION.SEARCHQUERY:
    //   return {
    //     ...state,
    //     allData: action.payload,
    //     loading: false,
    //   };

    case ACTION.SETTOTALPAGES:
      return {
        ...state,
        totalPages: action.payload,
        loading: false,
      };

    case ACTION.SETCURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload,
        loading: false,
      };

    case ACTION.SETLOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default StudentReducer;
