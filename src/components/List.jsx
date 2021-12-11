import { useState } from "react";
import SearchBreweries from "./SearchBreweries";
import BookingForm from "./BookingForm";

const List = (props) => {
    const {
        selectedState,
        data,
        filteredBreweries,
        page,
        handleSearchFilterChange,
        handleNextPageClick,
        handlePreviousPageClick,
    } = props;

    const [id, setId] = useState(null);

    const handleBookingClick = (event) => {
        return id !== event.target.id ? setId(event.target.id) : setId("");
    };

    const capitalisedStateTitle =
        selectedState.charAt(0).toUpperCase() + selectedState.slice(1);

    const displayPreviousPageButton = () => {
        return page === 0 ? false : true;
    };

    const displayNextPageButton = () => {
        return page * 10 + 10 >= data.length ? false : true;
    };

    const replaceNullPhoneNumbers = (element) => {
        return !element.phone ? "N/A" : element.phone;
    };

    const removeNullWebsiteLinks = (element) => {
        return !element.website_url ? false : true;
    };

    const removeBookingBtn = (element) => {
        return id === element.id ? false : true;
    };

    const pageMaxCount = () => {
        return Math.ceil(data.length/10)
    }

    return (
        <>
            <h1>List of Breweries from {capitalisedStateTitle}</h1>
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
                                            {element.city},{" "}
                                            {element.postal_code}
                                        </strong>
                                    </p>
                                </section>
                                <section className="phone">
                                    <h3>Phone:</h3>
                                    <p>{replaceNullPhoneNumbers(element)}</p>
                                </section>
                                <div className="booking button-container">
                                    <section>
                                        {removeBookingBtn(element) && (
                                            <button
                                                id={element.id}
                                                className="booking-btn"
                                                onClick={handleBookingClick}
                                            >
                                                Book a tour
                                            </button>
                                        )}
                                        {!removeBookingBtn(element) && (
                                            <button
                                                id={element.id}
                                                className="disabledButton"
                                            >
                                                Booking tour...
                                            </button>
                                        )}
                                    </section>
                                    <section className="link">
                                        {removeNullWebsiteLinks(element) && (
                                            <a
                                                href={element.website_url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Visit Website
                                            </a>
                                        )}
                                        {!removeNullWebsiteLinks(element) && (
                                            <button className="disabledButton">
                                                No Website
                                            </button>
                                        )}
                                    </section>
                                </div>
                                <div>
                                    {id && (
                                        <BookingForm
                                            handleBookingClick={
                                                handleBookingClick
                                            }
                                            element={element}
                                            id={id}
                                        />
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className="page-select-options">
                    {displayPreviousPageButton() && (
                        <button
                            className="page-select-btn"
                            name="previous"
                            onClick={handlePreviousPageClick}
                        >
                            Previous Page
                        </button>
                    )}
                    {!displayPreviousPageButton() && <div></div>}
                    <div>
                        <p className="pageNumber">Page {page+1} of {pageMaxCount()}</p>
                    </div>
                    {displayNextPageButton() && (
                        <button
                            className="page-select-btn"
                            name="next"
                            onClick={handleNextPageClick}
                        >
                            Next Page
                        </button>
                    )}
                    {!displayNextPageButton() && <div>&nbsp;</div>}
                </div>
            </article>
        </>
    );
};

export default List;
