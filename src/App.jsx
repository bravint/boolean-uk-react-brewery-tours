/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useEffect } from "react";

import Header from "./components/Header";
import Filters from "./components/Filters";
import BreweryList from "./components/BreweryList";
import Bookings from "./components/Bookings";

export default function App() {
    const initialTypeFilter = ["micro", "brewpub", "regional"];

    const [selectedState, setSelectedState] = useState("");
    const [data, setData] = useState([]);
    const [breweries, setBreweries] = useState([]);
    const [filteredBreweries, setFilteredBreweries] = useState([]);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [city, setCity] = useState([]);
    const [type, setType] = useState(initialTypeFilter);

    const [bookings, setBookings] = useState([]);
    const [showBookings, setShowBookings] = useState(false);

    console.log("States: ", {
        selectedState,
        data,
        breweries,
        filteredBreweries,
        page,
        search,
        city,
        type,
        bookings,
        showBookings
    });

    useEffect(() => {
        setPage(1);
    }, [selectedState]);

    useEffect(() => {
        if (!selectedState) return;
        const fetchBreweries = async () => {
            try {
                const response = await fetch(
                    `https://api.openbrewerydb.org/breweries?by_state=${selectedState}&per_page=10&page=${page}`
                );
                const data = await response.json();
                setData(data);
                clearFilters();
                const filteredArray = data.filter((element) => filterBreweries(element));
                setBreweries(filteredArray);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBreweries();
    }, [selectedState, page]);

    useEffect(() => {
        const filteredArray = breweries.filter((element) => filterBreweries(element));
        setFilteredBreweries(filteredArray);
    }, [breweries, city, type, search]);

    const clearFilters = () => {
        setSearch("");
        setCity([]);
        setType(initialTypeFilter);
    };

    const filterBreweries = (brewery) => {
        if (filterByType(brewery) && filterByCity(brewery) && filterBySearch(brewery)) return brewery;
    };

    const filterByType = (brewery) => {
        if (type.includes(brewery.brewery_type)) return true;
    };

    const filterByCity = (brewery) => {
        if (city.includes(brewery.city) || city.length < 1) return true;
    };

    const filterBySearch = (brewery) => {
        const breweryName = brewery.name.toLowerCase();
        const breweryCity = brewery.city.toLowerCase();
        const searchTerm = search.toLowerCase();
        if (breweryName.includes(searchTerm) || breweryCity.includes(searchTerm) || search === "") return true;
    };

    const capitalisedTitle = (element) => element.replace(/\b\w/g, (l) => l.toUpperCase());

    const handleStateSearchSubmit = (event, state) => {
        event.preventDefault();
        setSelectedState(state);
    };

    const handleTypeFilterChange = (event) => {
        return event.target.value === "" ? setType(initialTypeFilter) : setType([event.target.value.toLowerCase()]);
    }

    const handleCityFilterChange = (event) => {
        if (event.target.name === "filter-by-city") {
            if (city.includes(event.target.value)) {
                let newArray = [...city];
                setCity(newArray.filter((element) => element !== event.target.value));
            } else {
                setCity([...city, event.target.value]);
            }
        }
    };

    const handleClearCityFilterClick = () => setCity([]);

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

    const handleReturnPageClick = () => clearFilters();

    const handleViewBookingsClick = () => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`http://localhost:4000/bookings`);
                const data = await response.json();
                setShowBookings(true);
                setBookings(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookings();
    };
    
    const handleExitBookingsClick = () => setShowBookings(false);

    return (
        <>
            <Header handleStateSearchSubmit={handleStateSearchSubmit} />
            {selectedState && showBookings === false && (
                <main>
                    <>
                        <Filters
                            breweries={breweries}
                            filteredBreweries={filteredBreweries}
                            city={city}
                            search={search}
                            type={type}
                            initialTypeFilter={initialTypeFilter}
                            capitalisedTitle={capitalisedTitle}
                            handleTypeFilterChange={handleTypeFilterChange}
                            handleCityFilterChange={handleCityFilterChange}
                            handleClearCityFilterClick={handleClearCityFilterClick}
                        />
                        <BreweryList
                            selectedState={selectedState}
                            data={data}
                            breweries={breweries}
                            filteredBreweries={filteredBreweries}
                            page={page}
                            city={city}
                            search={search}
                            type={type}
                            capitalisedTitle={capitalisedTitle}
                            handleSearchFilterChange={handleSearchFilterChange}
                            handleNextPageClick={handleNextPageClick}
                            handlePreviousPageClick={handlePreviousPageClick}
                            handleReturnPageClick={handleReturnPageClick}
                            handleViewBookingsClick={handleViewBookingsClick}
                        />
                    </>
                </main>
            )}
            {showBookings === true && (
                <Bookings
                    bookings={bookings}
                    handleExitBookingsClick={handleExitBookingsClick}
                />
            )}
        </>
    );
}
