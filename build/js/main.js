
const db = firebase.firestore();
const storage = firebase.storage();


var atmNo = "";
var bank = "";
var locations = "";
var vendor = "";
var model = "";
var serial = "";
var alarm = "";
var type = "";
var cctv = "";
var moi = "";
var cassettes = "";
var typeCassettes = [];
var lockType = "";
var openingDate = "";
var gatePass = "";
var sinCom = "";
var openingTime = "";
var closingTime = "";
var key = "";
var keyType = "";
var remarks = "";
var alarmCode = "";


var isAtmNoValid = false;
var isBankValid = false;
var isLocationValid = false;
var isVendorValid = false;
var isModelValid = false;
var isSerialValid = false;
var isAlarmValid = false;
var isTypeValid = false;
var isCctvValid = false;
var isMoiValid = false;
var isCassettesValid = false;
var isTypeCassettesValid = false;
var isCencornLockValid = false;
var isOpeningDateValid = false;
var isGatePassValid = false;
var isUploadGatePassValid = false;
var isSinComValid = false;
var isOpeningTime = false;
var isClosingTime = false;
var isKeyValid = false;
var isKeyTypeValid = false;
var isHiddenGatePassValid = false;
var isRemarksValid = false;
var isAlarmCodeValid = false;


const arrData = [];

const getData = () => {
    db.collection('records').get()
        .then(doc => {
            doc.forEach(element => {
                arrData.push(element.data());
            })
        })
}

// // Input ATM Number Validation 
const atmNoValidation = () => {

    var atmNoVal = document.getElementById("atmNo");
    var atmNoError = document.getElementById("atmNo-error");

    atmNo = atmNoVal.value;

    if (atmNo === "") {
        atmNoError.style.display = "block";
        atmNoError.innerHTML = "Enter Holder Name";
        atmNoVal.classList.add("input-error");
        isAtmNoValid = false;
        return;
    }
    else {
        atmNoError.style.display = "none";
        atmNoError.innerHTML = "";
        atmNoVal.classList.remove("input-error");
        isAtmNoValid = true;
    }

}

// Input Location Validation 
const locationValidation = () => {

    var locationVal = document.getElementById("location");
    var locationError = document.getElementById("location-error");

    locations = locationVal.value;

    if (locations === "") {
        locationError.style.display = "block";
        locationError.innerHTML = "Enter Location";
        locationVal.classList.add("input-error");
        isLocationValid = false;
        return;
    }
    else {
        locationError.style.display = "none";
        locationError.innerHTML = "";
        locationVal.classList.remove("input-error");
        isLocationValid = true;
    }

}

// Input Vendor Validation
const vendorValidation = () => {

    var vendorVal = document.getElementById("vendor");
    var vendorError = document.getElementById("vendor-error");

    vendor = vendorVal.value;

    if (vendor === "") {
        vendorError.style.display = "block";
        vendorError.innerHTML = "Select Vendor";
        vendorVal.classList.add("input-error");
        isVendorValid = false;
        return;
    }
    else {
        vendorError.style.display = "none";
        vendorError.innerHTML = "";
        vendorVal.classList.remove("input-error");
        isVendorValid = true;
    }
}

// Input Alarm Validation 
const alarmValidation = () => {

    var alarmVal = document.getElementById("alarm");
    var ncrError = document.getElementById("alarm-error");

    alarm = alarmVal.value;

    // if (alarm == "yes") {
    //     alarmVal.setAttribute("data-bs-toggle", "modal")
    //     alarmVal.setAttribute("data-bs-target", "#staticBackdrop");
    // }

    if (alarm === "") {
        ncrError.style.display = "block";
        ncrError.innerHTML = "Select Alarm";
        alarmVal.classList.add("input-error");
        isAlarmValid = false;
        return;
    }
    else {
        ncrError.style.display = "none";
        ncrError.innerHTML = "";
        alarmVal.classList.remove("input-error");
        isAlarmValid = true;
    }
}

