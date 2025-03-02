const Search = ({ searchValue, handleSearch }) => {
  return (
    <div className="flex justify-center items-center mt-4 ">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearch}
          className="input input-bordered w-100 md:-64 lg:w-96 my-2"
        />
        <div>
          <button className="absolute top-0 right-0 rounded-l-none btn btn-primary my-2">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
