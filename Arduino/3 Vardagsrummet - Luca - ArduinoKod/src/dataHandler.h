#pragma once
#include <Arduino.h>
#include <FirebaseESP8266.h>
#include <AM2320.h>
#include <string>
#include <time.h>

void setCurrentDate(String d);
bool hasErrored();
String getHour();
bool updateTempHum(AM2320 &sensor);
void addHourlyElement(FirebaseData &DataObject, AM2320 &sensor, String location, time_t Epoch_Time);
void updateCurrent(FirebaseData &DataObject, int tableIndex, AM2320 &sensor);
