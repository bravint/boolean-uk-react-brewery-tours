import FilterType from "./FilterType";
import FilterCity from "./FilterCity";

const Filter = (props) => {
    const {
        breweries,
        filteredBreweries,
        city,
        search,
        type,
        initialTypeFilter,
        capitalisedTitle,
        handleTypeFilterChange,
        handleCityFilterChange,
        handleClearCityFilterClick,
    } = props;

    return (
        <aside className="filters-section">
            <h2>Filter By:</h2>
            <FilterType
                initialTypeFilter={initialTypeFilter}
                handleTypeFilterChange={handleTypeFilterChange}
                capitalisedTitle={capitalisedTitle}
            />
            <FilterCity
                breweries={breweries}
                filteredBreweries={filteredBreweries}
                city={city}
                search={search}
                type={type}
                initialTypeFilter={initialTypeFilter}
                handleCityFilterChange={handleCityFilterChange}
                handleClearCityFilterClick={handleClearCityFilterClick}
            />
        </aside>
    );
};

export default Filter;
