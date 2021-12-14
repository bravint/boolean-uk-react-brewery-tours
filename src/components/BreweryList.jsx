import BreweryListSearch from "./BreweryListSearch";
import BreweryListItem from "./BreweryListItem";
import PageBar from "./PageBar";

const List = (props) => {
    const {
        selectedState,
        data,
        filteredBreweries,
        page,
        city,
        search,
        type,
        handleSearchFilterChange,
        handleNextPageClick,
        handlePreviousPageClick,
        handleReturnPageClick,
        handleViewBookingsClick,
    } = props;

    const capitalisedStateTitle = selectedState.replace(/\b\w/g, (l) => l.toUpperCase());

    return (
        <>
            <h1>List of Breweries from {capitalisedStateTitle}</h1>
            <BreweryListSearch
                handleSearchFilterChange={handleSearchFilterChange}
                search={search}
            />
            <article>
                <ul className="breweries-list">
                    {filteredBreweries.map((element, index) => {
                        return (
                            <BreweryListItem
                                element={element}
                                index={index}
                                handleViewBookingsClick={
                                    handleViewBookingsClick
                                }
                            />
                        );
                    })}
                </ul>
                <PageBar
                    data={data}
                    page={page}
                    city={city}
                    search={search}
                    type={type}
                    handleNextPageClick={handleNextPageClick}
                    handlePreviousPageClick={handlePreviousPageClick}
                    handleReturnPageClick={handleReturnPageClick}
                />
            </article>
        </>
    );
};

export default List;
