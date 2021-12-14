import { useState } from "react";

import BookingForm from "./BookingForm";

const ListItem = (props) => {
    const { element, index, handleViewBookingsClick } = props;

    const [id, setId] = useState(null);

    const replaceNullPhoneNumbers = (element) => {
        return !element.phone ? "N/A" : element.phone;
    };

    const removeNullWebsiteLinks = (element) => {
        return !element.website_url ? false : true;
    };

    const removeBookingBtn = (element) => {
        return id === element.id ? false : true;
    };

    const handleBookingClick = (event) => {
        return id !== event.target.id ? setId(event.target.id) : setId("");
    };

    return (
        <li key={index}>
            <h2>{element.name}</h2>
            <div className="type">{element.brewery_type}</div>
            <section className="address">
                <h3>Address:</h3>
                <p>{element.street}</p>
                <p>
                    <strong>
                        {element.city}, {element.postal_code}
                    </strong>
                </p>
            </section>
            <section className="phone">
                <h3>Phone:</h3>
                <p>{replaceNullPhoneNumbers(element)}</p>
            </section>
            <div className="booking button-container">
                <section>
                    <button
                        id={element.id}
                        className="booking-btn"
                        onClick={handleViewBookingsClick}
                    >
                        View Bookings
                    </button>
                </section>
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
                        <button id={element.id} className="disabledButton">
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
                        <button className="disabledButton">No Website</button>
                    )}
                </section>
            </div>
            <div>
                {id && (
                    <BookingForm
                        handleBookingClick={handleBookingClick}
                        element={element}
                        id={id}
                    />
                )}
            </div>
        </li>
    );
};

export default ListItem;
