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

let datePicker = document.getElementById('datum')

// skriv ut temperatur Klassrum2
let dataBaseRef3 = ref(db, "Temp3/Current")
onValue(dataBaseRef3, (snapshot) => {
    //document.getElementById("klassrum2-temp").innerHTML = snapshot.val()
    let tempC = snapshot.val()//document.getElementById("klassrum2-temp").innerHTML
    const grader = "°" // Ger Grader värdet "°" och förenklar kodandet l'ngre ned
    let tempf = parseFloat(tempC) * 1.8 + 32  //grader i Farenheit
    let tempF = tempf.toFixed(1)

    function Farenheit () {
        let checkbutton = document.getElementById("ButtonCF").checked
        if (checkbutton == false) {
            document.getElementById("klassrum3-temp").innerHTML = tempC + grader + "C"
        }
        else {
            document.getElementById("klassrum3-temp").innerHTML = tempF + grader + "F"
        }
        setTimeout(Farenheit, 1000)
    }
    Farenheit()

    function TempImg (degrees, id) {
        if (degrees) { //kör bara funktionen om variabeln inte är null, undefined eller empty
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
            setTimeout(TempImg, 1000)
        }
    }
    TempImg(tempC, "picture")
})

const prcent = "%"

let humref2 = ref(db, "Hum3/Current")
onValue(humref2, (snapshot) => {
    document.getElementById("hum2").innerHTML = snapshot.val() + prcent
})

google.charts.load('current', { 'packages': ['corechart'] })
google.charts.setOnLoadCallback(drawChart)

function drawChart () {
    var data = google.visualization.arrayToDataTable([
        ['Tidpunkt', 'Temperatur'],
        ['01:00', 18],
        ['02:00', 19],
        ['03:00', 18],
        ['04:00', 19],
        ['05:00', 19],
        ['06:00', 20],
        ['07:00', 22],
        ['08:00', 21],
        ['09:00', 19],
        ['10:00', 22],
        ['11:00', 21],
        ['12:00', 22],
        ['13:00', 19],
        ['14:00', 19],
        ['15:00', 20],
        ['16:00', 21],
        ['17:00', 21],
        ['18:00', 23],
        ['19:00', 21],
        ['20:00', 21],
        ['21:00', 19],
        ['22:00', 20],
        ['23:00', 20],
        ['24:00', 19]
    ])

    var options = {
        title: 'Temperatur',
        curveType: 'function',
        legend: { position: 'bottom' },
        legendTextStyle: { color: '#FFF' },
        titleTextStyle: { color: '#FFF' },
        backgroundColor: '#323544',
        hAxis: {
            textStyle: { color: '#FFF' },
        },
        vAxis: {
            textStyle: { color: '#FFF' },
        }
    }

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'))

    chart.draw(data, options)
}

datePicker.onchange = function () {
    console.log(datePicker.value)
    if (datePicker.value != null) {
        const datumRef = ref(db, datePicker.value + '/Vardagsrummet' + '/temperature')
        onValue(datumRef, (snapshot) => {
            const data = snapshot.val()
            console.log(data)
            let newArray = [
                ['Tidpunkt', 'Temperatur']
            ]
            if (data != null && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const element = [data[i].time, data[i].value]
                    newArray.push(element)
                }
            }
            console.log(newArray)
            updateChart(newArray)
        })
    }

}

function updateChart (nyData) {
    var data = google.visualization.arrayToDataTable(nyData)

    var options = {
        title: 'Temperatur',
        curveType: 'function',
        legend: { position: 'bottom' },
        legendTextStyle: { color: '#FFF' },
        titleTextStyle: { color: '#FFF' },
        backgroundColor: '#323544',
        hAxis: {
            textStyle: { color: '#FFF' },
        },
        vAxis: {
            textStyle: { color: '#FFF' },
        }
    }

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'))

    chart.draw(data, options)
}