// Input Type Valdation  
const typeValidation = () => {

    var typeVal = document.getElementById("type");
    var typeError = document.getElementById("type-error");

    type = typeVal.value;

    if (type === "") {
        typeError.style.display = "block";
        typeError.innerHTML = "Enter Type";
        typeVal.classList.add("input-error");
        isTypeValid = false;
        return;
    }
    else {
        typeError.style.display = "none";
        typeError.innerHTML = "";
        typeVal.classList.remove("input-error");
        isTypeValid = true;
    }
}

// Input Model Valdation  
const modelValidation = () => {

    var modelVal = document.getElementById("model");
    var modelError = document.getElementById("model-error");

    model = modelVal.value;

    if (model === "") {
        modelError.style.display = "block";
        modelError.innerHTML = "Enter Model Number";
        modelVal.classList.add("input-error");
        isModelValid = false;
        return;
    }
    else {
        modelError.style.display = "none";
        modelError.innerHTML = "";
        modelVal.classList.remove("input-error");
        isModelValid = true;
    }
}

// Input Serial Number Validation 
const serialValidation = () => {

    var serialVal = document.getElementById("serial");
    var serialError = document.getElementById("serial-error");

    serial = serialVal.value;

    if (serial === "") {
        serialError.style.display = "block";
        serialError.innerHTML = "Enter Serial Number";
        serialVal.classList.add("input-error");
        isSerialValid = false;
        return;
    }
    else {
        serialError.style.display = "none";
        serialError.innerHTML = "";
        serialVal.classList.remove("input-error");
        isSerialValid = true;
    }

}

// Input MOI connected Validation 
const moiValidation = () => {

    var moiVal = document.getElementById("moi");
    var moiError = document.getElementById("moi-error");

    moi = moiVal.value;

    if (moi === "") {
        moiError.style.display = "block";
        moiError.innerHTML = "Select Moi";
        moiVal.classList.add("input-error");
        isMoiValid = false;
        return;
    }
    else {
        moiError.style.display = "none";
        moiError.innerHTML = "";
        moiVal.classList.remove("input-error");
        isMoiValid = true;
    }
}

// Input Bank Validation 
const bankValidation = () => {

    var bankVal = document.getElementById("bank");
    var bankError = document.getElementById("bank-error");

    bank = bankVal.value;

    if (bank === "") {
        bankError.style.display = "block";
        bankError.innerHTML = "Select bank";
        bankVal.classList.add("input-error");
        isBankValid = false;
        return;
    }
    else {
        bankError.style.display = "none";
        bankError.innerHTML = "";
        bankVal.classList.remove("input-error");
        isBankValid = true;
    }
}

// Input cassettes Validation 
const cassettesValidation = () => {

    var cassettesVal = document.getElementById("cassettes");
    var cassettesError = document.getElementById("cassettes-error");

    cassettes = cassettesVal.value;

    if (cassettes === "") {
        cassettesError.style.display = "block";
        cassettesError.innerHTML = "Enter Cassettes";
        cassettesVal.classList.add("input-error");
        isCassettesValid = false;
        return;
    }
    else {
        cassettesError.style.display = "none";
        cassettesError.innerHTML = "";
        cassettesVal.classList.remove("input-error");
        isCassettesValid = true;
    }
}

// Input CCTV Validation 
const cctvValidation = () => {

    var cctvVal = document.getElementById("cctv");
    var cctvError = document.getElementById("cctv-error");

    cctv = cctvVal.value;

    if (cctv === "") {
        cctvError.style.display = "block";
        cctvError.innerHTML = "Select Alarm CCTV";
        cctvVal.classList.add("input-error");
        isCctvValid = false;
        return;
    }
    else {
        cctvError.style.display = "none";
        cctvError.innerHTML = "";
        cctvVal.classList.remove("input-error");
        isCctvValid = true;
    }
}

