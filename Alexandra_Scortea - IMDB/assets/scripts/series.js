// ------------------------------Display just series--------------------

let searchSeries=document.querySelector("#series")
searchSeries.addEventListener('click', showSeries)



function loadJustSeriesWithFetchAPI(){
    let url="https://movies-api.zegasoftware.com/get-movies?&isTvSeries=true"
    // url = url + '?secureKey=' + localStorage.getItem('secureKey')
    // url = url + '
    fetch(url)
    .then(function (response) {
        return response.json()
    })

        .then(
            (data)=>{
                document.querySelector('#movies-list').innerHTML = ''
                justSeries = data.movies
                console.log(justSeries)
                populateJustSeries()

            }
        )

    

}

//window.addEventListener("load", loadJustSeriesWithFetchAPI)

function populateJustSeries() {
    for (let i = 0; i < justSeries.length; i++) {
        addMovieToList(justSeries[i])
    }
}

function showSeries(){
    loadJustSeriesWithFetchAPI();
    
}



