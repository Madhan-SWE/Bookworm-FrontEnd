import Card from "./Card";

function Cards({ selectedBooks, itemsPerPage, currentPage }) {
    let end = currentPage * itemsPerPage;
    end = end > selectedBooks.length ? selectedBooks.length : end;
    let start = (currentPage - 1) * itemsPerPage;
    let booksObj = selectedBooks.slice(start, end);

    if (selectedBooks.length === 0) {
        return (
            <div className="row m-2">
                <div className="col-12">
                    <div
                        className="alert alert-danger text-center text-bold "
                        role="alert"
                    >
                        <h5>No results found !</h5>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="row m-3">
                <div className="col-12">
                    <div
                        className="alert alert-success text-center text-bold "
                        role="alert"
                    >
                        <h5>{selectedBooks.length} results found</h5>
                    </div>
                </div>

                {booksObj.map((book) => {
                    return <Card bookDetails={book} />;
                })}
            </div>
        </div>
    );
}

export default Cards;