// Input Cencorn Lock Validation 
const cencornLockValidation = () => {

    var cencornLockVal = document.getElementById("cencornLock");
    var cencornLockError = document.getElementById("cencornLock-error");

    lockType = cencornLockVal.value;

    if (lockType === "") {
        cencornLockError.style.display = "block";
        cencornLockError.innerHTML = "Select Cencorn Lock";
        cencornLockVal.classList.add("input-error");
        isCencornLockValid = false;
        return;
    }
    else {
        cencornLockError.style.display = "none";
        cencornLockError.innerHTML = "";
        cencornLockVal.classList.remove("input-error");
        isCencornLockValid = true;
    }
}

// Input Opening Date Validation 
const openingDateValidation = () => {

    var openingVal = document.getElementById("opening");
    var openingError = document.getElementById("opening-error");

    openingDate = openingVal.value;

    if (openingDate === "") {
        openingError.style.display = "block";
        openingError.innerHTML = "Select Opening Date";
        openingVal.classList.add("input-error");
        isOpeningDateValid = false;
        return;
    }
    else {
        openingError.style.display = "none";
        openingError.innerHTML = "";
        openingVal.classList.remove("input-error");
        isOpeningDateValid = true;
    }
}

// Input Gate Pass Validation 
const gatePassValidation = () => {

    var gatePassVal = document.getElementById("gatePass");
    var gatePassError = document.getElementById("gatePass-error");

    gatePass = gatePassVal.value;

    if (gatePassVal.value == "") {
        gatePassError.style.display = "block";
        gatePassError.innerHTML = "Select Gate Pass";
        isGatePassValid = false;
        return;
    }
    else {
        gatePassError.style.display = "none";
        gatePassError.innerHTML = "";
        isGatePassValid = true;

        if (gatePassVal.value === "yes") {
            document.getElementById("gatePassContainer").classList.remove('d-none');
        } else {
            document.getElementById("gatePassContainer").classList.add('d-none');
        }

    }
}

// Input Upload Gate Pass 
const uploadGatePassValidation = () => {

    var uploadGatePass = document.getElementById("uploadGatePass");
    var uploadGatePassError = document.getElementById("uploadGatePass-error");

    var file = document.getElementById("uploadGatePass").files[0];

    if (uploadGatePass.value == "") {
        uploadGatePassError.style.display = "block";
        uploadGatePassError.innerHTML = "Upload Gate Pass";
        isUploadGatePassValid = false;
        return false;
    } else if (file) {
        isUploadGatePassValid = true;
        var pattern = /image-*/;
        if (!file.type.match(pattern)) {
            uploadGatePassError.style.display = "block";
            uploadGatePassError.innerHTML = "Invalid Format";
            isUploadGatePassValid = false;
            return false;
        }
        else {
            uploadGatePassError.style.display = "none";
            uploadGatePassError.innerHTML = "";
            isUploadGatePassValid = true;
        }
    }
}

// Input Single / Combo Validation 
const sinComValidation = () => {

    var sinComVal = document.getElementById("sinCom");
    var sinComError = document.getElementById("sinCom-error");

    sinCom = sinComVal.value;

    if (sinCom === "") {
        sinComError.style.display = "block";
        sinComError.innerHTML = "Select Single / Combo";
        sinComVal.classList.add("input-error");
        isSinComValid = false;
        return;
    }
    else {
        sinComError.style.display = "none";
        sinComError.innerHTML = "";
        sinComVal.classList.remove("input-error");
        isSinComValid = true;
    }
}

// Input Opening Time Validation 
const openingTimeValidation = () => {

    var openingTimeVal = document.getElementById("openingTime");
    var openingTimeError = document.getElementById("openingTime-error");

    openingTime = openingTimeVal.value;

    if (openingTime === "") {
        openingTimeError.style.display = "block";
        openingTimeError.innerHTML = "Select Opening Time";
        openingTimeVal.classList.add("input-error");
        isOpeningTime = false;
        return;
    }
    else {
        openingTimeError.style.display = "none";
        openingTimeError.innerHTML = "";
        openingTimeVal.classList.remove("input-error");
        isOpeningTime = true;
    }
}

