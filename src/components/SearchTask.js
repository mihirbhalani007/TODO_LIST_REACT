

function SearchTask({ handleInputChange, search }) {
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks here..."
        className="border border-black rounded p-2 mr-2 w-full focus:outline-none focus:border-blue-500 mb-5"
        onChange={handleInputChange}
        value={search}
      />
    </div>
  );
}

export default SearchTask;
