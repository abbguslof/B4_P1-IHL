#include <dataHandler.h>

#include <cstdio>

FirebaseJson table, current;

float temperatureTable[25]; // Store all temperature values
float humidityTable[25];    // Store all humidity values
float TEMP_HUM[2];          // Store the newly acquired values for temperature and humidity

bool errored = false;
String currentDate = "2021-10-29";
int currentInterval = 0;

void setCurrentDate(String d)
{
    currentDate = d;
}

bool hasErrored()
{
    return errored;
}

String getHour()
{
    time_t t;
    struct tm ttm;
    time(&t);
    ttm = *localtime(&t);

    Serial.printf("Hour: %d\n", ttm.tm_hour);

    return ((ttm.tm_hour < 10) ? "0" + String(ttm.tm_hour, 10) : String(ttm.tm_hour, 10));
}

// This function updates the current temperature and humidity
bool updateTempHum(AM2320 &sensor)
{
    if (sensor.measure())
    {
        TEMP_HUM[0] = sensor.getTemperature();
        TEMP_HUM[1] = sensor.getHumidity();
    }
    else if (!errored)
    {
        int errorCode = sensor.getErrorCode();
        switch (errorCode)
        {
        case 1:
            Serial.println("ERR: Sensor is offline");
            break;
        case 2:
            Serial.println("ERR: CRC validation failed");
            break;
        }
        return false;
    }
    return true;
}

//
void addHourlyElement(FirebaseData &DataObject, AM2320 &sensor, String location, time_t Epoch_Time)
{
    if (updateTempHum(sensor))
    {
        location = currentDate + "/" + location + "/";
        String time = getHour() + ":00";
        table.set("temperature/" + String(currentInterval, 10) + "/time", time);
        table.set("temperature/" + String(currentInterval, 10) + "/value", TEMP_HUM[0]);

        table.set("humidity/" + String(currentInterval, 10) + "/time", time);
        table.set("humidity/" + String(currentInterval, 10) + "/value", TEMP_HUM[1]);

        if (!Firebase.setJSON(DataObject, location, table))
        {
            Serial.println("Error occured for set:");
            Serial.println(DataObject.errorReason());
        }
    }
}

// Update the current temperature and humidity
void updateCurrent(FirebaseData &DataObject, int tableIndex, AM2320 &sensor)
{

    if (updateTempHum(sensor))
    {

        current.set("Current", TEMP_HUM[0]);

        if (!Firebase.setJSON(DataObject, "/Temp" + String(tableIndex, 10) + "/", current))
        {
            Serial.println("Error occured for set:");
            Serial.println(DataObject.errorReason());
        }

        current.set("Current", TEMP_HUM[1]);

        if (!Firebase.setJSON(DataObject, "/Hum" + String(tableIndex, 10) + "/", current))
        {
            Serial.println("Error occured for set:");
            Serial.println(DataObject.errorReason());
        }
    }
}