import FilterType from "./FilterType";
import FilterCity from "./FilterCity";

const Filter = (props) => {
    const {
        breweries,
        filteredBreweries,
        city,
        search,
        type,
        defaultTypeFilter,
        handleTypeFilterChange,
        handleCityFilterChange,
        handleClearCityFilterClick,
    } = props;

    return (
        <aside className="filters-section">
            <h2>Filter By:</h2>
            <FilterType
                defaultTypeFilter={defaultTypeFilter}
                handleTypeFilterChange={handleTypeFilterChange}
            />
            <FilterCity
                breweries={breweries}
                filteredBreweries={filteredBreweries}
                city={city}
                search={search}
                type={type}
                handleCityFilterChange={handleCityFilterChange}
                handleClearCityFilterClick={handleClearCityFilterClick}
            />
        </aside>
    );
};

export default Filter;
