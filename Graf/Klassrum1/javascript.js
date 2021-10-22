// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhy84ujYdgfTDt4TwvFpHd_aJy_X3B8R0",
    authDomain: "abb-temp-project-d1548.firebaseapp.com",
    databaseURL: "https://abb-temp-project-d1548-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "abb-temp-project-d1548",
    storageBucket: "abb-temp-project-d1548.appspot.com",
    messagingSenderId: "1054092009303",
    appId: "1:1054092009303:web:dc9e55016d78a26066e812",
    measurementId: "G-JC26DGQY7X"
}

// get api
async function getapitemp () {

    // Storing response
    const response = await fetch('https://api.temperatur.nu/tnu_1.17.php?p=vasteras&cli=api_demo')
    const gradc = "°C"

    var data = await response.json()
    let temp = data.stations[0].temp
    document.getElementById("num").innerHTML = temp + gradc
    if (response) {
    }
}
getapitemp()

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase()

// Skriv ut värde på temperaturen Klassrum1
let dataBaseRef = ref(database, "Temp/Current")
onValue(dataBaseRef, (snapshot) => {
    document.getElementById("klassrum1-temp").innerHTML = snapshot.val()

    function TempImg (degree, id) {
        var degrees = parseFloat(document.getElementById(degree).innerHTML)
        if (degrees < 15) {
            document.getElementById(id).src = "images/icons/temp-0.png"
        }
        else if (degrees < 20) {
            document.getElementById(id).src = "images/icons/temp-1.png"
        }
        else if (parseFloat(degrees) < 25) {
            document.getElementById(id).src = "images/icons/temp-2.png"
        }
        else if (degrees < 30) {
            document.getElementById(id).src = "images/icons/temp-3.png"
        }
        else {
            document.getElementById(id).src = "images/icons/temp-4.png"
        }
        setTimeout(TempImg, 1000)
    }

    TempImg("klassrum1-temp", "klassrum1-img")

})

const prcent = "%"
let humref1 = ref(database, "hum/Current")
onValue(humref1, (snapshot) => {
    document.getElementById("hum1").innerHTML = snapshot.val() + prcent
})