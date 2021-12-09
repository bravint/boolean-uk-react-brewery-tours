import { useState } from "react";
import { useEffect } from "react";

const Filter = (props) => {
    const { defaultTypeFilter, breweries, handleFilterChange } = props;

    const [citiesOptionsList, setCitiesOptionsList] = useState([]);

    useEffect(() => {
        const displayCities = () => {
            let cities = breweries.map((element) => element.city);
            cities = Array.from(new Set(cities));
            setCitiesOptionsList(cities);
        };
        displayCities();
    }, [breweries]);

    return (
        <aside className="filters-section">
            <h2>Filter By:</h2>
            <form id="filter-by-type-form" autocompete="off">
                <label htmlFor="filter-by-type">
                    <h3>Type of Brewery</h3>
                </label>
                <select
                    name="filter-by-type"
                    id="filter-by-type"
                    onChange={handleFilterChange}
                >
                    <option value="">Select a type...</option>
                    {defaultTypeFilter.map((element) => {
                        return <option value={element}>{element}</option>;
                    })}
                </select>
            </form>
            <div className="filter-by-city-heading">
                <h3>Cities</h3>
                <button className="clear-all-btn">clear all</button>
            </div>
            <form id="filter-by-city-form">
                {citiesOptionsList.map((element) => {
                    return (
                        <>
                            <input
                                key={element.id}
                                type="checkbox"
                                name={element}
                                value={element}
                                onChange={handleFilterChange}
                            />
                            <label key={element.id} htmlFor={element}>
                                {element}
                            </label>
                        </>
                    );
                })}
            </form>
        </aside>
    );
};

export default Filter;
