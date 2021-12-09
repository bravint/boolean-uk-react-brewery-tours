const Header = (props) => {
    const { handleStateSubmit, handleStateChange } = props;

    return (
        <header className="main-header">
            <section className="select-state-section">
                <h2>Welcome to Brewery Tours</h2>
                <form
                    id="select-state-form"
                    autoComplete="off"
                    onSubmit={handleStateSubmit}
                >
                    <label htmlFor="select-state">
                        Which state are you visiting?
                    </label>
                    <input
                        id="select-state"
                        name="select-state"
                        type="text"
                        onChange={handleStateChange}
                    />
                </form>
            </section>
        </header>
    );
};

export default Header;