// Input Opening Time Validation 
const closingTimeValidation = () => {

    var closingTimeVal = document.getElementById("closingTime");
    var closingTimeError = document.getElementById("closingTime-error");

    closingTime = closingTimeVal.value;

    if (closingTime === "") {
        closingTimeError.style.display = "block";
        closingTimeError.innerHTML = "Select closing Time";
        closingTimeVal.classList.add("input-error");
        isClosingTime = false;
        return;
    }
    else {
        closingTimeError.style.display = "none";
        closingTimeError.innerHTML = "";
        closingTimeVal.classList.remove("input-error");
        isClosingTime = true;
    }
}

// Input Key Validation 
const keyValidation = () => {

    var keyVal = document.getElementById("key");
    var keyError = document.getElementById("key-error");

    key = keyVal.value;

    if (key === "") {
        keyError.style.display = "block";
        keyError.innerHTML = "Select key";
        keyVal.classList.add("input-error");
        isKeyValid = false;
        return;
    }
    else {
        keyError.style.display = "none";
        keyError.innerHTML = "";
        keyVal.classList.remove("input-error");
        isKeyValid = true;
        if (key === "yes") {
            document.getElementById("keyContainer").classList.remove("d-none");
            console.log()
        }
        else {
            document.getElementById("keyContainer").classList.add("d-none");
        }
    }


}

// Input Key Type Validation 
const keyTypeValidation = () => {

    var keyTypeVal = document.getElementById("keyType");
    var keyTypeError = document.getElementById("keyType-error");

    keyType = keyTypeVal.value;

    if (keyType === "") {
        keyTypeError.style.display = "block";
        keyTypeError.innerHTML = "Select Key Type";
        keyTypeVal.classList.add("input-error");
        isKeyTypeValid = false;
        return;
    }
    else {
        keyTypeError.style.display = "none";
        keyTypeError.innerHTML = "";
        keyTypeVal.classList.remove("input-error");
        isKeyTypeValid = true;
    }


}

// Input Remarks Validation 
const remarksValidation = () => {

    var remarksVal = document.getElementById("remarks");
    var remarksError = document.getElementById("remarks-error");

    remarks = remarksVal.value;

    if (remarks === "") {
        remarksError.style.display = "block";
        remarksError.innerHTML = "Enter Remarks";
        remarksVal.classList.add("input-error");
        isRemarksValid = false;
        return;
    }
    else {
        remarksError.style.display = "none";
        remarksError.innerHTML = "";
        remarksVal.classList.remove("input-error");
        isRemarksValid = true;
    }
}

// Input Alarm Code Validation 
const alarmCodeValidation = () => {

    var alarmCodeVal = document.getElementById("alarmCode");
    var alarmCodeError = document.getElementById("alarmCode-error");

    alarmCode = alarmCodeVal.value;

    if (alarmCode === "") {
        alarmCodeError.style.display = "block";
        alarmCodeError.innerHTML = "Enter Alarm Code";
        alarmCodeVal.classList.add("input-error");
        isAlarmCodeValid = false;
        return;
    }
    else {
        alarmCodeError.style.display = "none";
        alarmCodeError.innerHTML = "";
        alarmCodeVal.classList.remove("input-error");
        isAlarmCodeValid = true;
    }
}

const handleCheck = () => {
    var checkbox1 = document.getElementById("checkbox50");
    var checkbox2 = document.getElementById("checkbox100");
    var checkbox3 = document.getElementById("checkbox200");
    var checkbox4 = document.getElementById("checkbox500");
    var typeCassettesError = document.getElementById("typeCassettes-error");

    if ((!checkbox1.checked) && (!checkbox2.checked) && (!checkbox3.checked) && (!checkbox4.checked)) {
        typeCassettesError.style.display = "block";
        typeCassettesError.innerHTML = "Select Cassettes Type";
        checkbox1.focus();
    }
    else {
        typeCassettesError.style.display = "none";
        typeCassettesError.innerHTML = "Select Cassettes Type";
    }


}


