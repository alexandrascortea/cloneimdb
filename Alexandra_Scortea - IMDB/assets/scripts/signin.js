let btnSignin = document.querySelector('#btn-signin')
btnSignin.addEventListener('click', signin)




function signin(e) {
    // validate the form
    e.preventDefault()
    let formIsValid = true

    let emailUser = document.getElementById('email')
    let passwordUser = document.getElementById('password')
    // let errorUser = document.getElementById('error')

    let formData = new FormData()

    formData.append("email", emailUser.value)
    formData.append("password", passwordUser.value)

    url = 'https://movies-api.zegasoftware.com/login.php'

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
            let status = data.Status

            if (status == 'Authenticated') {
                localStorage.setItem('isAuthenticated', true)
                localStorage.setItem('secureKey', data.SecureKey)
                localStorage.setItem('isAdmin', data.IsAdmin == 1)

                localStorage.setItem("username", data.emailUser)
                localStorage.setItem("password", data.passwordUser)

                // document.location = 'movies.html'
                // } else {

                // }


                if (data.IsAdmin == 1) {
                    document.location = "movies.html"
                } else {
                    document.location = "movies.html"
                }
            } else {
                // passwordUser.className = "form-control border border-danger border-3"
                // emailUser.className = "form-control border border-danger border-3"
                alert("ïnvalid")
            }

        })



    // if ((isEmpty(emailUser.value)) || (emailUser == "null")) {
    //     formIsValid = false
    //     emailUser.focus()
    //     emailUser.className = "form-control border border-danger border-3"
    //     // errorUser.className = "text-danger"

    // } else {
    //     emailUser.className = "form-control border border-success border-3"

    // }

    // if ((isEmpty(passwordUser.value)) || (passwordUser == "null")) {
    //     formIsValid = false
    //     passwordUser.focus()
    //     passwordUser.className = "form-control border border-danger border-3"
    //     // errorUser.className = "text-light"

    // } else {
    //     emailUser.className = "form-control border border-success border-3"
    // }



    // get input from user
    // let emailAddress = document.querySelector('#email').value
    // let password = document.querySelector('#password').value

    // send request to server using Fetch API



    // get response from server and redirect to the movies page
}

function isEmpty(value) {
    if (value.trim() == "") {
        return true
    } else {
        return false
    }
}