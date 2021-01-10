function Search({
    changeSearchText,
    searchText,
    changeSelectedBooks,
    changeNoOfItems,
    removeSuggestionText,
}) {
    function handleOnChange(event) {
        let value = event.target.value;
        changeSearchText(value);
    }

    function search() {
        changeSelectedBooks(searchText);
        removeSuggestionText();
    }

    function clear() {
        changeSearchText("");
    }
    function handleOnChangeNoOfItems(event) {
        let NoOfItems = event.target.value;
        if (NoOfItems !== "Choose items per page") changeNoOfItems(NoOfItems);
        else changeNoOfItems(3);
    }

    return (
        <div className="row m-2">
            <div className="col-12 col-md-4 offset-md-2 text-center">
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
            </div>
            <div className="col-12 col-md-3">
                <button
                    type="button"
                    class="btn btn-success m-1"
                    onClick={search}
                >
                    {" "}
                    Search
                </button>
                <button
                    type="button"
                    class="btn btn-danger m-1"
                    onClick={clear}
                >
                    {" "}
                    Clear
                </button>
            </div>
            <div className="col-12 col-md-3">
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

export default Search;
