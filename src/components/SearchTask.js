function SearchTask({ handleInputChange, search }) {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search tasks here..."
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
        onChange={handleInputChange}
        value={search}
      />
    </div>
  );
}

export default SearchTask;
