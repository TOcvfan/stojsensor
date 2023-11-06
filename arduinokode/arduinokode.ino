#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>
#include <Arduino_MKRIoTCarrier.h>
#include "arduino_secrets.h"
//#include <RTCZero.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <TimeLib.h> // Include the TimeLib library

//RTCZero rtc;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;    // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
char user[] = MQTT_USER;
char user_pass[] = MQTT_PASS;
int digitalPin = 0;   // KY-037 digital interface
int analogPin = A5;   // KY-037 analog interface
int ledPin = 13;      // Arduino LED pin
int digitalVal;       // digital readings
int analogVal;     

WiFiSSLClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "6f22b3baab2b42cdbb9a22efb15eccbc.s2.eu.hivemq.cloud";
int        port     = 8883;
const char topic[]  = "Christians arduino";

const long interval = 1000;
unsigned long previousMillis = 0;

int count = 0;
MKRIoTCarrier carrier;
int keyIndex = 0;                           // your network key Index number (needed only for WEP)
String formattedTime = "";
String formattedDate = "";
String dateTime = "";

int status = WL_IDLE_STATUS;


int GMT = 1; //gmt +1

void setup() {
  pinMode(digitalPin,INPUT); 
  pinMode(analogPin, INPUT);
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  if (WiFi.status() == WL_NO_SHIELD) {

    Serial.println("WiFi shield not present");

    // don't continue:

    while (true);

  }

  // attempt to connect to WiFi network:
  Serial.print("Attempting to connect to WPA SSID: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    // failed, retry
    Serial.print(".");
    delay(5000);
  }

  Serial.println("You're connected to the network");
  Serial.println();
  printWiFiStatus();

  timeClient.begin();
  // Set time offset to your local timezone in seconds
  timeClient.setTimeOffset(3600);

  // Each client must have a unique client ID
  mqttClient.setId("ArduinoChr");
  // You can provide a username and password for authentication
  mqttClient.setUsernamePassword(user, user_pass);

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);
  mqttClient.connect(broker, port);

  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();
}

void maaler(){
  digitalVal = digitalRead(digitalPin); 
  analogVal = analogRead(analogPin);
  //Serial.println(analogVal); 
}

void printTime() {
  timeClient.update();
  
  if (timeClient.getSeconds() == 0) { // Check if a full minute has been reached
    formattedTime = timeClient.getFormattedTime().substring(0, 5); // Get the formatted time string and keep only the hours and minutes

    setTime(timeClient.getEpochTime()); // Set the internal time using the epoch time from the NTP client
    formattedDate = String(day()) + "." + String(month()) + "." + String(year()); // Get the formatted date string using the TimeLib functions
  }
  dateTime = formattedDate + " " + formattedTime;
  //Serial.println(formattedTime); 
  //Serial.println(formattedDate); 

  delay(1000);
}

void print2digits(int number) {
  if (number < 10) {
    Serial.print("0");
  }
  Serial.print(number);
}

void mqttbesked(int lyd, String tid){
  mqttClient.beginMessage(topic);
  mqttClient.print("{ ");
  mqttClient.println("  lydmaaling: ");
  mqttClient.print(lyd);
  mqttClient.print(",");
  mqttClient.println("  tidspunkt: ");
  mqttClient.print(tid);
  mqttClient.print(",");
  mqttClient.println("  placering: ");
  mqttClient.print("Christian");
  mqttClient.println("}");
  mqttClient.endMessage();
}

void printWiFiStatus() {
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void loop() {
  mqttClient.poll();
  Serial.println(dateTime);
  unsigned long currentMillis = millis();
  
  maaler();
  printTime();
  mqttbesked(analogVal, dateTime);
  count++;
}