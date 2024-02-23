import {useState} from "react";

const Autocomplete = () => {
  const [query, setQuery] = useState('')
  const handleSearchInput = (e) => {
    setQuery(e.target.value)
  }
  return (
    <input className="border border-gray-200/50 w-72 px-3 py-3.5 outline-4 outline-blue-600 outline-offset-4 rounded-xl"
           type="text" value={query} placeholder="Search..."
           onChange={handleSearchInput}/>
  )
}

export default Autocomplete;