const checkBoxValidation = () => {

    var checkbox1 = document.getElementById("checkbox50");
    var checkbox2 = document.getElementById("checkbox100");
    var checkbox3 = document.getElementById("checkbox200");
    var checkbox4 = document.getElementById("checkbox500");

    if (checkbox1.checked) {
        typeCassettes.push(50);
    }
    else {
        var myIndex = typeCassettes.indexOf(50);
        if (myIndex !== -1) {
            typeCassettes.splice(myIndex, 1);
        }
    }

    if (checkbox2.checked) {
        typeCassettes.push(100);
        isTypeCassettesValid = true;
    }
    else {
        var myIndex = typeCassettes.indexOf(100);
        if (myIndex !== -1) {
            typeCassettes.splice(myIndex, 1);
        }
    }

    if (checkbox3.checked) {
        typeCassettes.push(200);
    }
    else {
        var myIndex = typeCassettes.indexOf(200);
        if (myIndex !== -1) {
            typeCassettes.splice(myIndex, 1);
        }
    }

    if (checkbox4.checked) {
        typeCassettes.push(500);
    }
    else {
        var myIndex = typeCassettes.indexOf(50);
        if (myIndex !== -1) {
            typeCassettes.splice(myIndex, 1);
        }
    }

    if (checkbox1.checked || checkbox2.checked || checkbox3.checked || checkbox4.checked) {
        isTypeCassettesValid = true;
    }
    else {
        isTypeCassettesValid = false;
    }

}

