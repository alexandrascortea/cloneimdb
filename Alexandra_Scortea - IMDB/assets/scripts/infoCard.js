const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')
console.log('movieID = ' + product);



function loadMoviesWithFetchAPI(){
    let url='https://movies-api.zegasoftware.com/get-movies.php'

  
  
  fetch(url)
      .then(response => response.json())
      .then(data => {
  
            movies = data.movies
          
            populateInfoCards(movies)
  
          })
    
       .catch(err => console.error(err));
  }

window.addEventListener("load", loadMoviesWithFetchAPI) 

function populateInfoCards(movies){
    for(let i=0; i<movies.length; i++){
        if (movies[i].movieId == product){
            addMovieInfoCards(movies[i].name, movies[i].year, movies[i].photo, movies[i].plot,  movies[i].rating)
    }
    }
}

function addMovieInfoCards(movieName, movieYear, imgCards,plotCards,  ratingCards) {


    let infoCards = document.querySelector('#infoCards')

    let cardInfo = `<div class="card mb-3 w-75 mh-50 " >
            <div class="row g-0">
            <div class="col-md-4">
              <img src="assets/images/images_api/${imgCards}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 d-flex justify-content-center align-items-center">
              <div class="card-body"><h1 class="card-title">${movieName}</h1>
                <h5 class="card-title">Year: ${movieYear}</h5>
                <h5 class="card-title">IMDb Rating: ${ratingCards}</h5>
                <h6 class="card-title">Plot: ${plotCards}</h6>
      
               
              </div>
            </div>
          </div>
        </div>` 

    infoCards.innerHTML += cardInfo


}


