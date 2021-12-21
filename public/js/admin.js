
const db = firebase.firestore();
var userData = [];

// function generatePDF() {
//     // Choose the element that our invoice is rendered in.
//     const element = document.getElementById('result');
//     var opt = {
//         margin: 1,
//         filename: 'report.pdf',
//     };
//     // Choose the element and save the PDF for our user.
//     html2pdf().set(opt).from(userData).save();
// }


const getData = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection("admins").doc(user.uid).get()
                .then(doc => {
                    userData.push(doc.data());
                })
        } else {
            window.location = "login.html";
        }
    });
}

const searchData = () => {

    var idVal = document.getElementById("search").value;
    var checkData = [];
    document.getElementById("result").innerHTML = "";
    document.getElementById("search-loader").classList.remove("d-none");

    var promise = new Promise((resolve, reject) => {
        db.collection("records").where("atmNo", "==", idVal).where("bank", "==", userData[0].bank)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    checkData = doc.data();
                });
                resolve(checkData);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    })

    promise.then(data => {

        if (data.length === 0) {


            document.getElementById("search-loader").classList.add("d-none");

            document.getElementById("result").innerHTML =
                `
                <div class="mt-5">
                    <p class="text-center small">No Result Found</p>
                </div>
                `
            return;
        }
        else {
            if (data.alarm == "yes") {

                swal("Warning!", data.remarks, "warning")
                    .then(() => {
                        if (data.keyType != "") {
                            swal("Warning!", "The selected is key " + data.keyType, "warning");

                        }
                    });
            }
            else {
                if (data.keyType != "") {
                    swal("Warning!", "The selected is key " + data.keyType, "warning");
                }
            }

            document.getElementById("search-loader").classList.add("d-none");
            document.getElementById("result").innerHTML =
                `
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6 order-lg-1 order-md-1 order-sm-1 order-1">
                        <p class="small">ATM ID:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.atmNo}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6 order-lg-2 order-md-2 order-sm-2 order-3">
                        <p class="small">Location:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.locations}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6 order-lg-3 order-md-3 order-sm-4 order-4">
                        <p class="small">Bank:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.bank}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6 order-lg-4 order-md-4 order-sm-3 order-2" id="img-container">

                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6>
                        <p class="small">Vendor:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.vendor}</p>
                    </div>

                     <div class="col-lg-3 col-md-3 col-sm-4 col-6">
                        <p class="small">Serial:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.serial}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6">
                        <p class="small">Model:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.model}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6">
                        <p class="small">Door Alarm:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.alarm}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6">
                        <p class="small">Lock type:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.lockType}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6">
                        <p class="small">Opening Time:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.openingTime}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6">
                        <p class="small">Closing Time:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.closingTime}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6">
                        <p class="small">Key type:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.keyType}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6">
                        <p class="small">Remarks:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.remarks}</p>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6">
                        <p class="small">Alarm code:</p>
                        <p style="font-size: 15px;" class="fw-bold">${data.alarmCode}</p>
                    </div>
                </div>
            `

            if (data.imgGatePass !== "") {
                document.getElementById("img-container").innerHTML =
                    `
                    <div>
                        <img src=${data.imgGatePass} alt="Gate Pass" class="img-gatepass">
                    </div>
                    <a href="${data.imgGatePass}" target="_blank" class="small" download>
                        download
                    </a>
                    `

            }
        }

    })

}

const logout = () => {
    firebase.auth().signOut().then(() => {
        window.location = './login.html';
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });

}