function loadMoviesWithFetchAPIRight(){
    let url='https://movies-api.zegasoftware.com/get-movies.php?sortBy=rating&sortDirection=desc'
  
    
  fetch(url)
      .then(response => response.json())
      .then(data => {
  
            movies = data.movies

            carousel(movies)
  
          })
    
       .catch(err => console.error(err));
}
loadMoviesWithFetchAPIRight()

function carousel(){
    first(movies)
}

function first(movies){
    let first=document.querySelector("#right") 
    for(let i=0; i<2; i++){
  
  {
    
      first.innerHTML += `
      <div class="card mb-3 bg-black" >
      <div class="row g-0">
        <div class="col-md-4">
          <img src="assets/images/images_api/${movies[i].photo}" class="img-fluid rounded-start d-block" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title text-light">${movies[i].name}  ⭐${movies[i].rating} </h5>
            <p class="card-text text-light">${movies[i].plot} </p>
        
          </div>
        </div>
      </div>
    </div>` 
   }}
}