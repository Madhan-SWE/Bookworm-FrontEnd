import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import "./index.css";

// import SearchBar from './components/SearchBar'

function Search({
    changeSearchText,
    searchText,
    changeSelectedBooks,
    changeNoOfItems,
    removeSuggestionText,
}) {
    // const [text, setText] = useState(searchText);

    function handleOnChange(event) {
        let value = event.target.value;
        changeSearchText(value);
    }

    function search() {
        console.log("---", searchText);
        changeSelectedBooks(searchText);
        removeSuggestionText();
    }

    function clear(){
      changeSearchText('');
      // changeSelectedBooks(searchText);
      // search();

    }
    function handleOnChangeNoOfItems(event) {
        let NoOfItems = event.target.value;
        if (NoOfItems !== "Choose items per page") changeNoOfItems(NoOfItems);
        else changeNoOfItems(6);
    }

    return (
        <div className="row m-2">
            <div className="col-4 offset-2 text-center">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">
                            <i class="fa fa-search" aria-hidden="true">
                                {" "}
                            </i>
                        </span>
                    </div>
                    <input
                        type="text"
                        type="text"
                        className="form-control"
                        placeholder="Enter your query here!"
                        onChange={handleOnChange}
                        value={searchText}
                        className="form-control"
                        required
                    />
                </div>
                {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Book name here"
                    onChange={handleOnChange}
                    value={searchText}
                /> */}
            </div>
            <div className="col-2">
                <button
                    type="button"
                    class="btn btn-success m-1"
                    onClick={search}
                > Search
                </button>
                <button
                    type="button"
                    class="btn btn-danger m-1"
                    onClick={clear}
                > Clear
                </button>
            </div>
            <div className="col-2">
                <select
                    id="inputState"
                    className="form-control"
                    onChange={handleOnChangeNoOfItems}
                >
                    <option selected>Choose items per page</option>
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                </select>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <div className="titleSection text-center">
            <h6 className="appTitle">
                {" "}
                2021 <i class="fa fa-copyright" aria-hidden="true"></i>{" "}
                FindMyBook
            </h6>
        </div>
    );
}

function SearchBar({
    changeSearchText,
    searchText,
    changeSelectedBooks,
    changeNoOfItems,
    removeSuggestionText,
}) {
    return (
        <div className="titleSection text-center">
            <h1 className="appTitle">FindMyBook</h1>
            <Search
                changeSearchText={changeSearchText}
                searchText={searchText}
                changeSelectedBooks={changeSelectedBooks}
                changeNoOfItems={changeNoOfItems}
                removeSuggestionText={removeSuggestionText}
            />
        </div>
    );
}

function Card({ bookDetails }) {
    let bookRating =
        bookDetails.website === "Snapdeal"
            ? bookDetails.rating / 20
            : bookDetails.rating / 10;
    let bgcolor = "bg-success p-1 m-1";
    if (bookRating < 3) {
        bgcolor = "bg-danger p-1 m-1";
    }

    return (
        <div className="col-lg-4 col-sm-6 cols mb-2">
            <div className="card text-center">
                <a href={bookDetails.buyingUrl}>
                    <img
                        className="card-img-top"
                        src={bookDetails.img}
                        alt={bookDetails.name}
                        style={{ height: "400px" }}
                    />
                </a>
                <div className="card-header">{bookDetails.name}</div>
                <div className="card-body text-center">
                    <h6>{bookDetails.author}</h6>
                    <h6>
                        <span className={bgcolor} style={{color: "white"}}>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            {bookRating}
                        </span>
                        {bookDetails.totalRatings}
                    </h6>
                    <h6>
                        <span
                            style={{
                                textDecorationLine: "line-through",
                                textDecorationStyle: "solid",
                            }}
                        >
                            {bookDetails.price}
                        </span>
                        {bookDetails.finalPrice}
                    </h6>
                    <h6 className="text-center">
                        <a href={bookDetails.buyingUrl} className="link"> Buy Now</a>
                    </h6>
                    <div class="card-footer text-muted">
                        <h6 className="text-center"> {bookDetails.website}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

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

function AutoSuggestions({ suggestionText, booksList, changeSearchTextOnly }) {
    function handleOnClick(event) {
        let text = event.target.innerText;
        changeSearchTextOnly(text);
        return <div></div>;
    }

    if (suggestionText.length === 0) {
        return <div></div>;
    }

    let res = booksList.filter((item) => {
        return JSON.stringify(item)
            .toLowerCase()
            .includes(suggestionText.toLowerCase());
    });

    return (
        <div className="autoSuggestions">
            {res.map((item) => {
                return (
                    <h6 className="suggestion" onClick={handleOnClick}>
                        {item.name}
                    </h6>
                );
            })}
        </div>
    );

    // return (
    //     <div className="autoSuggestions">
    //                 {
    //                   res.map(book=>{
    //                     return <h6> {book.name} </h6>
    //                   })
    //                 }
    //     </div>
    // );
}

var BACKENDURL = "http://localhost:3500";

function App() {
    const [booksList, setBooksList] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [suggestionText, setSuggestionText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPersPage] = useState(6);

    function doFetch() {
        console.log("Fetching Data: ");
        const fetchURL = BACKENDURL + "/books";
        fetch(fetchURL)
            .then((res) => res.json())
            .then((res) => {
                setBooksList(res.body);
                setSelectedBooks(res.body);
                setCurrentPage(1);
            });
    }

    useEffect(doFetch, []);

    function changeSearchText(text) {
        setSearchText(text);
        setSuggestionText(text);
    }

    function changeSearchTextOnly(text) {
        setSearchText(text);
        setSuggestionText("");
    }

    function removeSuggestionText() {
        setSuggestionText("");
    }

    function changeSelectedBooks(searchText) {
        let res = booksList.filter((item) => {
            return JSON.stringify(item)
                .toLowerCase()
                .includes(searchText.toLowerCase());
        });
        setCurrentPage(1);
        setSelectedBooks(res);
    }

    const changeNoOfItems = (value) => {
        setCurrentPage(1);
        setItemsPersPage(value);
    };

    const changePage = (event) => {
        let changedPage = event.target.innerText;

        if (changedPage === "Next") {
            setCurrentPage(currentPage + 1);
        } else if (changedPage === "Previous") {
            setCurrentPage(currentPage - 1);
        } else {
            changedPage = parseInt(changedPage);
            setCurrentPage(changedPage);
        }
    };

    return (
        <div className="container-fluid">
            <SearchBar
                changeSearchText={changeSearchText}
                searchText={searchText}
                changeSelectedBooks={changeSelectedBooks}
                changeNoOfItems={changeNoOfItems}
                removeSuggestionText={removeSuggestionText}
            />
            <AutoSuggestions
                suggestionText={suggestionText}
                booksList={booksList}
                changeSearchTextOnly={changeSearchTextOnly}
            />
            <Cards
                selectedBooks={selectedBooks}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
            />
            <Pagination
                selectedBooks={selectedBooks}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                changePage={changePage}
            />
            <Footer />
        </div>
    );
}

export default App;
