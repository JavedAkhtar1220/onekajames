const db = firebase.firestore();
const storage = firebase.storage();
var data = [];
var filterData = [];
var sNo = 1;
var index = 0;

var bank = document.getElementById("bank");
var locations = document.getElementById("locations");
var vendor = document.getElementById("vendor");
var model = document.getElementById("model");
var serial = document.getElementById("serial");
var type = document.getElementById("type");
var alarm = document.getElementById("alarm");
var moi = document.getElementById("moi");
var cassettes = document.getElementById("cassettes");
var cctv = document.getElementById("cctv");
var cencornLock = document.getElementById("cencornLock");
var opening = document.getElementById("opening");
var sinCom = document.getElementById("sinCom");
var openingTime = document.getElementById("openingTime");
var closingTime = document.getElementById("closingTime");
var remarks = document.getElementById("remarks");
var alarmCode = document.getElementById("alarmCode");
var gatePass = document.getElementById("gatePass");


const getData = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            db.collection("admins").doc(user.uid).get()
                .then(doc => {
                    if (doc.data().role === "owner") {
                        var promise = new Promise((resolve, reject) => {
                            db.collection("records").get()
                                .then(doc => {
                                    doc.forEach(record => {
                                        data.push(record.data());
                                    })
                                    resolve(data);
                                })
                        })

                        promise.then(data => {

                            for (var a = 0; a < data.length; a++) {
                                document.getElementById("tbody").innerHTML +=
                                    `
                    <tr>
                        <td>${sNo}</td>
                        <td>${data[a].atmNo}</td>
                        <td>${data[a].bank}</td>
                        <td>${data[a].locations}</td>
                        <td>${data[a].vendor}</td>
                        <td>${data[a].type}</td>
                        <td>${data[a].cassettes}</td>
                        <td>
                            <button class="btn-action" data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onclick="popupData(${a})">
                                <img src="./assests/cog-solid.svg" alt="Update" /> 
                            </button>
                            <button class="btn-action" onclick="deleteRecord(${a},this)">
                                <img src="./assests/trash-solid.svg" alt="Delete"  />
                            </button>
                        </td>
                    </tr>
                `
                                sNo++;
                            }
                        })
                    }
                    else {
                        window.location = "login.html";
                    }
                })

        } else {
            window.location = "./login.html";
        }
    });
}

const popupData = (i) => {

    index = i;

    bank.value = data[i].bank;
    locations.value = data[i].locations;
    vendor.value = data[i].vendor;
    model.value = data[i].model;
    serial.value = data[i].serial;
    type.value = data[i].type;
    alarm.value = data[i].alarm;
    moi.value = data[i].moi;
    cassettes.value = data[i].cassettes;
    cctv.value = data[i].cctv;
    cencornLock.value = data[i].lockType;
    opening.value = data[i].openingDate;
    sinCom.value = data[i].sinCom;
    openingTime.value = data[i].openingTime;
    closingTime.value = data[i].closingTime;
    remarks.value = data[i].remarks;
    alarmCode.value = data[i].alarmCode;
}

const deleteRecord = (i, e) => {

    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                db.collection("records").doc(data[i].key).delete()
                    .then(() => {

                        swal("Your imaginary file has been deleted!", {
                            icon: "success",
                        });

                        data.splice(i, 1);

                        sNo = 1;

                        document.getElementById("tbody").innerHTML = "";

                        for (var a = 0; a < data.length; a++) {
                            document.getElementById("tbody").innerHTML +=
                                `
                                <tr>
                                    <td>${sNo}</td>
                                    <td>${data[a].atmNo}</td>
                                    <td>${data[a].bank}</td>
                                    <td>${data[a].locations}</td>
                                    <td>${data[a].vendor}</td>
                                    <td>${data[a].type}</td>
                                    <td>${data[a].cassettes}</td>
                                    <td>
                                        <button class="btn-action" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onclick="popupData(${a})">
                                            <img src="./assests/cog-solid.svg" alt="Update" /> 
                                        </button>
                                        <button class="btn-action" onclick="deleteRecord(${a},this)">
                                            <img src="./assests/trash-solid.svg" alt="Delete"  />
                                        </button>
                                    </td>
                                </tr>
                            `
                            sNo++;
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    })


            }
        });
}

