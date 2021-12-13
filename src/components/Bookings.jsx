const Bookings = (props) => {

    const { bookings, handleExitBookingsClick } = props
    console.log(bookings)

    const replaceNullPhoneNumbers = (element) => {
        return !element.brewery.phone ? "N/A" : element.brewery.phone;
    };

    return (
        <>
            <section className="bookingsListSection">
            <div className="bookingsHeading"><h2>Bookings</h2></div>
            <br></br>
            <ul className="breweries-list">
                {bookings.map((element, index) => {
                    return (
                        <li key={index}>
                            <div>
                            <h2>Booking Number: {element.id}</h2>
                            </div>
                            <section className="address">
                            <h2>Name: {element.booking.firstName} {element.booking.lastName}</h2>
                                <h3>Booking Details:</h3>
                                <p>Date: {element.booking.tourDate}</p>
                                <p>Time: {element.booking.time}</p>
                                <p>Number of Guests: {element.booking.peopleCount}</p>
                            </section>
                            <section className="phone">
                            <h2>Brewery: {element.brewery.name}</h2>
                                <h3>Brewery Details:</h3>
                                <p>{element.brewery.street}</p>
                                <p>{element.brewery.city}</p>
                                <p>{element.brewery.postal_code}</p>
                                <p>Phone: {replaceNullPhoneNumbers(element)}</p>
                            </section>
                            <div className="booking button-container">
                                <section className="link">
                                </section>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="page-select-options">
                <button
                    className="page-select-btn"
                    name="Exit Bookings"
                    onClick={handleExitBookingsClick}
                >
                    Exit Bookings
                </button>
            </div>
            </section>
        </>
    )
}

export default Bookings