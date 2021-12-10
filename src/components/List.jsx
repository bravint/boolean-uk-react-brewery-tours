import { useState } from "react";
import SearchBreweries from "./SearchBreweries";
import BookingForm from "./BookingForm";

const List = (props) => {
    const { selectedState, filteredBreweries, handleSearchFilterChange } = props;

    const [id, setId] = useState(null);

    const handleBookingClick = (event) => {
        setId(event.target.id);
    };

    return (
        <>
            <h1>List of Breweries from {selectedState}</h1>
            <header className="search-bar">
                <SearchBreweries
                    handleSearchFilterChange={handleSearchFilterChange}
                />
            </header>
            <article>
                <ul className="breweries-list">
                    {filteredBreweries.map((element) => {
                        return (
                            <li key={element.id}>
                                <h2>{element.name}</h2>
                                <div className="type">
                                    {element.brewery_type}
                                </div>
                                <section className="address">
                                    <h3>Address:</h3>
                                    <p>{element.street}</p>
                                    <p>
                                        <strong>
                                            {element.city},{element.postal_code}
                                        </strong>
                                    </p>
                                </section>
                                <section className="phone">
                                    <h3>Phone:</h3>
                                    <p>{element.phone}</p>
                                </section>
                                <section className="booking">
                                    <button
                                        id={element.id}
                                        onClick={handleBookingClick}
                                    >
                                        Book a tour
                                    </button>
                                </section>
                                <section className="link">
                                    <a
                                        href={element.website_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Visit Website
                                    </a>
                                </section>
                                {id && (
                                <BookingForm element={element} id={id} />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </article>
        </>
    );
};

export default List;