const addData = () => {

    var checkData = [];
    var key = db.collection("records").doc().id;

    if (isAtmNoValid && isBankValid && isLocationValid &&
        isVendorValid && isModelValid && isSerialValid &&
        isAlarmValid && isTypeValid &&
        isMoiValid && isCassettesValid && isTypeCassettesValid &&
        isCctvValid && isCencornLockValid && isOpeningDateValid &&
        isGatePassValid && isSinComValid && isOpeningTime && isKeyValid &&
        isOpeningTime && isRemarksValid && isAlarmCodeValid) {

        var promise = new Promise((resolve, reject) => {
            db.collection("records").where("atmNo", "==", atmNo).where("bank", "==", bank)
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

        if ((gatePass === "yes") && (key === "yes")) {
            if (isUploadGatePassValid && isKeyTypeValid) {

                promise.then(data => {

                    if (data.length === 0) {
                        var file = document.getElementById("uploadGatePass").files[0];
                        document.getElementById("btn-submit").classList.add("disabled");

                        // Create a Storage Ref 
                        var storageRef = storage.ref("gatepass/" + atmNo);

                        // Upload File 
                        storageRef.put(file)
                            .then(() => {
                                storageRef.getDownloadURL()
                                    .then(link => {
                                        db.collection("records").doc(key).set({
                                            key,
                                            atmNo,
                                            bank,
                                            locations,
                                            vendor,
                                            model,
                                            serial,
                                            alarm,
                                            type,
                                            imgGatePass: link,
                                            cctv,
                                            moi,
                                            cassettes,
                                            typeCassettes,
                                            lockType,
                                            openingDate,
                                            gatePass,
                                            sinCom,
                                            openingTime,
                                            closingTime,
                                            keyType,
                                            remarks,
                                            alarmCode,
                                        })
                                            .then(() => {
                                                swal("Added!", "Record Added Successfully!", "success")
                                                    .then(() => {
                                                        location.reload();
                                                    });

                                            })
                                            .catch((err) => {
                                                swal(err.message);
                                                document.getElementById("btn-submit").classList.remove("disabled");
                                            })
                                    })
                            })

                    }
                    else {
                        swal("Record Already Exist kindly check it");
                        return;
                    }
                })


            }
            else {
                uploadGatePassValidation();
                keyTypeValidation();
            }
        }
        else if (gatePass === "yes") {
            if (isUploadGatePassValid) {
                promise.then(data => {


                    if (data.length === 0) {
                        var file = document.getElementById("uploadGatePass").files[0];
                        document.getElementById("btn-submit").classList.add("disabled");

                        // Create a Storage Ref 
                        var storageRef = storage.ref("gatepass/" + atmNo);

                        // Upload File 
                        storageRef.put(file)
                            .then(() => {
                                storageRef.getDownloadURL()
                                    .then(link => {
                                        db.collection("records").doc(key).set({
                                            key,
                                            atmNo,
                                            bank,
                                            locations,
                                            vendor,
                                            model,
                                            serial,
                                            alarm,
                                            type,
                                            imgGatePass: link,
                                            cctv,
                                            moi,
                                            cassettes,
                                            typeCassettes,
                                            lockType,
                                            openingDate,
                                            gatePass,
                                            sinCom,
                                            openingTime,
                                            closingTime,
                                            keyType,
                                            remarks,
                                            alarmCode,
                                        })
                                            .then(() => {
                                                swal("Added!", "Record Added Successfully!", "success")
                                                    .then(() => {
                                                        location.reload();
                                                    });

                                            })
                                            .catch((err) => {
                                                swal(err.message);
                                                document.getElementById("btn-submit").classList.remove("disabled");
                                            })
                                    })
                            })
                    }
                    else {
                        swal("Record Already Exist kindly check it");
                        return;
                    }
                })
            }
            else {
                uploadGatePassValidation();
            }
        }
        else if (key === "yes") {
            if (isKeyTypeValid) {

                promise.then(data => {

                    if (data.length === 0) {
                        document.getElementById("btn-submit").classList.add("disabled");

                        db.collection("records").doc(key).set({
                            key,
                            atmNo,
                            bank,
                            locations,
                            vendor,
                            model,
                            serial,
                            alarm,
                            type,
                            imgGatePass: "",
                            cctv,
                            moi,
                            cassettes,
                            typeCassettes,
                            lockType,
                            openingDate,
                            gatePass,
                            sinCom,
                            openingTime,
                            closingTime,
                            keyType,
                            remarks,
                            alarmCode,
                        })
                            .then(() => {
                                swal("Added!", "Record Added Successfully!", "success")
                                    .then(() => {
                                        location.reload();
                                    });

                            })
                            .catch((err) => {
                                swal(err.message);
                                document.getElementById("btn-submit").classList.remove("disabled");
                            })
                    }
                    else {
                        swal("Record Already Exist kindly check it");
                        return;
                    }
                })

            }
            else {
                keyTypeValidation();
            }
        }
        else {

            promise.then(data => {


                if (data.length === 0) {
                    document.getElementById("btn-submit").classList.add("disabled");

                    db.collection("records").doc(key).set({
                        key,
                        atmNo,
                        bank,
                        locations,
                        vendor,
                        model,
                        serial,
                        alarm,
                        type,
                        imgGatePass: "",
                        cctv,
                        moi,
                        cassettes,
                        typeCassettes,
                        lockType,
                        openingDate,
                        gatePass,
                        sinCom,
                        openingTime,
                        closingTime,
                        keyType,
                        remarks,
                        alarmCode,
                    })
                        .then(() => {
                            swal("Added!", "Record Added Successfully!", "success")
                                .then(() => {
                                    location.reload();
                                });

                        })
                        .catch((err) => {
                            swal(err.message);
                            document.getElementById("btn-submit").classList.remove("disabled");
                        })
                }
                else {
                    swal("Record Already Exist kindly check it");
                    return;
                }
            })

        }

    }
    else {
        atmNoValidation();
        bankValidation();
        locationValidation();
        vendorValidation();
        modelValidation();
        serialValidation();
        alarmValidation();
        typeValidation();
        moiValidation();
        cassettesValidation();
        handleCheck();
        checkBoxValidation();
        cctvValidation();
        cencornLockValidation();
        openingDateValidation();
        gatePassValidation();
        sinComValidation();
        openingTimeValidation();
        closingTimeValidation();
        keyValidation();
        remarksValidation();
        alarmCodeValidation();
    }

}