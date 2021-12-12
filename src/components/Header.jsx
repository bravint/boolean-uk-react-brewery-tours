import { useState } from "react";

const Header = (props) => {
    const { handleStateSearchSubmit } = props;

    const [stateSearch, setStateSearch] = useState("");

    const handleStateChange = (event) => {
        setStateSearch(event.target.value);
    };

    return (
        <header className="main-header">
            <section className="select-state-section">
                <h2>Welcome to Brewery Tours</h2>
                <form
                    id="select-state-form"
                    autoComplete="off"
                    onSubmit={(event) =>
                        handleStateSearchSubmit(event, stateSearch)
                    }
                >
                    <label htmlFor="select-state">
                        Which state are you visiting?
                    </label>
                    <input
                        id="select-state"
                        name="select-state"
                        type="text"
                        value={stateSearch}
                        onChange={handleStateChange}
                    />
                </form>
            </section>
        </header>
    );
};

export default Header;
