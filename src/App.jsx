/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useEffect } from "react";

import Header from "./components/Header";
import Filter from "./components/Filter";
import List from "./components/List";

export default function App() {
    const defaultTypeFilter = ["Micro", "Brewpub", "Regional"];
    let breweryCounter = 0;

    const [selectedState, setSelectedState] = useState("");

    const [data, setData] = useState([]);
    const [breweries, setBreweries] = useState([]);
    const [filteredBreweries, setFilteredBreweries] = useState([]);

    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [city, setCity] = useState([]);
    const [type, setType] = useState("");

    const [bookings, setBookings] = useState([])

    console.log("States: ", {
        breweries,
        selectedState,
        type,
        filteredBreweries,
        search,
        city,
        page,
    });

    useEffect(() => {
        if (!selectedState) return;
        const fetchBreweries = async () => {
            try {
                const response = await fetch(
                    `https://api.openbrewerydb.org/breweries?by_state=${selectedState}&per_page=50`
                );
                const data = await response.json();
                clearFilters();
                setPage(0);
                let breweryArray = data.filter((element) => filterBreweries(element, data.length));
                setData(breweryArray);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBreweries();
    }, [selectedState]);

    useEffect(() => {
        console.log('useEffect, setBreweries')
        clearFilters();
        setBreweries(changePage(data, page));
    }, [data, page]);

    useEffect(() => {
        console.log('useEffect, setFilteredBreweries')
        setFilteredBreweries(changePage(breweries));
    }, [breweries, city, type, search]);

    const changePage = (array, pageNumber = 0) => {
        let newArray = [];
        let startingIndex = pageNumber * 10;
        for (let i = startingIndex; i < array.length; i++) {
            let brewery = filterBreweries(array[i], 10);
            if (brewery) newArray.push(brewery);
        }
        return newArray;
    };

    const clearFilters = () => {
        setSearch("");
        setCity([]);
        setType("");
    };

    const filterBreweries = (brewery, limit) => {
        if (
            filterByType(brewery) &&
            filterByCity(brewery) &&
            filterBySearch(brewery) &&
            breweryCounter < limit
        ) {
            breweryCounter++;
            return brewery;
        }
    };

    const filterByType = (brewery) => {
        if (brewery.brewery_type === type) return true;
        if ((brewery.brewery_type === "micro" || brewery.brewery_type === "regional" || brewery.brewery_type === "brewpub") && type === "") return true;
    };

    const filterByCity = (brewery) => {
        if (city.includes(brewery.city) || city.length < 1) return true;
    };

    const filterBySearch = (brewery) => {
        let breweryName = brewery.name.toLowerCase();
        let breweryCity = brewery.city.toLowerCase();
        let searchTerm = search.toLowerCase();
        if (breweryName.includes(searchTerm) || breweryCity.includes(searchTerm) || search === "") return true;
    };

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
                setCity(
                    newArray.filter((element) => element !== event.target.value)
                );
            } else {
                setCity([...city, event.target.value]);
            }
        }
    };

    const handleClearCityFilterClick = () => {
        setCity([]);
    };

    const handleSearchFilterChange = (event) => setSearch(event.target.value);

    const handleNextPageClick = () => {
        let newPage = page;
        newPage++;
        setPage(newPage);
    };

    const handlePreviousPageClick = () => {
        let newPage = page;
        newPage--;
        setPage(newPage);
    };

    const handleReturnPageClick = () => {
        clearFilters();
    }

    const handleViewBookingsClick = () => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/bookings`
                );
                const data = await response.json();
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookings()
    }

    return (
        <>
            <Header handleStateSearchSubmit={handleStateSearchSubmit} />
            {selectedState && (
                <main>
                    <Filter
                        breweries={breweries}
                        filteredBreweries={filteredBreweries}
                        city={city}
                        search={search}
                        type={type}
                        defaultTypeFilter={defaultTypeFilter}
                        handleTypeFilterChange={handleTypeFilterChange}
                        handleCityFilterChange={handleCityFilterChange}
                        handleClearCityFilterClick={handleClearCityFilterClick}
                    />
                    <List
                        selectedState={selectedState}
                        data={data}
                        filteredBreweries={filteredBreweries}
                        page={page}
                        city={city}
                        search={search}
                        type={type}
                        handleSearchFilterChange={handleSearchFilterChange}
                        handleNextPageClick={handleNextPageClick}
                        handlePreviousPageClick={handlePreviousPageClick}
                        handleReturnPageClick={handleReturnPageClick}
                        handleViewBookingsClick={handleViewBookingsClick}
                    />
                </main>
            )}
        </>
    );
}
