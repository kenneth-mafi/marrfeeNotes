import './searchBar.css';
import searchIcon from '../../assets/search.png';

const SearchBar = ({ searchContent, onSearchChange }) => {
    return (
        <div className="search-box-contr">
        <input 
            className='search-box'
            type="search" 
            name="search" 
            id="search"
            placeholder='Find notes'
            value={searchContent}
            onChange={onSearchChange}     
        />
        {!searchContent && <img src={searchIcon} alt="search" className="search-icon" />}
        </div>
    )
}
export default SearchBar;