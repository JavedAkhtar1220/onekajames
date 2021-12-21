
var email = "";
var password = "";
const db = firebase.firestore();

var isEmailValid = false;
var isPasswordValid = false;

const emailValidation = () => {

    var emailVal = document.getElementById("email");
    var emailError = document.getElementById("email-error");

    email = emailVal.value;

    if (email === "") {
        emailError.style.display = "block";
        emailError.innerHTML = "Enter Email Address";
        emailVal.classList.add("input-error");
        isEmailValid = false;
        return false;
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        emailError.style.display = "block";
        emailError.innerHTML = "Enter Valid Email Address";
        emailVal.classList.add("input-error");
        isEmailValid = false;
        return false;
    }
    else {
        emailError.style.display = "none";
        emailError.innerHTML = "";
        emailVal.classList.remove("input-error");
        isEmailValid = true;
    }
}

const passwordValidation = () => {

    var passwordVal = document.getElementById("password");
    var passwordError = document.getElementById("password-error");

    password = passwordVal.value;

    if (password === "") {
        passwordError.style.display = "block";
        passwordError.innerHTML = "Enter Password";
        passwordVal.classList.add("input-error");
        isPasswordValid = false;
        return;
    }
    else {
        passwordError.style.display = "none";
        passwordError.innerHTML = "";
        passwordVal.classList.remove("input-error");
        isPasswordValid = true;
    }
}

const onLogin = () => {

    if (isEmailValid && isPasswordValid) {
        document.getElementById("login").classList.add("disabled");


        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {

                db.collection('admins').doc(userCredential.user.uid).get()
                    .then(doc => {

                        if (doc.data().role === "owner") {
                            window.location = "./dashboard.html";
                        }
                        else {
                            window.location = "./admin.html";
                        }

                    })


                // Signed in

                // ...
            })
            .catch((error) => {

                var errorMessage = error.message;
                document.getElementById("login").classList.remove("disabled");
                swal({
                    title: "Error!",
                    text: errorMessage + "!",
                    icon: "error",
                });
            });

    }
    else {
        emailValidation();
        passwordValidation();
    }

}