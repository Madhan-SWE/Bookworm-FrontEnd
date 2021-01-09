  
import { useState, useEffect } from "react";
import "./index.css";

// import SearchBar from './components/SearchBar'



function Search() {

    
    return (
        <div className="row">
            <div className="col-4 offset-2 text-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Book name here"
                    // onChange={handleOnChanage}
                />
            </div>
            <div className="col-2">
            <button type="button" class="btn btn-primary btn-block">
            <i class="fa fa-search" aria-hidden="true"> </i> |
            Search
            
            </button>
            </div>
        </div>
    );
}


function Footer() {
   return(
    <div className="titleSection text-center">
    <h6 className="appTitle"> 2021 <i class="fa fa-copyright" aria-hidden="true"></i> FindMyBook</h6>
    
</div>
   )
}

function SearchBar() {
    return (
        <div className="titleSection text-center">
            <h1 className="appTitle">FindMyBook</h1>
            <Search />
        </div>
    );
}

function Card({ bookDetails }){
    let bookRating = bookDetails.website==="Snapdeal"?bookDetails.rating/20: bookDetails.rating/10;
    let bgcolor = "bg-success p-1 m-1"
    if(bookRating<3)
    {
      bgcolor="bg-danger p-1 m-1";
    }

    return(
      <div className="col-lg-4 col-sm-6 cols mb-2">
          <div className="card text-center">
          <a href={bookDetails.buyingUrl}>
          <img
                    className="card-img-top"
                    src={bookDetails.img}
                    alt={bookDetails.name}
                    style={{ height: "400px"}}
                />
          </a>
          <div className="card-header">{ bookDetails.name }</div>
          <div className="card-body text-center">
                    <h6>{bookDetails.author}</h6>
                    <h6>
                    <span className={bgcolor}>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        {
                            bookRating
                        }
                    </span>
                    { bookDetails.totalRatings}
                    </h6>
                    <h6>
                      <span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{bookDetails.price}</span>
                      { bookDetails.finalPrice }
                    </h6>
                    <h6 className="text-center">
                    <a href={bookDetails.buyingUrl} > Buy Now</a>
                    </h6>
                    <div class="card-footer text-muted">
                    <h6 className="text-center"> { bookDetails.website }</h6>
                    </div>
                    
                    
          </div>
          </div>
          
      </div>
    )
}

function Cards({ selectedBooks }){
      return(
        <div className="container">
            <div className="row">
          <div className="col-12">
                <div
                    className="alert alert-success text-center text-bold "
                    role="alert"
                >
                  <h5>{selectedBooks.length} results found</h5>
                </div>
            </div>

            {selectedBooks.map((book)=> {
              return(
                <Card bookDetails={book} />
              )
            })
            }
        </div>
        </div>
        

      )
}


var BACKENDURL = "http://localhost:3500"


function App() {

  const [booksList, setBooksList] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  function doFetch(){
      console.log("Fetching Data: ")
      const fetchURL = BACKENDURL + "/books";
      fetch(fetchURL)
      .then((res) => res.json())
      .then((res) => {
            setBooksList(res.body);
            setSelectedBooks(res.body);
      });
  }

  useEffect(doFetch, []);
    return (
        <div className="container-fluid">
            <SearchBar />
            <Cards selectedBooks={selectedBooks} />
            <Footer /> 
        </div>
    );
}

export default App;
