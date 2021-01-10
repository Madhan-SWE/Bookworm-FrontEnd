import Search from "./Search";

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

export default SearchBar;
