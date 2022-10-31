
let sortByField = 'year'
let sortDirection = 'desc'
let moviesCount = 0

function loadNewReleaseWithFetchAPI(){
    let url="https://movies-api.zegasoftware.com/get-movies.php?sortBy=year&sortDirection=desc"
    url = url + '?secureKey=' + localStorage.getItem('secureKey')
    url = url + '&sortBy=' + sortByField
    url = url + '&sortDirection=' + sortDirection
    fetch(url)
    .then(function (response) {
        return response.json()
    })

        .then(
            (data)=>{
              movies=data.movies
              populateInfoRelease(movies)
          
             console.log(movies)
            }
        )

        .catch(err => console.error(err));

}

loadNewReleaseWithFetchAPI()


function sortByYearAsc() {
    sortDirection = 'asc'
    sortByField = 'year'
    loadMoviesWithFetchAPI()

}

function sortByYearDesc() {
    sortDirection = 'desc'
    sortByField = 'year'
    loadMoviesWithFetchAPI()
}
function populateInfoRelease(movies){
    for(let i=0; i<movies.length; i++){
        if(movies[i].year==='2022'){
            newRelease(movies[i].name, movies[i].year, movies[i].photo, movies[i].rating)
            
        }
        //newRelease(movies[i].name, movies[i].year, movies[i].photo, movies[i].rating)
    }
}

function newRelease(movieName, movieYear, imgCards,  ratingCards){
    let newRelease = document.querySelector('#newRelease')
    let releaseInfo = `
    <div class="card bg-black mx-2 my-2 d-flex justify-content-center align-items-center" style="width: 18rem; " >
    <img class="card-img-top " src="assets/images/images_api/${imgCards}" alt="Card image cap">
    <div class="card-body">
      <h3 class="card-title d-flex justify-content-center align-items-center text-light">${movieName}</h3>
      <h4 class="card-title d-flex justify-content-center align-items-center text-light">${movieYear}</h4>
      <h5 class="card-title d-flex justify-content-end text-light ">⭐${ratingCards}</h5>
      
  </div>
    </div>
  ` 
        newRelease.innerHTML+=releaseInfo
}

