#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>
#include <Arduino_MKRIoTCarrier.h>
#include "arduino_secrets.h"
#include <ArduinoJson.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <TimeLib.h>

//RTCZero rtc;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

char ssid[] = SECRET_SSID;    
char pass[] = SECRET_PASS;    
char user[] = MQTT_USER;
char user_pass[] = MQTT_PASS;
int digitalPin = 0;   // KY-037 digital interface
int analogPin = A5;   // KY-037 analog interface
//int ledPin = 13;      // Arduino LED pin
int digitalVal;       // digital readings
int analogVal;     

WiFiSSLClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "0c318c3035dc4ef7996dc6d40bbc80b5.s2.eu.hivemq.cloud";
int        port     = 8883;
const char topic[]  = "Christians arduino";
const char topicRecived[]  = "Stop";

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
const size_t capacity = JSON_OBJECT_SIZE(10)+16;
//array maalinger2 = [];
StaticJsonDocument<capacity> data;
//JsonObject data = rawData.to<JsonObject>();

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
  /*String formattedTime = timeClient.getFormattedTime().substring(0, 5); // Get the formatted time string and keep only the hours and minutes
  
  String formattedDate = String(day()) + "." + String(month()) + "." + String(year()); // Get the formatted date string using the TimeLib functions
  dateTime = formattedDate + " " + formattedTime;*/
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
  mqttClient.onMessage(onMqttMessage);
  Serial.println();
  mqttClient.subscribe(topicRecived);
}

void onMqttMessage(int messageSize) {
  // we received a message, print out the topic and contents
  Serial.println("Received a message with topic '");
  Serial.print(mqttClient.messageTopic());
  Serial.print("', length ");
  Serial.print(messageSize);
  Serial.println(" bytes:");
  // use the Stream interface to print the contents
  while (mqttClient.available()) {
    Serial.print((char)mqttClient.read());
  }

  //Serial.println();

  Serial.println();

}

void maaler(){
  digitalVal = digitalRead(digitalPin); 
  analogVal = analogRead(analogPin);
  //Serial.println(analogVal); 
}

void printTime() {
  timeClient.update();
  //String formattedTime = "";
  //String formattedDate = "";
  if (timeClient.getSeconds() == 0) { // Check if a full minute has been reached
    formattedTime = timeClient.getFormattedTime().substring(0, 5); // Get the formatted time string and keep only the hours and minutes

    setTime(timeClient.getEpochTime()); // Set the internal time using the epoch time from the NTP client
    formattedDate = print2digits(day()) + print2digits(month()) + String(year()); // Get the formatted date string using the TimeLib functions
  }
  

  delay(1000);
}

String print2digits(int number) {
  String result;
  if (number < 10) {
    result = "0" + String(number);
  }else {
    result = String(number);
  }
  return result;
}

void mqttbesked(StaticJsonDocument<300> nydata){
  mqttClient.beginMessage(topic);
  serializeJsonPretty(data, mqttClient);
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
  //JsonArray maalinger = data.to<JsonArray>;
  //maalinger.add(analogVal);
  mqttClient.poll();
  data["id"] = count;
  dateTime = formattedDate+formattedTime;
  data["maalinger"] = analogVal;
  data["tidspunkt"] = dateTime;
  Serial.println(); 
  Serial.println(formattedTime); 
  Serial.println(formattedDate); 
  Serial.println(dateTime); 
  data["placering"] = "Christian";
  Serial.println(); 
  mqttClient.poll();
  serializeJsonPretty(data, Serial);
  unsigned long currentMillis = millis();
  
  maaler();
  printTime();
  mqttbesked(data);
  count++;
}