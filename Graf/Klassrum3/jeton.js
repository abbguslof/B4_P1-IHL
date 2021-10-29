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


let values = [
    ['Tidpunkt', 'Temperatur'],
    ['2004', 1000],
    ['2005', 1170],
    ['2006', 660],
    ['2007', 1030]
]


let datePicker = document.getElementById('datum')

google.charts.load('current', { 'packages': ['corechart'] })
google.charts.setOnLoadCallback(drawChart)

function drawChart () {
    var data = google.visualization.arrayToDataTable([
        ['Tidpunkt', 'Temperatur'],
        ['12:00', 22],
        ['13:00', 12],
        ['14:00', 33],
        ['15:00', 33]
    ])

    var options = {
        title: 'Temperatur',
        curveType: 'function',
        legend: { position: 'bottom' }
    }

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'))

    chart.draw(data, options)
}

datePicker.onchange = function () {
    console.log(datePicker.value)
    if (datePicker.value != null) {
        const datumRef = ref(db, datePicker.value + '/vardagsrummet' + '/temperature')
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
        title: 'Company Performance',
        curveType: 'function',
        legend: { position: 'bottom' }
    }

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'))

    chart.draw(data, options)
}








