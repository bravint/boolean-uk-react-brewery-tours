import { useState } from "react";
import { useEffect } from "react";

import Header from "./components/Header";
import Filter from "./components/Filter";
import List from "./components/List";

export default function App() {
    const defaultTypeFilter = ["Micro", "Regional", "Brewpub"];
    let breweryCounter = 0;

    const [selectedState, setSelectedState] = useState("");

    const [data, setData] = useState([]);
    const [breweries, setBreweries] = useState([]);
    const [filteredBreweries, setFilteredBreweries] = useState([]);
    const [index, setIndex] = useState(0);
    //const [page, setPage] = useState("");
    const [search, setSearch] = useState("");
    const [city, setCity] = useState([]);
    const [type, setType] = useState("");

    console.log("States: ", {
        data,
        breweries,
        selectedState,
        type,
        filteredBreweries,
        search,
        city,
        index
    });

    useEffect(() => {
        if (!selectedState) return;
        const fetchBreweries = async () => {
            try {
                const response = await fetch(
                    `https://api.openbrewerydb.org/breweries?by_state=${selectedState}&per_page=50`
                );
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBreweries();
    }, [selectedState]);

    useEffect(() => {
        nextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        let filteredArray = breweries.filter((brewery) => filterBreweries(brewery, 0, 10));
        setFilteredBreweries(filteredArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breweries, city, type, search]);

    const nextPage = () => {
        let newArray = []
        if (index >= 49) return
        for (let i = index; i < data.length; i++) {
            let brewery = filterBreweries(data[i], i, 10)
            if(brewery) newArray.push(brewery)
            if (newArray.length === 10 || (newArray.length > 1 && i === data.length-1)) {
                if (newArray.length !== 10 && i === data.length-1) setIndex(i)
                setBreweries(newArray);
            }
        }
    }

    const previousPage = () => {
        let newArray = []
        if (index <= 0) return
        for (let i = index; i < data.length; i--) {
            if (i < 0) return
            let brewery = filterBreweries(data[i], i, 20)
            if(brewery) newArray.push(brewery)
            if (newArray.length === 20 || (newArray.length > 10 && i === 0)) {
                for (let j = 0; j < 10; j++) {
                    newArray.shift() 
                } 
                newArray=sortArray(newArray)
                setBreweries(newArray);
            }
        }
    }

    //FML LENNI WHAT A PITA

    const sortArray = (array) => {
        const compare = (a ,b) => {
            return (a.name < b.name ? -1 : (a.name >  b.name ?  1 : 0))
        }
        return array.sort(compare)
    }

    const filterBreweries = (brewery, index = 0, limit) => {
        if (filterByType(brewery) && filterByCity(brewery) && filterBySearch(brewery) && breweryCounter < limit) {
            breweryCounter++;
            if (breweryCounter === 10 && index) setIndex(index)
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

    const handlePageClick = (event) => {
        //console.log(event)
        //let newPage = page
        return ((event.target.name === 'next') ? nextPage() : previousPage())
    }

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
                        breweries={breweries}
                    />
                    <List
                        selectedState={selectedState}
                        filteredBreweries={filteredBreweries}
                        handleSearchFilterChange={handleSearchFilterChange}
                        handlePageClick={handlePageClick}
                    />
                </main>
            )}
        </>
    );
}
