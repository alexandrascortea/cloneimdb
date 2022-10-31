// ---------------------------Display just movies--------------
let searchMovies = document.querySelector('#movies')
searchMovies.addEventListener('click', showMovies)

function populateJustMovies() {
    for (let i = 0; i < justMovies.length; i++) {
        addMovieToList(justMovies[i])
    }
}

function loadJustMoviesWithFetchAPI(){
    let url="https://movies-api.zegasoftware.com/get-movies.php"
    url = url + '?secureKey=' + localStorage.getItem('secureKey')
    url = url + '&isTvSeries=false'
    fetch(url)
    .then(function (response) {
        return response.json()
    })

        .then(
            (data)=>{
                document.querySelector('#movies-list').innerHTML = ''
                justMovies = data.movies
                console.log(justMovies)
                populateJustMovies()

            }
        )

    

}



function showMovies(){
    loadJustMoviesWithFetchAPI()
}