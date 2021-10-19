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

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase()


// Skriv ut värde på temperaturen i hemsidan
let dataBaseRef = ref(database, "Temp/Current")
onValue(dataBaseRef, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("klassrum1-temp").innerHTML = snapshot.val()

}
)

// byt bild efter temperatur
function TempImg (degree, id) {
    var degrees = parseFloat(degree)//parseFloat(document.getElementById(degree).textContent)
    if (degrees < 15) {
        document.getElementById(id).src = "images/icons/temp-0.png"
    }
    else if (degrees < 20) {
        document.getElementById(id).src = "images/icons/temp-1.png"
    }
    else if (degrees < 25) {
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
a = console.log(snapshot.val())
TempImg(a, "klassrum1-img")
TempImg("klassrum2-temp", "klassrum2-img")
TempImg("klassrum3-temp", "klassrum3-img")
TempImg("cafeterian-temp", "cafeterian-img")
TempImg("pingis-temp", "pingis-img")

// API för temperatur
fetch("https://climacell-microweather-v1.p.rapidapi.com/weather/nowcast?lon=59.638518&lat=16.590005&fields=precipitation", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "climacell-microweather-v1.p.rapidapi.com",
        "x-rapidapi-key": "8c1fe695edmsha35485f13083dbbp1470ebjsnab03317a742d"
    }
})
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.error(err)
    })