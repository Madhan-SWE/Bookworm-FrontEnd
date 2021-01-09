function Pagination(props) {
    let selectedBooks = props.selectedBooks;
    let itemsPerPage = props.itemsPerPage;
    let currentPage = props.currentPage;
    let totalPages = Math.ceil(selectedBooks.length / itemsPerPage);
    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start <= 0) {
        start = 1;
        end = start + 4;
    }

    if (end > totalPages) {
        end = totalPages;
    }

    if (totalPages === 0) {
        return <ul></ul>;
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {(function () {
                    if (currentPage === 1) {
                        return (
                            <li className="page-item disabled" key="prev">
                                <a className="page-link" tabIndex="-1">
                                    Previous
                                </a>
                            </li>
                        );
                    } else {
                        return (
                            <li className="page-item" key="prev">
                                <a
                                    className="page-link"
                                    onClick={props.changePage}
                                >
                                    Previous
                                </a>
                            </li>
                        );
                    }
                })()}
                {(function () {
                    let pages = [];
                    for (let i = start; i <= end; i++) {
                        if (i != currentPage) {
                            pages.push(
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        key={i}
                                        onClick={props.changePage}
                                    >
                                        {i}
                                    </a>
                                </li>
                            );
                        } else {
                            pages.push(
                                <li className="page-item active" key={i}>
                                    <a className="page-link">{i}</a>
                                </li>
                            );
                        }
                    }
                    return pages;
                })()}
                {(function () {
                    if (currentPage === totalPages) {
                        return (
                            <li className="page-item disabled" key="next">
                                <a className="page-link" tabIndex="-1">
                                    Next
                                </a>
                            </li>
                        );
                    } else {
                        return (
                            <li className="page-item" key="next">
                                <a
                                    className="page-link"
                                    onClick={props.changePage}
                                >
                                    Next
                                </a>
                            </li>
                        );
                    }
                })()}
            </ul>
        </nav>
    );
}

export default Pagination;