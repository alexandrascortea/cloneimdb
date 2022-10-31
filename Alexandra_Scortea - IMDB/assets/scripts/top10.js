function loadMoviesWithFetchAPITop10(){
    let url='https://movies-api.zegasoftware.com/get-movies.php?sortBy=rating&sortDirection=desc'
  
    
  fetch(url)
      .then(response => response.json())
      .then(data => {
  
            movies = data.movies
            firstCarousel(movies)
  
          })
    
       .catch(err => console.error(err));
}

loadMoviesWithFetchAPITop10()

function firstCarousel(movies){
  
    //let cardList = document.querySelector("#firstCarousel") 
    
        firstSlide(movies)
        secondSlide(movies)
      
  
    
  
  
}
  
  
function firstSlide(movies){
    let firstSlide=document.querySelector("#firstSlide") 
    for(let i=0; i<5; i++){
  
  {
    
      firstSlide.innerHTML += `
  
      <div class="card bg-black" style="width: 18rem;">
          <img src="assets/images/images_api/${movies[i].photo }" class="card-img-top" alt="photo">
          <div class="card-body">
              <h5 class="card-title text-light">${movies[i].name}</h5>
              <p class="card-text text-light">⭐${movies[i].rating}</p>
      </div>
      </div>` 
   }}
}

function secondSlide(movies){
    let secondSlide=document.querySelector("#secondSlide") 
    for(let i=5; i<10; i++){
  
  {
    
     secondSlide.innerHTML += `
  
     <div class="card bg-black " style="width: 18rem;">
         <img src="assets/images/images_api/${movies[i].photo }" class="card-img-top" alt="photo">
         <div class="card-body">
             <h5 class="card-title text-light">${movies[i].name}</h5>
             <p class="card-text text-light">⭐${movies[i].rating}</p>
             
        
     </div>
     </div>` 
   }}
}


  