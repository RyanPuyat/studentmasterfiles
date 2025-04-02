import { useContext, useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import Search from '../search/Search';
import Pagination from '../pagination/Pagination';
import TableItem from './TableItem';
import Loading from '../shared/Loading';
import StudentContext from './studentData/StudentContext';

const TableList = () => {
  const {
    studentData,
    setSearchData,
    searchData,
    loading,
    fetchData,
    currentPage,
    totalPages,
    error,
  } = useContext(StudentContext);

  const [currentPages, setCurrentPages] = useState(currentPage);

  useEffect(() => {
    fetchData(currentPages, 10);
  }, [currentPages, fetchData]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchData(value);
      setCurrentPages(currentPages);
    }, 100),
    [setSearchData]
  );

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPages(page);
  };

  const filteredData = studentData.filter(
    (student) =>
      student.id.toString().includes(searchData) ||
      student.fname.toLowerCase().includes(searchData) ||
      student.lname.toLowerCase().includes(searchData)
  );

  if (!loading && !error) {
    return (
      <>
        <Search searchValue={searchData} handleSearch={handleSearch} />

        <div className="overflow-x-auto mt-10 flex justify-center">
          <div className="w-full max-w-7xl overflow-y-hidden p-10">
            <table className="table">
              <thead className="text-center border-2  border-gray-600 bg-blue-300 text-black text-lg">
                <tr>
                  <th className="px-3 py-3 ">First Name</th>
                  <th className="px-3 py-3 ">Course</th>
                  <th className="px-3 py-3 ">Last Name</th>
                  <th className="px-3 py-3 ">Email</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredData.length > 0 ? (
                  filteredData.map((data) => (
                    <TableItem key={data.id} data={data} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination
          currentPage={currentPages}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  } else if (loading) {
    return (
      // <div className="flex flex-col justify-center items-center h-full">
      //   <Loading />
      //   <p>Fetching data please wait . . .</p>
      // </div>
      <>
        <div className="flex flex-col justify-center items-center h-full relative">
          <div className="flex justify-center items-center flex-grow">
            <Loading />
          </div>
          <p className="absolute bottom-5 text-center">
            Fetching data, please wait . . .
          </p>
        </div>
      </>
    );
  } else if (error) {
    return (
      <>
        <div className="flex justify-center items-center h-full mt-10">
          <p>⛔️ {error}</p>
        </div>
      </>
    );
  }
};

export default TableList;
