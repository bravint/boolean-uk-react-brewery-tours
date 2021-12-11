const SearchBreweries = (props) => {
    const { handleSearchFilterChange } = props;

    return (
        <form id="search-breweries-form" autoComplete="off">
            <label htmlFor="search-breweries">
                <h2>Search breweries:</h2>
            </label>
            <input
                id="search-breweries"
                name="search-breweries"
                type="text"
                onChange={handleSearchFilterChange}
            />
        </form>
    );
};

export default SearchBreweries;
