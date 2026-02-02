import './searchBar.css';
import searchIcon from '../../assets/search.png';

const SearchBar = ({ search, setSearch, onSearch }) => {
    return (
        <div className="search-box-contr">
        <input 
            className='search-box'
            type="search" 
            name="" 
            id=""
            placeholder='Find notes'
            value={search}
            onChange={(event) => { setSearch(event.target.value) }}     
        />
        <img src={searchIcon} alt="search" className="search-icon" onClick={onSearch}/>
        </div>
    )
}
export default SearchBar;