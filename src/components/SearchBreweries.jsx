const SearchBreweries = (props) => {
    const { handleSearchFilterChange, search } = props;

    return (
        <header className="search-bar">
            <form id="search-breweries-form" autoComplete="off">
                <label htmlFor="search-breweries">
                    <h2>Search breweries:</h2>
                </label>
                <input
                    id="search-breweries"
                    name="search-breweries"
                    type="text"
                    value={search}
                    onChange={handleSearchFilterChange}
                />
            </form>
        </header>
    );
};

export default SearchBreweries;
