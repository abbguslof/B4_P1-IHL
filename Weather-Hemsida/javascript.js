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

    const response = await fetch('https://api.temperatur.nu/tnu_1.17.php?p=vasteras&cli=api_demo')
    const grader = "°"

    var dataa = await response.json()
    let tempc = dataa.stations[0].temp
    let tempK = parseFloat(tempc) + 273.15
    document.getElementById("temp1").innerHTML = tempK

    //document.getElementById("temp1").innerHTML = tempc + grader + "C"
    if (response) {
    }
    setTimeout(getapitemp, 1000)
}

async function getapi () {

    // Storing response
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&q=Vasteras&appid=e4db439cc72909853ab9ee518b298cbc')
    const ms = "m/s"
    const prcnt = "%"
    const deg = "°"

    var data = await response.json()
    let temp = data.list[0].main.temp
    let dist = data.list[0].wind.speed
    let hum = data.list[0].main.humidity
    let vdegree = data.list[0].wind.deg //api på vind riktning (grader)

    //funktion som konverterar grader till riktning och skriver ut riktningen på hemsidan.
    function WindDegree (wdeg){
        if (wdeg>=337.5 || wdeg<22.5){
            document.getElementById("wind-degree").innerHTML = "Nord"
        }
        else if (wdeg>=22.5 && wdeg<67.5){
            document.getElementById("wind-degree").innerHTML = "Nordost"
        }
        else if (wdeg>=67.5 && wdeg<112.5){
            document.getElementById("wind-degree").innerHTML = "Ost"
        }
        else if (wdeg>=112.5 && wdeg<157.5){
            document.getElementById("wind-degree").innerHTML = "Sydost"
        }
        else if (wdeg>=157.5 && wdeg<202.5){
            document.getElementById("wind-degree").innerHTML = "Syd"
        }
        else if (wdeg>=202.5 && wdeg<247.5){
            document.getElementById("wind-degree").innerHTML = "Sydväst"
        }
        else if (wdeg>=247.5 && wdeg<292.5){
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

// Skriv ut värde på temperaturen Klassrum1
let dataBaseRef = ref(database, "Temp/Current")
onValue(dataBaseRef, (snapshot) => {
    document.getElementById("klassrum1-temp").innerHTML = snapshot.val()

    TempImg("klassrum1-temp", "klassrum1-img")
})

// skriv ut temperatur Klassrum2
let dataBaseRef2 = ref(database, "Temp2/Current")
onValue(dataBaseRef2, (snapshot) => {
    document.getElementById("klassrum2-temp").innerHTML = snapshot.val()

    TempImg("klassrum2-temp", "klassrum2-img")
})

// skriv ut temperatur Klassrum3
let dataBaseRef3 = ref(database, "Temp3/Current")
onValue(dataBaseRef3, (snapshot) => {
    document.getElementById("klassrum3-temp").innerHTML = snapshot.val()

    TempImg("klassrum3-temp", "klassrum3-img")
})

// skriv ut temperatur Cafeterian
let dataBaseRef4 = ref(database, "Temp4/Current")
onValue(dataBaseRef4, (snapshot) => {
    document.getElementById("cafeterian-temp").innerHTML = snapshot.val()

    TempImg("cafeterian-temp", "cafeterian-img")
})

// skriv ut temperatur Pingisrummet
let dataBaseRef5 = ref(database, "Temp5/Current")
onValue(dataBaseRef5, (snapshot) => {
    document.getElementById("pingis-temp").innerHTML = snapshot.val()

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