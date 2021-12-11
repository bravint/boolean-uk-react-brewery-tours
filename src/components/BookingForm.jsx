import { useState } from "react";

const BookingForm = (props) => {
    const { element, id, handleBookingClick } = props;

    const initialState = {
        firstName: "",
        lastName: "",
        tourDate: "",
        time: "",
        peopleCount: "",
    };

    const [form, setForm] = useState(initialState);

    const handleBookingFormSubmit = (event) => {
        event.preventDefault();
        console.log(form); //function for challenge 2 replaces
        setForm(initialState);
    };

    const handleBookingFormChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let obj = {};
        obj[name] = value;
        setForm({ ...form, ...obj });
    };

    if (element.id !== id) return null;
    return (
        <section
            className="booking-form-section"
            onSubmit={handleBookingFormSubmit}
        >
            <h3>Book a tour:</h3>
            <form className="booking-form">
                <section className="booking-form-input-container">
                    <div className="booking-form-input-element">
                        <label
                            htmlFor="booking-form-input-firstName"
                            className="booking-form-firstName booking-form-label"
                        >
                            First Name
                        </label>
                        <input
                            id="booking-form-input-firstName"
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleBookingFormChange}
                        />
                    </div>
                    <div className="booking-form-input-element">
                        <label
                            htmlFor="booking-form-input-lastName"
                            className="booking-form-lastName booking-form-label"
                        >
                            Last Name
                        </label>
                        <input
                            id="booking-form-input-lastName"
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleBookingFormChange}
                        />
                    </div>
                </section>
                <section className="booking-form-input-container">
                    <div className="booking-form-input-element">
                        <label
                            htmlFor="booking-form-input-date"
                            className="booking-form-date booking-form-label"
                        >
                            Tour date
                        </label>
                        <input
                            id="booking-form-input-date"
                            type="date"
                            value={form.tourDate}
                            name="tourDate"
                            onChange={handleBookingFormChange}
                        />
                    </div>
                    <div className="booking-form-input-element">
                        <label
                            htmlFor="booking-form-input-time"
                            className="booking-form-label"
                        >
                            Time
                        </label>
                        <input
                            id="booking-form-input-time"
                            type="time"
                            value={form.time}
                            name="time"
                            min="09:00"
                            max="18:00"
                            step="3600"
                            onChange={handleBookingFormChange}
                        />
                    </div>
                </section>
                <section className="booking-form-input-container">
                    <div className="booking-form-input-element">
                        <label className="booking-form-label">No. people</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            name="peopleCount"
                            value={form.peopleCount}
                            onChange={handleBookingFormChange}
                        />
                    </div>
                    <div className="booking-form-input-element">&nbsp;</div>
                </section>
                <div className="booking-form-submit">
                    <button
                        id={element.id}
                        className="booking-btn"
                        onClick={handleBookingClick}
                    >
                        Cancel Booking
                    </button>
                    <input
                        className="booking-form-submit-btn"
                        type="submit"
                        value="Book Now!"
                    />
                </div>
            </form>
        </section>
    );
};

export default BookingForm;
