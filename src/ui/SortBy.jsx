import { useSearchParams } from "react-router-dom"
import Select from "./Select"

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  
  return (
    <Select options={options} value={searchParams.get('sortBy') || 'name-asc'} onChange={handleChange} />
  )
}

export default SortBy
