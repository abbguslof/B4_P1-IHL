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

const app = initializeApp(firebaseConfig)
const database = getDatabase()



// // Get ute temp

// async function getapi () {
//     // Storing response
//     const response = await fetch('https://api.temperatur.nu/tnu_1.17.php?p=vasteras&cli=api_demo')

//     // Storing data in form of JSON
//     var data = await response.json()
//     console.log(data)
//     console.log(data.stations[0].temp)
//     let temp = data.stations[0].temp
//     document.getElementById("utetemp").innerHTML = TMP + temp + cgrader
//     if (response) {
//     }
// }

// getapi()
    
    


const cgrader = "°C"
const TMP = "Temp: "
const HUM = "Hum: "
const PRCNT = "%"

// Get temp klassrum 1
let dataBaseRef = ref(database, "Temp/Current")
onValue(dataBaseRef, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("klass1").innerHTML = TMP + snapshot.val() + cgrader
})
// Get temp klassrum 2
let dataBaseRef2 = ref(database, "Temp2/Current")
onValue(dataBaseRef2, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("klass2").innerHTML = TMP + snapshot.val() + cgrader
})
// Get temp klassrum 3
let dataBaseRef3 = ref(database, "Temp3/Current")
onValue(dataBaseRef3, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("klass3").innerHTML = TMP + snapshot.val() + cgrader
})

// Get temp cafeterian
let dataBaseRef4 = ref(database, "Temp4/Current")
onValue(dataBaseRef4, (snapshot) => {
    document.getElementById("cafeterian").innerHTML = TMP + snapshot.val() + cgrader

   })
// Get temp pingsirummet
let dataBaseRef5 = ref(database, "Temp5/Current")
onValue(dataBaseRef5, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("pingis").innerHTML = TMP + snapshot.val() + cgrader
})




const Hum = "Fuktighet: "
const prcent = "%"

// Get Humidity klassrum 1
let humref1 = ref(database, "hum/Current")
onValue(humref1, (snapshot) => {
    document.getElementById("hum1").innerHTML = Hum + snapshot.val() + prcent 
})
// Get Humidity klassrum 2
let humref2 = ref(database, "hum2/Current")
onValue(humref2, (snapshot) => {
    document.getElementById("hum2").innerHTML = Hum + snapshot.val() + prcent 
})
// Get Humidity klassrum 3
let humref3 = ref(database, "hum3/Current")
onValue(humref3, (snapshot) => {
    document.getElementById("hum3").innerHTML = Hum + snapshot.val() + prcent 
})
// Get Humidity cafeterian
let humref4 = ref(database, "hum4/Current")
onValue(humref4, (snapshot) => {
    document.getElementById("hum4").innerHTML = Hum + snapshot.val() + prcent 
})
// Get Humidity pingisrummet
let humref5 = ref(database, "hum5/Current")
onValue(humref5, (snapshot) => {
    document.getElementById("hum5").innerHTML = Hum + snapshot.val() + prcent 
})




