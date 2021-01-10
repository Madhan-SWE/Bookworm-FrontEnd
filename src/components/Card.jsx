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
                        <span className={bgcolor} style={{ color: "white" }}>
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
                        <a href={bookDetails.buyingUrl} className="link">
                            {" "}
                            Buy Now
                        </a>
                    </h6>
                    <div class="card-footer text-muted">
                        <h6 className="text-center"> {bookDetails.website}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
