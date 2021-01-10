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
}

export default AutoSuggestions;
