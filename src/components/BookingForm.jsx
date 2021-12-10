import { useState } from "react";

const BookingForm = (props) => {
    const { element, id } = props;

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        tourDate: "",
        time: "",
        peopleCount: "",
    });
    console.log(form);

    const handleBookingFormSubmit = (event) => {
        event.preventDefault();
        console.log(form);
    };

    const handleBookingFormChange = (event) => {
        if (event.target.name === "firstName")
            setForm({ ...form, firstName: event.target.value });
        if (event.target.name === "lastName")
            setForm({ ...form, lastName: event.target.value });
        if (event.target.name === "date")
            setForm({ ...form, date: event.target.value });
        if (event.target.name === "time")
            setForm({ ...form, time: event.target.value });
        if (event.target.name === "peopleCount")
            setForm({ ...form, peopleCount: event.target.value });
    };

    if (element.id !== id) return null;
    return (
        <section className="booking-form" onSubmit={handleBookingFormSubmit}>
            <h3>Book a tour:</h3>
            <form>
                <label>
                    First Name
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleBookingFormChange}
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleBookingFormChange}
                    />
                </label>
                <label>
                    Tour date
                    <input
                        type="date"
                        name="date"
                        value={false}
                        onChange={handleBookingFormChange}
                    />
                </label>
                <label>
                    Time
                    <input
                        type="time"
                        name="time"
                        min="09:00"
                        max="18:00"
                        step="3600"
                        value={form.time}
                        onChange={handleBookingFormChange}
                    />
                </label>
                <label>
                    No. people
                    <input
                        type="number"
                        min="1"
                        max="10"
                        name="peopleCount"
                        value={form.peopleCount}
                        onChange={handleBookingFormChange}
                    />
                </label>
                <input type="submit" value="Book Now!" />
            </form>
        </section>
    );
};

export default BookingForm;

//fix date input
