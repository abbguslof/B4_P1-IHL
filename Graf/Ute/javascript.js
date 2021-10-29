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
const app = initializeApp(firebaseConfig)
const db = getDatabase()

// Hämtar Temperatur.Nu API och tar olika värden
async function getapitemp () {

    const response = await fetch('https://api.temperatur.nu/tnu_1.17.php?p=vasteras&cli=api_demo')
    const grader = "°" // Ger Grader värdet "°" och förenklar kodandet l'ngre ned

    var dataa = await response.json()
    let tempC = dataa.stations[0].temp  //api på grader celcius utomhus i västerås
    let tempf = parseFloat(tempC) * 1.8 + 32  //grader i Farenheit
    let tempF = tempf.toFixed(1)  //avrundar till närmaste tiondel

    //omvandlar till farenheit när man trycker på switchen, byter tillbaka till celcius när man trycker igen.
    let checkbutton = document.getElementById("ButtonCF").checked
    if (checkbutton == false) {
        document.getElementById("utomhus-temp").innerHTML = tempC + grader + "C"
    }
    else {
        document.getElementById("utomhus-temp").innerHTML = tempF + grader + "F"
    }
  
    if (response) {
    }

    //funktion som byter icon beroende på utetemperatur.
    function TempImg (degrees, id) {
        if (degrees < 15) {
            document.getElementById(id).src = "../../Weather-Hemsida/images/icons/temp-0.png"
        }
        else if (degrees < 20) {
            document.getElementById(id).src = "../../Weather-Hemsida/images/icons/temp-1.png"
        }
        else if (degrees < 25) {
            document.getElementById(id).src = "../../Weather-Hemsida/images/icons/temp-2.png"
        }
        else if (degrees < 30) {
            document.getElementById(id).src = "../../Weather-Hemsida/images/icons/temp-3.png"
        }
        else {
            document.getElementById(id).src = "../../Weather-Hemsida/images/icons/temp-4.png"
        }
        setTimeout(TempImg, 1000)//uppdaterar varje sekund.
    }
TempImg(tempC, "picture")

    setTimeout(getapitemp, 1000)//uppdaterar varje sekund.
}
getapitemp()

const prcent = "%"


// let humref2 = ref(db, "hum2/Current")
// onValue(humref2, (snapshot) => {
//     document.getElementById("hum2").innerHTML = snapshot.val() + prcent
// })