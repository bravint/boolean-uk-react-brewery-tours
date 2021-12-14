const PageBar = (props) => {
    const {
        data,
        page,
        search,
        city,
        type,
        handleNextPageClick,
        handlePreviousPageClick,
        handleReturnPageClick,
    } = props;

    const displayPreviousPageButton = () => {
        return page === 1 ? false : true;
    };

    const displayNextPageButton = () => {
        return data.length === 10 ? true : false;
    };

    const displayReturnButton = () => {
        return city.length === 0 && search === "" && type === "" ? false : true;
    };

    return (
        <>
            {!displayReturnButton() && (
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
                    {!displayPreviousPageButton() && <div>&nbsp;</div>}
                    <div>
                        <p className="pageNumber">Page {page}</p>
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
            )}
            {displayReturnButton() && (
                <div className="page-select-options">
                    <button
                        className="page-select-btn"
                        name="previous"
                        onClick={handleReturnPageClick}
                    >
                        Return to Full List
                    </button>
                </div>
            )}
        </>
    );
};

export default PageBar;
