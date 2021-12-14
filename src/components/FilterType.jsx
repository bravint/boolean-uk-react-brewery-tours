function FilterType(props) {
    const { handleTypeFilterChange, initialTypeFilter, capitalisedTitle } = props;

    return (
        <form id="filter-by-type-form" autoComplete="off">
            <label htmlFor="filter-by-type">
                <h3>Type of Brewery</h3>
            </label>
            <select
                name="filter-by-type"
                id="filter-by-type"
                onChange={handleTypeFilterChange}
            >
                <option value="">Select a type...</option>
                {initialTypeFilter.map((element, index) => {
                    return (
                        <option key={index} value={element}>
                            {capitalisedTitle(element)}
                        </option>
                    );
                })}
            </select>
        </form>
    );
}

export default FilterType;
