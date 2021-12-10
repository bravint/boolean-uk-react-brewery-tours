import { useState } from "react";
import { useEffect } from "react";

import Header from "./components/Header";
import Filter from "./components/Filter";
import List from "./components/List";

export default function App() {
    const defaultTypeFilter = ["Micro", "Regional", "Brewpub"];
    let breweryCounter = 0;

    const [selectedState, setSelectedState] = useState("");
    const [breweries, setBreweries] = useState([]);
    const [filteredBreweries, setFilteredBreweries] = useState([]);

    const [search, setSearch] = useState("");
    const [city, setCity] = useState([]);
    const [type, setType] = useState("");

    console.log("States: ", {
        breweries,
        selectedState,
        type,
        filteredBreweries,
        search,
        city,
    });

    useEffect(() => {
        if (!selectedState) return;
        const fetchBreweries = async () => {
            try {
                const response = await fetch(
                    `https://api.openbrewerydb.org/breweries?by_state=${selectedState}`
                );
                const data = await response.json();
                setBreweries(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBreweries();
    }, [selectedState]);

    useEffect(() => {
        let filteredArray = breweries.filter((brewery) => filterBreweries(brewery));
        setFilteredBreweries(filteredArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breweries, city, type, search]);

    const filterBreweries = (brewery) => {
        if (filterByType(brewery) && filterByCity(brewery) && filterBySearch(brewery) && breweryCounter < 10) {
            breweryCounter++;
            return brewery;
        }
    };

    const filterByType = (brewery) => {
        if (brewery.brewery_type === type) return true;
        if ((brewery.brewery_type === "micro" || brewery.brewery_type === "regional" || brewery.brewery_type === "brewpub") && type === "") return true;
    }

    const filterByCity = (brewery) => {
        if (city.includes(brewery.city) || city.length < 1) return true;
    }

    const filterBySearch = (brewery) => {
        let breweryName = brewery.name.toLowerCase();
        let breweryCity = brewery.city.toLowerCase();
        let searchTerm = search.toLowerCase();
        if (breweryName.includes(searchTerm) || breweryCity.includes(searchTerm) || search === "") return true;
    }

    const handleStateSearchSubmit = (event, state) => {
        event.preventDefault();
        setSelectedState(state);
    };

    const handleTypeFilterChange = (event) => {
        setType(event.target.value.toLowerCase());
    };

    const handleCityFilterChange = (event) => {
        if (event.target.name === "filter-by-city") {
            if (city.includes(event.target.value)) {
                let newArray = [...city];
                setCity(newArray.filter((element) => element !== event.target.value));
            } else {
                setCity([...city, event.target.value]);
            }
        }
        if (event.target.name === "clear-all-cities") setCity([]);
    };

    const handleSearchFilterChange = event => setSearch(event.target.value);

    return (
        <>
            <Header
                handleStateSearchSubmit={handleStateSearchSubmit}
            />
            {selectedState && (
                <main>
                    <Filter
                        filteredBreweries={filteredBreweries}
                        city={city}
                        defaultTypeFilter={defaultTypeFilter}
                        handleTypeFilterChange={handleTypeFilterChange}
                        handleCityFilterChange={handleCityFilterChange}
                    />
                    <List
                        selectedState={selectedState}
                        filteredBreweries={filteredBreweries}
                        handleSearchFilterChange={handleSearchFilterChange}
                    />
                </main>
            )}
        </>
    );
}
