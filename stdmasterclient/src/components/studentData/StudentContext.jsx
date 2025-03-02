import { createContext, useReducer, useEffect, useCallback } from 'react';
import StudentReducer from './StudentReducer';
import { ACTION } from './Action';
import axios from 'axios';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const initialState = {
    studentData: [],
    searchData: '',
    // allData: [],
    totalPages: 1,
    currentPage: 1,
    loading: false,
  };
  const [state, dispatch] = useReducer(StudentReducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(
    async (page = 1, limit = 10, search = '') => {
      try {
        setLoading();

        const res = await axios.get(
          `/api/student?page=${page}&limit=${limit}&search=${search}`
        );
        const data = res.data.data;

        dispatch({
          type: ACTION.GETDATA,
          payload: data,
        });

        dispatch({
          type: ACTION.SETTOTALPAGES,
          payload: res.data.totalPages,
        });

        dispatch({
          type: ACTION.SETCURRENTPAGE,
          payload: res.data.currentPage,
        });
      } catch (error) {
        console.error('Fetch error:', error);
      }
    },
    [dispatch]
  );

  const addNewData = async (newData) => {
    const res = await axios.post('/api/student', newData, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = res.data.data;
    dispatch({
      type: ACTION.ADDDATA,
      payload: data,
    });

    fetchData(state.totalPages);
  };

  const deleteData = async (id) => {
    if (window.confirm('Are you sure you want to delete this data?')) {
      await axios.delete(`/api/student/${id}`, {
        method: 'DELETE',
      });

      dispatch({
        type: ACTION.DELETEDATA,
        payload: id,
      });
    }
  };

  const editData = async (id, updItem) => {
    try {
      const res = await axios.put(`/api/student/${id}`, updItem, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (res.status !== 200) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.data.data;
      dispatch({
        type: ACTION.UPDATEDATA,
        payload: data,
      });
    } catch (error) {
      console.log('Fetch Error:', error);
    }
  };

  const setSearchData = (data) => {
    dispatch({
      type: ACTION.SETSEARCH,
      payload: data.toLowerCase(),
    });
  };

  const setLoading = () => {
    dispatch({
      type: ACTION.SETLOADING,
    });
  };

  return (
    <StudentContext.Provider
      value={{
        studentData: state.studentData,
        loading: state.loading,
        searchData: state.searchData,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        // allData: state.allData,
        // searchQuery,
        setSearchData,
        fetchData,
        addNewData,
        deleteData,
        editData,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;
