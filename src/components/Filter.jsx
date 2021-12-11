/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useEffect } from "react";

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

    const [citiesOptionsList, setCitiesOptionsList] = useState([]);

    useEffect(() => {
        const displayCities = () => {
            let cities = []
            if (search==="" && type==="") {
                cities = breweries.map((element) => element.city)
            } else {
                cities = filteredBreweries.map((element) => element.city);
            }    
            cities = Array.from(new Set(cities));
            setCitiesOptionsList(cities);
        };
        displayCities();
    }, [breweries, filteredBreweries]);

    const checkChecked = (element) => {
        return city.includes(element) ? true : false;
    };

    return (
        <aside className="filters-section">
            <h2>Filter By:</h2>
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
                    {defaultTypeFilter.map((element, index) => {
                        return (
                            <option key={index} value={element}>
                                {element}
                            </option>
                        );
                    })}
                </select>
            </form>
            <div className="filter-by-city-heading">
                <h3>Cities</h3>
                <button
                    className="clear-all-btn"
                    name="clear-all-cities"
                    onClick={handleClearCityFilterClick}
                >
                    clear all
                </button>
            </div>
            <form id="filter-by-city-form">
                {citiesOptionsList.map((element, index) => {
                    return (
                        <>
                            <input
                                key={index}
                                id={element}
                                type="checkbox"
                                name="filter-by-city"
                                value={element}
                                checked={checkChecked(element)}
                                onChange={handleCityFilterChange}
                            />
                            <label htmlFor={element}>{element}</label>
                        </>
                    );
                })}
            </form>
        </aside>
    );
};

export default Filter;