const updateRecord = () => {

    var file = gatePass.files[0];

    if (locations.value === "") {
        alert("Enter location first");
        locations.focus();
        return;
    }
    else if (model.value === "") {
        alert("Enter Model");
        model.focus();
        return;
    }
    else if (serial.value === "") {
        alert("Enter Serial");
        serial.focus();
        return;
    }
    else if (gatePass.value != "") {
        var pattern = /image-*/;
        if (!file.type.match(pattern)) {
            alert("Invalid image format");
            gatePass.focus();
            return;
        }

    }

    if (cassettes.value === "") {
        alert("Enter Cassettes");
        cassettes.focus();
        return;
    }
    else if (opening.value === "") {
        alert("Enter Installation Date");
        opening.focus();
        return;
    }
    else if (remarks.value === "") {
        alert("Enter Remarks");
        remarks.focus();
        return;
    }
    else if (alarmCode.value === "") {
        alert("Enter Alarm Code");
        alarmCode.focus();
        return;
    }
    else {

        document.getElementById('loader').style.display = "flex";

        var storageRef = storage.ref("gatepass/" + data[index].atmNo);

        // Upload File 
        storageRef.put(file)
            .then(() => {
                storageRef.getDownloadURL()
                    .then(link => {


                        db.collection("records").doc(data[index].key).update({
                            bank: bank.value,
                            locations: locations.value,
                            vendor: vendor.value,
                            model: model.value,
                            serial: serial.value,
                            imgGatePass: link,
                            type: type.value,
                            alarm: alarm.value,
                            moi: moi.value,
                            cassettes: cassettes.value,
                            cctv: cctv.value,
                            lockType: cencornLock.value,
                            opening: opening.value,
                            sinCom: sinCom.value,
                            openingTime: openingTime.value,
                            closingTime: closingTime.value,
                            remarks: remarks.value,
                            alarmCode: alarmCode.value,
                        })
                            .then(() => {

                                data = [];
                                sNo = 1;
                                gatePass.value = "";

                                var promise = new Promise((resolve, reject) => {
                                    db.collection("records").get()
                                        .then(doc => {
                                            doc.forEach(record => {
                                                data.push(record.data());
                                            })
                                            resolve(data);
                                        })
                                })

                                promise.then(data => {

                                    document.getElementById("tbody").innerHTML = "";
                                    for (var a = 0; a < data.length; a++) {
                                        document.getElementById("tbody").innerHTML +=
                                            `
                                        <tr>
                                            <td>${sNo}</td>
                                            <td>${data[a].atmNo}</td>
                                            <td>${data[a].bank}</td>
                                            <td>${data[a].locations}</td>
                                            <td>${data[a].vendor}</td>
                                            <td>${data[a].type}</td>
                                            <td>${data[a].cassettes}</td>
                                            <td>
                                                <button class="btn-action" data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    onclick="popupData(${a})">
                                                    <img src="./assests/cog-solid.svg" alt="Update" /> 
                                                </button>
                                                <button class="btn-action" onclick="deleteRecord(${a},this)">
                                                    <img src="./assests/trash-solid.svg" alt="Delete"  />
                                                </button>
                                            </td>
                                        </tr>
                                    `
                                        sNo++;
                                    }
                                    document.getElementById('loader').style.display = "none";
                                    swal({
                                        title: "Updated!",
                                        text: "Your record updated successfully!",
                                        icon: "success",
                                    });
                                    document.querySelector(".btn-close").click();
                                    document.getElementById("filterBank").value = "all";
                                })

                            })

                    })
            })
    }

}

const bankFilter = () => {

    var filterBank = document.getElementById("filterBank");
    sNo = 1;

    document.getElementById("tbody").innerHTML = "";

    if (filterBank.value == "all") {
        for (var a = 0; a < data.length; a++) {
            document.getElementById("tbody").innerHTML +=
                `
            <tr>
                <td>${sNo}</td>
                <td>${data[a].atmNo}</td>
                <td>${data[a].bank}</td>
                <td>${data[a].locations}</td>
                <td>${data[a].vendor}</td>
                <td>${data[a].type}</td>
                <td>${data[a].cassettes}</td>
                <td>
                    <button class="btn-action" data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onclick="popupData(${a})">
                        <img src="./assests/cog-solid.svg" alt="Update" /> 
                    </button>
                    <button class="btn-action" onclick="deleteRecord(${a},this)">
                        <img src="./assests/trash-solid.svg" alt="Delete"  />
                    </button>
                </td>
            </tr>
        `
            sNo++;
        }
    }
    else {
        filterData = data.filter((value) => {
            return value.bank == filterBank.value;
        })

        if (filterData.length === 0) {
            document.getElementById("tbody").innerHTML =
                `
                <tr>
                    <td colspan="8" class="text-center">Not Record Found</td>
                </tr?
            `
        }
        else {

            for (var a = 0; a < data.length; a++) {
                if (data[a].bank === filterBank.value) {
                    document.getElementById("tbody").innerHTML +=
                        `
                    <tr>
                        <td>${sNo}</td>
                        <td>${data[a].atmNo}</td>
                        <td>${data[a].bank}</td>
                        <td>${data[a].locations}</td>
                        <td>${data[a].vendor}</td>
                        <td>${data[a].type}</td>
                        <td>${data[a].cassettes}</td>
                        <td>
                            <button class="btn-action" data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onclick="popupData(${a})">
                                <img src="./assests/cog-solid.svg" alt="Update" /> 
                            </button>
                            <button class="btn-action" onclick="deleteRecord(${a},this)">
                                <img src="./assests/trash-solid.svg" alt="Delete"  />
                            </button>
                        </td>
                    </tr>
                `
                    sNo++;
                }
            }
        }


    }




}

const logout = () => {
    firebase.auth().signOut().then(() => {
        window.location = './index.html';
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });

}
