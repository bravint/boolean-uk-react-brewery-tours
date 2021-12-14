/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useEffect } from "react";

const FilterCity = (props) => {
    const {
        breweries,
        filteredBreweries,
        search,
        city,
        type,
        handleClearCityFilterClick,
        handleCityFilterChange,
    } = props;

    const [citiesOptionsList, setCitiesOptionsList] = useState([]);

    useEffect(() => {
        const displayCities = () => {
            let cities = [];
            if (search === "" && type === "") {
                cities = breweries.map((element) => element.city);
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
        <>
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
        </>
    );
};

export default FilterCity;
