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
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&q=Vasteras&appid=e4db439cc72909853ab9ee518b298cbc')
    const gradc = "°C"

    var data = await response.json()
    let temp = data.list[0].main.temp
    let dist = data.list[0].wind.speed
    document.getElementById("num").innerHTML = temp + gradc
    document.getElementById("lufthastighet").innerHTML = dist
    console.log(data)
    if (response) {
    }
}
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
    // TempImg("pingis-temp", "pingis-img")
})

// skriv ut temperatur Pingisrummet
let dataBaseRef5 = ref(database, "Temp5/Current")
onValue(dataBaseRef5, (snapshot) => {
    document.getElementById("pingis-temp").innerHTML = snapshot.val()

    TempImg("pingis-temp", "pingis-img")
})

const prcent = "%"
let humref1 = ref(database, "hum/Current")
onValue(humref1, (snapshot) => {
    document.getElementById("hum1").innerHTML = snapshot.val() + prcent
})

let humref2 = ref(database, "hum2/Current")
onValue(humref2, (snapshot) => {
    document.getElementById("hum2").innerHTML = snapshot.val() + prcent
})

let humref3 = ref(database, "hum3/Current")
onValue(humref3, (snapshot) => {
    document.getElementById("hum3").innerHTML = snapshot.val() + prcent
})

let humref4 = ref(database, "hum4/Current")
onValue(humref4, (snapshot) => {
    document.getElementById("hum4").innerHTML = snapshot.val() + prcent
})

let humref5 = ref(database, "hum5/Current")
onValue(humref5, (snapshot) => {
    document.getElementById("hum5").innerHTML = snapshot.val() + prcent
})