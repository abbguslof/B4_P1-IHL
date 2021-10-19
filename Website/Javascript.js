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

const cgrader = "°C"
const TMP = "Temp: "
const HUM = "Hum: "
const PRCNT = "%"


//get ute temp
async function getapi () {
    // Storing response
    const response = await fetch('https://api.temperatur.nu/tnu_1.17.php?p=vasteras&cli=api_demo')

    // Storing data in form of JSON
    var data = await response.json()
    console.log(data)
    console.log(data.stations[0].temp)
    let temp = data.stations[0].temp
    document.getElementById("utetemp").innerHTML = TMP + temp + cgrader
    if (response) {
    }
}

getapi()
    // Storing response
    //Temp script

let dataBaseRef = ref(database, "Temp/Current")
onValue(dataBaseRef, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("klass1").innerHTML = TMP + snapshot.val() + cgrader
})

let dataBaseRef2 = ref(database, "Temp2/Current")
onValue(dataBaseRef2, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("klass2").innerHTML = TMP + snapshot.val() + cgrader
})

let dataBaseRef3 = ref(database, "Temp3/Current")
onValue(dataBaseRef3, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("klass3").innerHTML = TMP + snapshot.val() + cgrader
})

let dataBaseRef5 = ref(database, "Temp5/Current")
onValue(dataBaseRef5, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("pingis").innerHTML = TMP + snapshot.val() + cgrader
})


//Hum script




