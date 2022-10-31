// ----------------------Add movie to list---------------
function populateMovies() {
    for (let i = 0; i < movies.length; i++) {
        addMovieToList(movies[i])
    }
}

function addMovieToList(movie) {
    let movieId = movie.movieId
    let name = movie.name
    let year = movie.year
    let imag = movie.photo
    let inWatchlist = movie.inWatchlist
    let rating=movie.rating

    let moviesList = document.querySelector('#movies-list')


    let cardHtml =
        `
         
            <div class="card mx-2 my-2 bg-black " style="width: 15rem;">' 
                <img src="assets/images/images_api/${imag}" class="card-img-top" alt="..."> 
                <div class="card-body">
                    <h3 class="card-title d-flex justify-content-center align-items-center text-light">${name}</h3>
                   <h4 class="card-text d-flex justify-content-center align-items-center text-light">${year}</h4>
                   <h5 class="card-text d-flex justify-content-end text-light "> ⭐${rating}</h5>

                </div>
               
                `



    let isAdmin = localStorage.getItem('isAdmin')

    if (isAdmin === 'true') {
        isAdmin = true
    } else {
        isAdmin = false
    }

    if (isAdmin) {
        cardHtml +=
            '<button onclick="showEditModal(' + movieId + ')" type="button" class="mx-2 btn btn-primary my-2" id="btn-show-edit-modal-' + movieId + '">Edit movie</button>' +
            '<button onclick="showDeleteConfirmModal(' + movieId + ')" type="button" class="btn btn-danger my-2" id="btn-show-delete-modal-' + movieId + '">Delete movie</button>'
    } else {
        if (!inWatchlist) {
            cardHtml += '<button onclick="addToWatchlist(' + movieId + ')" type="button" class="btn d-flex justify-content-left align-items-left " id="btn-show-add-to-watchlist-' + movieId + '"> <i class="bi bi-heart text-light"></i></button>'
        } else {
            cardHtml += '<button onclick="removeFromWatchlist(' + movieId + ')" type="button" class="btn d-flex justify-content-left align-items-left " id="btn-show-add-to-watchlist-' + movieId + '"><i class="bi bi-heart-fill text-light"></i></button>'

        }
        cardHtml += '<button onclick="viewMovie(' + movieId + ')"  class="btn btn-warning my-2 " >Movie Details </button>'
    }

    moviesList.innerHTML += cardHtml


}



// --------------------Delete movie-----------------------
let movieIdToDelete = 0

function showDeleteConfirmModal(movieId) {
    console.log('show')
    movieIdToDelete = movieId

    deleteConfirmModal.show()
}

function deleteMovie() {
    let xhr = new XMLHttpRequest()

    xhr.open('POST', 'https://movies-api.zegasoftware.com/delete-movie.php', true)

    xhr.onload = function () {
        loadMoviesWithFetchAPI()
    }

    let formData = new FormData()

    formData.append("movieId", movieIdToDelete)
    formData.append("secureKey", localStorage.getItem('secureKey'))

    xhr.send(formData)

    deleteConfirmModal.hide()
}

// --------------------Add to watchlist-----------------
function addToWatchlist(movieId) {
    let xhr = new XMLHttpRequest()

    xhr.open('POST', 'https://movies-api.zegasoftware.com/add-to-watchlist.php', true)

    xhr.onload = function () {
        loadMoviesWithFetchAPI()
    }

    let formData = new FormData()

    formData.append("movieId", movieId)
    formData.append("secureKey", localStorage.getItem('secureKey'))

    xhr.send(formData)
}

// -------------------Remove from watchlist----------------

function removeFromWatchlist(movieId) {
    let xhr = new XMLHttpRequest()

    xhr.open('POST', 'https://movies-api.zegasoftware.com/remove-from-watchlist.php', true)

    xhr.onload = function () {
        loadMoviesWithFetchAPI()
    }

    let formData = new FormData()

    formData.append("movieId", movieId)
    formData.append("secureKey", localStorage.getItem('secureKey'))

    xhr.send(formData)
}

// ----------------Check Authentification----------------------

let movies = []

let currentPage = 0
let numberOfMoviesPerPage = 10
let moviesCount = 0

let movieToFind = ''
let yearToFind = ''

let searchMovieInWatchlist = false

function checkAuthentication() {
    let isAuthenticated = localStorage.getItem('isAuthenticated')

    if (isAuthenticated === 'true') {
        isAuthenticated = true
    } else {
        isAuthenticated = false
    }
    if (!isAuthenticated) {
        document.location = 'index.html'
    }

    let isAdmin = localStorage.getItem('isAdmin')

    if (isAdmin === 'true') {
        isAdmin = true
    } else {
        isAdmin = false
    }

    if (!isAdmin) {
        document.querySelector('#btn-show-add-modal').className = 'hidden'
    }
}

checkAuthentication()

// -------------------------Logout--------------
document.querySelector('#btn-logout').addEventListener('click', logout)

function logout() {
    localStorage.setItem('isAuthenticated', false)
    localStorage.removeItem('secureKey')
    localStorage.removeItem('isAdmin')

    document.location = 'index.html'
}

