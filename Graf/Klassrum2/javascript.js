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

// skriv ut temperatur Klassrum2
let dataBaseRef2 = ref(database, "Temp2/Current")
onValue(dataBaseRef2, (snapshot) => {
    document.getElementById("klassrum2-temp").innerHTML = snapshot.val()

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

    TempImg("klassrum2-temp", "klassrum2-img")
})

const prcent = "%"

let humref2 = ref(database, "hum2/Current")
onValue(humref2, (snapshot) => {
    document.getElementById("hum2").innerHTML = snapshot.val() + prcent
})