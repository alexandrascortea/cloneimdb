const form = document.getElementById('form')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const errorValid=document.querySelector('.error-valid')
//const allErrorValid=document.querySelector("error-messages-valid")


let btnRegister = document.querySelector("#btnRegister").addEventListener('click', buttonWasClicked)

function buttonWasClicked(e){
    e.preventDefault()
    let formIsValid = true

    if ((isEmpty(firstName.value)) || (firstName== "null")){
        formIsValid = false
        firstName.focus()
        firstName.className = "form-control border border-danger border-3 "

    } else {
        firstName.className = "form-control border border-success border-3"
        
    }
    
    if ((isEmpty(lastName.value)) || (lastName == "null")){
        formIsValid = false
        lastName.focus()
        lastName.className = "form-control border border-danger border-3"
  
        
    } else {
        lastName.className = "form-control border border-success border-3"
      
    }

    if ((isEmpty(email.value)) || (email == "null")){
        formIsValid = false
        email.focus()
        email.className = "form-control border border-danger border-3"
        
    } else {
        email.className = "form-control border border-success border-3"
       
    }

    if ((isEmpty(password.value)) || (password == "null")) {
        if ((isEmpty(password2.value)) || (password2== "null")){
            formIsValid = false
            password.focus()
            password2.focus()
            password.className = "form-control border border-danger border-3"
            password2.className = "form-control border border-danger border-3"
           
        } else {
            formIsValid = false
            password.className = "form-control border border-danger border-3"
           
        }
        
    } else if ((isEmpty(password.value)) || (password2 == "null")){
        if ((isEmpty(password2.value)) || (password2 == "null")){
            formIsValid = false
            password.focus()
            password2.focus()
            password.className = "form-control border border-danger border-3"
            password2.className = "form-control border border-danger border-3"
            
        } else {
            formIsValid = false
            password2.className = "form-control border border-danger border-3"
            
        }

    } else if (password.value != password2.value) {
        formIsValid = false
        password.focus()
        password2.focus()
        password.className = "form-control border border-danger border-3"
        password2.className = "form-control border border-danger border-3"
       
    } else {
        password.className = "form-control border border-success border-3"
        password2.className = "form-control border border-success border-3"
       
    }

    if (formIsValid) {
        document.location = "signin.html"
      
    } 
}


function isEmpty(value){
    if (value.trim() == ""){
        return true
    } else {
        return false
    }
}