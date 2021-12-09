import { useState } from "react";
import { useEffect } from "react";

import Header from "./components/Header";
import Filter from "./components/Filter";
import List from "./components/List";

export default function App() {
    
    const defaultTypeFilter = ["Micro", "Regional", "Brewpub"];

    const [stateSearch, setStateSearch] = useState("");
    const [selectedState, setSelectedState] = useState("");

    const [breweries, setBreweries] = useState([]);
    //const [filteredBreweries, setFilteredBreweries] = useState([]);

    //const [search, setSearch] = useState("");
    //const [city, setCity] = useState([]);
    const [type, setType] = useState(defaultTypeFilter);

    console.log("States: ", { breweries, selectedState, type });

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

    const handleStateSearchSubmit = (event) => {
        event.preventDefault();
        setSelectedState(stateSearch);
    };

    const handleStateSearchChange = (event) => {
        setStateSearch(event.target.value);
    };

    const handleFilterChange = (event) => {
        //console.log(event.target.value);
        if (event.target.name === "filter-by-type") setType([event.target.value])
        
        //let newArray = [event.target.value]
        //setType(newArray)
    };

    return (
        <>
            <Header
                handleStateSubmit={handleStateSearchSubmit}
                handleStateChange={handleStateSearchChange}
            />
            {selectedState && (
                <main>
                    <Filter
                        breweries={breweries}
                        defaultTypeFilter={defaultTypeFilter}
                        handleFilterChange={handleFilterChange}
                    />
                    <List />
                </main>
            )}
        </>
    );
}
