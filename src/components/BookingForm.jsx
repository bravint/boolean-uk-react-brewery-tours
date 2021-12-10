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
        let name = event.target.name
        let value = event.target.value
        let obj = {}
        obj[name] = value
        setForm({...form, ...obj});
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
                        //value={form.time}
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
