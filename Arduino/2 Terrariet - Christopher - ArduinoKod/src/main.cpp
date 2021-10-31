#include <Arduino.h>
#include <Adafruit_GFX.h>
#include <Adafruit_I2CDevice.h>
#include <AM2320.h>
#include <Wire.h>
#include <SPI.h>
#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <chrono>
#include <iostream>

// -- My own files --

#include "dataHandler.h"

// ------------------

// 1 Gustavs Arduino: Klassrummet
// 2 Christophers Arduino: Terrariet
// 3 Lucas Arduino: Vardagsrummet
// 4 Erlings Arduino: Kafeterian
// 5 Viktors Arduino: Pingisrummet

#define FIREBASE_HOST "abb-temp-project-d1548-default-rtdb.europe-west1.firebasedatabase.app" //Change to your Firebase RTDB project ID e.g. Your_Project_ID.firebaseio.com
#define FIREBASE_AUTH "AIoCqJ2jpzkQfzp9AiciGnhW1fX4WiXmVE4ORqcD"                              //Change to your Firebase RTDB secret password
#define WIFI_SSID "ABB_Indgym_Guest"                                                          // The name of the WIFI network to connect to
#define WIFI_PASSWORD "Welcome2abb"                                                           // Password for the WIFI network
#define NTP_SERVER "pool.ntp.org"                                                             // Address for the server to get epoch time

//Define Firebase Data objects
FirebaseData DataObject;
AM2320 sensor;

// --- Global values ---

const String location = "Terrariet"; // Väljer vilken tabell under datumet
const int tableIndex = 2;            // Väljer platts i firebase. Vilken temp/hum x den ska skriva till

const byte SENSOR_DATA_PIN = 12;  // Data D6
const byte SENSOR_CLOCK_PIN = 14; // Data D5

time_t Last_Epoch;
time_t Epoch_Time;

time_t t;
struct tm ttm;
char date[11];

void setup()
{
    Serial.begin(115200);
    Wire.begin(SENSOR_DATA_PIN, SENSOR_CLOCK_PIN);

    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, true);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.println("\n\n\nConnecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }

    configTime(0, 0, NTP_SERVER); // Set system time to epoch time

    Serial.println("\n\nConnected with IP: ");
    Serial.println(WiFi.localIP());

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.reconnectWiFi(true);

    if (!Firebase.beginStream(DataObject, location))
    {
        Serial.println("Could not begin stream:");
        Serial.println("REASON: " + DataObject.errorReason() + "\n");
    }

    addHourlyElement(DataObject, sensor, location, time(0)); // This will clear the database
    time(&Last_Epoch);
    Last_Epoch -= Last_Epoch % 3600;
}

void loop()
{

    if (!Firebase.readStream(DataObject))
    {
        Serial.println("\nCan't read stream data");
        Serial.println("REASON: " + DataObject.errorReason() + "\n");
    }

    if (DataObject.streamTimeout())
    {
        Serial.println("\nStream timeout, resume streaming...\n");
    }

    updateCurrent(DataObject, tableIndex, sensor);
    // addHourlyElement(DataObject, sensor, location, time(0));
    time(&Epoch_Time); // Update current time

    /* 
        We only want to shift the tables up one if there was an error with
        shiftTables previously or if it has elapsed 3600 seconds since last time
    */
    if (hasErrored() || Epoch_Time - Last_Epoch >= (3600))
    {
        if (!hasErrored())
            Last_Epoch = Epoch_Time;

        time(&t);
        ttm = *localtime(&t);
        sprintf(date, "%04d-%02d-%02d", ttm.tm_year + 1900, ttm.tm_mon + 1, ttm.tm_mday);
        setCurrentDate(String(date));
    }
}