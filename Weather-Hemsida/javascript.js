// Hämtar Firebase och berättar olika värden som tillåter sidan att hämta information
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js"

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

function changeType (element, state) {
    let num = element.innerHTML.split('°')
    if (state)
        element.innerHTML = (Math.floor((Number(num[0]) * 1.8 + 32) * 100) / 100) + "°F"
    else
        element.innerHTML = (Math.floor((Number(num[0]) - 32) / 0.018) / 100) + "°C"
}

// Ger värden till knappen för att ändra celsius och farenheit
let prev_button_mode = document.getElementById("ButtonCF").checked

function knapp () {
    const checkbutton = document.getElementById("ButtonCF").checked

    if (checkbutton != prev_button_mode) {
        prev_button_mode = checkbutton
        let values = document.getElementsByClassName('degree2')
        for (let object of values) {
            changeType(object, checkbutton)
        }
    }
    
    return checkbutton
}

// Hämtar Temperatur.Nu API och tar olika värden
async function getapitemp () {

    const response = await fetch('https://api.temperatur.nu/tnu_1.17.php?p=vasteras&cli=api_demo')
    const grader = "°" // Ger Grader värdet "°" och förenklar kodandet l'ngre ned

    var dataa = await response.json()
    let tempC = dataa.stations[0].temp  //api på grader celcius utomhus i västerås
    let tempf = parseFloat(tempC) * 1.8 + 32  //grader i Farenheit
    let tempF = tempf.toFixed(1)

    const buttonCheck = knapp()
    if (!buttonCheck) {
        document.getElementById("temp1").innerHTML = tempC + grader + "C"
    }
    else {
        document.getElementById("temp1").innerHTML = tempF + grader + "F"
    }

    if (response) {
    }
    setTimeout(getapitemp, 1000)
}

// hämtar api från openweathermap och tar lite olika värden där ifrån
async function getapi () {

    // Storing response
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&q=Vasteras&appid=e4db439cc72909853ab9ee518b298cbc')
    const ms = "m/s"
    const prcnt = "%"

    var data = await response.json()
    let dist = data.list[0].wind.speed   //api på vindhastighet
    let hum = data.list[0].main.humidity   //api på luftfuktighet
    let vdegree = data.list[0].wind.deg   //api på vind riktning (grader)
    let rain = data.list[0].weather.main  //api på regn
    if (rain=="rain"){
        document.getElementById("uteicon").src = "images/icons/regn.svg"
    }
    function updateClock() {
        var now = new Date()
        var minutes = now.getMinutes()
        var hours = now.getHours()
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        let time = hours + ':' + minutes
        document.getElementById('Time').innerHTML = time;

        //byter icon. Sol mellan klockan 6 och 16, halvsol mellan 16 och 19, och måne mellan 20 och 6.
        if (rain != "rain"){
        if (6 < hours && hours < 16) {
            document.getElementById("uteicon").src = "images/icons/helsol.svg"
        }
        else if (16 <= hours && hours <= 19) {
            document.getElementById("uteicon").src = "images/icons/halvsol.svg"
        }
        else {
            document.getElementById("uteicon").src = "images/icons/moon.png"
        }
        setTimeout(updateClock, 1000); //uppdaterar varje sekund.
    }}

    updateClock();

    //funktion som konverterar grader till riktning och skriver ut riktningen på hemsidan.
    function WindDegree (wdeg) {
        if (wdeg >= 337.5 || wdeg < 22.5) {
            document.getElementById("wind-degree").innerHTML = "Nord"
        }
        else if (wdeg >= 22.5 && wdeg < 67.5) {
            document.getElementById("wind-degree").innerHTML = "Nordost"
        }
        else if (wdeg >= 67.5 && wdeg < 112.5) {
            document.getElementById("wind-degree").innerHTML = "Ost"
        }
        else if (wdeg >= 112.5 && wdeg < 157.5) {
            document.getElementById("wind-degree").innerHTML = "Sydost"
        }
        else if (wdeg >= 157.5 && wdeg < 202.5) {
            document.getElementById("wind-degree").innerHTML = "Syd"
        }
        else if (wdeg >= 202.5 && wdeg < 247.5) {
            document.getElementById("wind-degree").innerHTML = "Sydväst"
        }
        else if (wdeg >= 247.5 && wdeg < 292.5) {
            document.getElementById("wind-degree").innerHTML = "Väst"
        }
        else {
            document.getElementById("wind-degree").innerHTML = "Nordväst"
        }
    }
    WindDegree(vdegree)

    document.getElementById("lufthastighet").innerHTML = dist + ms
    document.getElementById("hum1").innerHTML = hum + prcnt

    if (response) {
    }
    setTimeout(getapi, 1000)
}
//funktion som byter icon beroende på temperatur.
function TempImg (degree, id) {

    var degrees = parseFloat(document.getElementById(degree).innerHTML)
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

getapi()
getapitemp()

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase()

// Hämtar firebase saker
// Skriv ut värde på temperaturen Klassrum1
let dataBaseRef = ref(database, "Temp")
onValue(dataBaseRef, (snapshot) => {
    document.getElementById("klassrum1-temp").innerHTML = snapshot.val() + "°C"

    TempImg("klassrum1-temp", "klassrum1-img")
})

// skriv ut temperatur Terrariet
let dataBaseRef2 = ref(database, "Temp2/Current")
onValue(dataBaseRef2, (snapshot) => {
    document.getElementById("klassrum2-temp").innerHTML = snapshot.val() + "°C"

    TempImg("klassrum2-temp", "klassrum2-img")
})

// skriv ut temperatur Klassrum3
let dataBaseRef3 = ref(database, "Temp3/Current")
onValue(dataBaseRef3, (snapshot) => {
    document.getElementById("klassrum3-temp").innerHTML = snapshot.val() + "°C"

    TempImg("klassrum3-temp", "klassrum3-img")
})

// skriv ut temperatur Cafeterian
let dataBaseRef4 = ref(database, "Temp4/Current")
onValue(dataBaseRef4, (snapshot) => {
    document.getElementById("cafeterian-temp").innerHTML = snapshot.val() + "°C"

    TempImg("cafeterian-temp", "cafeterian-img")
})

// skriv ut temperatur Pingisrummet
let dataBaseRef5 = ref(database, "Temp5/Current")
onValue(dataBaseRef5, (snapshot) => {
    document.getElementById("pingis-temp").innerHTML = snapshot.val() + "°C"

    TempImg("pingis-temp", "pingis-img")
})

//skriver ut luftfuktighet klassrum1
const prcent = "%"
let humref1 = ref(database, "hum/Current")
onValue(humref1, (snapshot) => {
    document.getElementById("hum1").innerHTML = snapshot.val() + prcent
})

//skriver ut luftfuktighet klassrum2
let humref2 = ref(database, "hum2/Current")
onValue(humref2, (snapshot) => {
    document.getElementById("hum2").innerHTML = snapshot.val() + prcent
})

//skriver ut luftfuktighet klassrum3
let humref3 = ref(database, "hum3/Current")
onValue(humref3, (snapshot) => {
    document.getElementById("hum3").innerHTML = snapshot.val() + prcent
})

//skriver ut luftfuktighet cafeterian
let humref4 = ref(database, "hum4/Current")
onValue(humref4, (snapshot) => {
    document.getElementById("hum4").innerHTML = snapshot.val() + prcent
})

//skriver ut luftfuktighet pingisrummet
let humref5 = ref(database, "hum5/Current")
onValue(humref5, (snapshot) => {
    document.getElementById("hum5").innerHTML = snapshot.val() + prcent
})