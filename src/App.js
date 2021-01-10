import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import "./index.css";
import SearchBar from "./components/SearchBar";
import AutoSuggestions from "./components/AutoSuggestions";
import Cards from "./components/Cards";
import Footer from "./components/Footer";

var BACKENDURL = "http://localhost:3500";

function App() {
    const [booksList, setBooksList] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [suggestionText, setSuggestionText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPersPage] = useState(6);

    function doFetch() {
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