// --------------------------fetch API----------------
function loadMoviesWithFetchAPI() {
    let url = 'https://movies-api.zegasoftware.com/get-movies.php'

    url = url + '?secureKey=' + localStorage.getItem('secureKey')

    url = url + '&page=' + currentPage + '&count=' + numberOfMoviesPerPage

    url = url + '&movieToFind=' + movieToFind.trim()
    url = url + '&yearToFind=' + yearToFind.trim()
    url = url + '&searchMovieInWatchlist=' + searchMovieInWatchlist
    url = url + '&sortBy=' + sortByField
    url = url + '&sortDirection=' + sortDirection



    fetch(url)
        .then(function (response) {
            return response.json()
        })

        .then(
            (data) => {
                document.querySelector('#movies-list').innerHTML = ''
                movies = data.movies
                populateMovies()
               
                moviesCount = data.count

                //document.querySelector('#movies-summary').innerHTML = data.count +  'movies'
            }
        )
}




function loadMoviesWithFetchAPIWatchList() {
    let url = 'https://movies-api.zegasoftware.com/get-movies.php'

    url = url + '?secureKey=' + localStorage.getItem('secureKey')

    url = url + '&searchMovieInWatchlist=true'
    



    fetch(url)
        .then(function (response) {
            return response.json()
        })

        .then(
            (data) => {
                document.querySelector('#movies-list').innerHTML = ''
                movies = data.movies
                populateMovies()
               
                moviesCount = data.count

                //document.querySelector('#movies-summary').innerHTML = data.count +  'movies'
            }
        )
}







// --------------------Search in DB----------------

let searchBtn = document.querySelector('#search-btn')
searchBtn.addEventListener('click', searchMovieInDatabase)

function searchMovieInDatabase() {
    let searchMovie = document.querySelector('#search-movie')
    movieToFind = searchMovie.value.toLowerCase()

    let searchMovieYear = document.querySelector('#search-movie-year')
    yearToFind = searchMovieYear.value.toLowerCase()

    // searchMovieInWatchlist = document.querySelector('#search-movie-in-watchlist').checked
    console.log(searchMovieInWatchlist)
    currentPage = 0

    loadMoviesWithFetchAPI()
}


// --------------------------------------------------------------------
let btnShowAddMovieModal = document.querySelector('#btn-show-add-modal')
btnShowAddMovieModal.addEventListener('click', showAddMovieModal)

let addEditMovieModal = new bootstrap.Modal(
    document.getElementById('addEditMovieModal'),
    {
    }
)

let deleteConfirmModal = new bootstrap.Modal(
    document.querySelector('#deleteConfirmModal'),
    {
    }
)

let btnDeleteMovie = document.querySelector('#btn-delete-movie')
btnDeleteMovie.addEventListener('click', deleteMovie)

function showAddMovieModal() {

    currentAddEditMode = 'add'

    addEditMovieModal.show()
}

function showEditModal(movieId) {
    let filteredMovies = movies.filter(function (movie) {
        return movie.movieId == movieId
    })

    document.querySelector('#add-edit-title').innerHTML = 'Edit movie'

    document.querySelector('#movie-name').value = filteredMovies[0].name
    document.querySelector('#movie-year').value = filteredMovies[0].year
    document.querySelector('#movie-id').value = filteredMovies[0].movieId

    currentAddEditMode = 'edit'

    addEditMovieModal.show()
}

let btnSubmit = document.querySelector('#btn-submit')
btnSubmit.addEventListener('click', saveMovie)

let currentAddEditMode = 'add'

function saveMovie(e) {
    e.preventDefault();

    let nameInput = document.querySelector('#movie-name')
    let yearInput = document.querySelector('#movie-year')
    let plotInput =document.querySelector('#movie-plot')
    let ratingInput=document.querySelector('#movie-rating')

    let errorMessagesDiv = document.querySelector('#error-messages')

    let formIsValid = true

    // Verify the name of the movie
    if (isEmpty(nameInput.value)) {
        nameInput.className = 'form-control invalid-field'
        nameInput.focus()
        formIsValid = false
    } else {
        for (let i = 0; i < movies.length; i++) {
            if (nameInput.value == movies[i].name &&
                yearInput.value == movies[i].year) {

                nameInput.className = 'form-control invalid-field'
                nameInput.focus()
                formIsValid = false

                break
            }
        }
    }

    //Verify the plot of the movie
    if (isEmpty(plotInput.value)) {
        plotInput.className = 'form-control invalid-field'
        plotInput.focus()
        formIsValid = false
    } 

    //Verify the rating of the movie
    if(isEmpty(ratingInput.value)){
        ratingInput.className="form-control invalid-field"
        formIsValid=false

        if(isEmpty(ratingInput.value)){
            ratingInput.className="form-control invalid-field"
            ratingInput.focus()
            formIsValid = false
        }
    }



    // Verify the year of the movie
    if (isEmpty(yearInput.value)) {
        yearInput.className = 'form-control invalid-field'
        formIsValid = false

        if (!isEmpty(nameInput.value)) {
            yearInput.focus()
        }
    } else if (yearInput.value < 1915 || yearInput.value > 2023) {
        yearInput.className = 'form-control invalid-field'
        formIsValid = false

        if (!isEmpty(nameInput.value)) {
            yearInput.focus()
        }
    }


    if (formIsValid) {
        addMovieToDatabaseUsingFetchAPI(nameInput.value, yearInput.value, plotInput.value)

        nameInput.value = ''
        yearInput.value = ''
        plotInput.value=''
        ratingInput.value=''

        nameInput.className = 'field'
        yearInput.className = 'field'
        plotInput.className='field'
        ratingInput.className='field'

        errorMessagesDiv.className = 'form-control error-messages-valid'
    } else {
        errorMessagesDiv.className = 'form-control error-messages-invalid'
    }
}



function addMovieToDatabaseUsingFetchAPI(name, year,plot) {
    let formData = new FormData()

    formData.append("name", name)
    formData.append("year", year)
    formData.append("plot",plot)
    if (currentAddEditMode == 'edit') {
        formData.append("movieId", document.querySelector('#movie-id').value)
    }
    formData.append("secureKey", localStorage.getItem('secureKey'))

    if (currentAddEditMode == 'add') {
        url = 'https://movies-api.zegasoftware.com/add-movie.php'
    } else {
        url = 'https://movies-api.zegasoftware.com/update-movie.php'
    }

    addEditMovieModal.hide()

    fetch(url,
        {
            method: 'POST',
            body: formData
        }
    )
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            loadMoviesWithFetchAPI()
        })
}

function isEmpty(value) {
    if (value.trim() == '') {
        return true
    } else {
        return false
    }
}

function editMovie() {
    let checkboxes = document.querySelectorAll('#movies-list input')
    let selectedMoviesCount = 0
    let selectedMovieIndex = -1
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedMoviesCount++

            selectedMovieIndex = i
        }
    }

    if (selectedMoviesCount == 0) {
        alert('Please select a movie to edit.')

        return;
    } else if (selectedMoviesCount > 1) {
        alert('Please select only one movie to edit.')

        return;
    }

    currentAddEditMode = 'edit'

    document.querySelector('#add-edit-title').innerHTML = 'Edit movie'
    document.querySelector('#btn-submit').value = 'Update movie'

    document.querySelector('#movie-name').value = movies[selectedMovieIndex].name
    document.querySelector('#movie-year').value = movies[selectedMovieIndex].year
    document.querySelector('#movie-plot').value = movies[selectedMovieIndex].plot
    document.querySelector('#movie-id').value = movies[selectedMovieIndex].movieId
}


// ---------------------------------Sort asc&Desc----------------------
let sortByField = 'name'
let sortDirection = 'asc'


document.querySelector('#btn-sort-by-year-asc').addEventListener('click', sortByYearAsc)
document.querySelector('#btn-sort-by-year-desc').addEventListener('click', sortByYearAsc)


document.querySelector("#btn-sort-by-name-asc").addEventListener("click", sortByNameAsc)
document.querySelector("#btn-sort-by-name-desc").addEventListener("click", sortByNameDesc)

function sortByNameAsc() {
    sortDirection = 'asc'
    sortByField = 'name'

    loadMoviesWithFetchAPI()
}
function sortByNameDesc() {
    sortDirection = 'desc'
    sortByField = 'name'

    loadMoviesWithFetchAPI()
}

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
// -------------------------Pagination---------------
window.addEventListener('load', loadMoviesWithFetchAPI)

document.querySelector('#btn-first-page').addEventListener('click', goToFirstPage)
document.querySelector('#btn-previous-page').addEventListener('click', goToPreviousPage)
document.querySelector('#btn-next-page').addEventListener('click', goToNextPage)
document.querySelector('#btn-last-page').addEventListener('click', goToLastPage)

function goToFirstPage() {
    if (currentPage > 0) {
        currentPage = 0
        loadMoviesWithFetchAPI()
    }
}

function goToPreviousPage() {
    if (currentPage > 0) {
        currentPage--
        loadMoviesWithFetchAPI()
    }
}

function goToNextPage() {
    if (currentPage + 1 < moviesCount / numberOfMoviesPerPage) {
        currentPage++
        loadMoviesWithFetchAPI()
    }
}

function goToLastPage() {
    currentPage = parseInt(moviesCount / numberOfMoviesPerPage)
    console.log(currentPage)
    loadMoviesWithFetchAPI()
}



function viewMovie(id) {
    window.location = 'infoCards.html?id=' + id;
   
}

let watchlistBtn=document.querySelector("#watchlistBtn")
watchlistBtn.addEventListener("click",showWatchlist)

function showWatchlist(){
    
   loadMoviesWithFetchAPIWatchList()
}

// --------------------------Movies and Series------------------------------

let moviesSeries=document.querySelector("#moviesSeries")
moviesSeries.addEventListener("click", showMovieSeries)

function showMovieSeries(){

    loadMoviesWithFetchAPI();
}







