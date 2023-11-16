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
int startMillis;
WiFiSSLClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "0c318c3035dc4ef7996dc6d40bbc80b5.s2.eu.hivemq.cloud";
int        port     = 8883;
const char topic[]  = "Christians arduino";
const char topicRecived[]  = "Stop";
int tal = 50;

const long interval = 100000;
unsigned long previousMillis = 0;

int count = 0;
MKRIoTCarrier carrier;
String formattedTime = "";
String formattedDate = "";
String dateTime = "";
uint32_t myCustomColor = carrier.leds.Color(255,100,50);
int status = WL_IDLE_STATUS;
int dataArray = 2000;
int val[2000];
int GMT = 1; //gmt +1
const size_t capacity = JSON_ARRAY_SIZE(100) + 4 * JSON_OBJECT_SIZE(20)+20;
//array maalinger2 = [];
StaticJsonDocument<capacity> data;
//JsonArray mesurements = data.to<JsonArray>();
//data.add("hello");
//JsonObject dato = data["datetime"];


void setup() {
  pinMode(digitalPin,INPUT); 
  pinMode(analogPin, INPUT);
  Serial.begin(9600);
  startMillis = millis();
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  if (WiFi.status() == WL_NO_SHIELD) {

    Serial.println("WiFi shield not present");

    // don't continue:

    while (true);

  }
  Serial.println(".");// attempt to connect to WiFi network:
  Serial.print("Attempting to connect to WPA SSID: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    // failed, retry
    Serial.print(".");
    delay(5000);
  }
  carrier.withCase();
  carrier.begin();
  Serial.println("You're connected to the network");
  Serial.println();
  printWiFiStatus();

  timeClient.begin();
  timeClient.update();
  // Set time offset to your local timezone in seconds
  timeClient.setTimeOffset(3600);
  formattedTime = timeClient.getFormattedTime().substring(0, 5); // Get the formatted time string and keep only the hours and minutes

  setTime(timeClient.getEpochTime()); // Set the internal time using the epoch time from the NTP client
  formattedDate = print2digits(day()) + "-" + print2digits(month()) + "-" + String(year());
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
JsonArray mesurements = data.createNestedArray("mesurements");
  //Serial.println(analogVal); 
  if(analogVal > 80){
    carrier.leds.fill(myCustomColor, 0, 5);

    carrier.leds.show();
  }
  int plus;
  for(int i=0; i <= dataArray; i++){
    plus = val[i] + analogVal;
    val[i] =+ plus;
    int gennem = plus/dataArray;
    mesurements.add(gennem);
    plus = 0;
  }
  //Serial.println(dataArray);
}

void printTime() {
  timeClient.update();
  //String formattedTime = "";
  //String formattedDate = "";
  if (timeClient.getSeconds() == 0) { // Check if a full minute has been reached
    formattedTime = timeClient.getFormattedTime().substring(0, 5); // Get the formatted time string and keep only the hours and minutes

    setTime(timeClient.getEpochTime()); // Set the internal time using the epoch time from the NTP client
    formattedDate = print2digits(day()) + "-" + print2digits(month()) + "-" + String(year()); // Get the formatted date string using the TimeLib functions
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

void mqttbesked(){
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

void dataPrint(){
  
  //mesurements.remove(50);
  
  Serial.println(); 
  Serial.println(formattedTime); 
  Serial.println(formattedDate); 
  Serial.println(dateTime); 
  Serial.println(); 
  //mqttClient.poll();
  serializeJsonPretty(data, Serial);
  //delay(10000);
}

void loop() {
  //JsonArray maalinger = data.to<JsonArray>;
  //maalinger.add(analogVal);
  data.clear();
  data["id"] = count;
  data["place"] = "Christian";
  
  dateTime = formattedDate + " " + formattedTime;
  printTime();
  mqttClient.poll();
  unsigned long currentMillis = millis();
  data["datetime"] = dateTime;
  maaler();
  if(tal == 60){
    
  }
  if (currentMillis - startMillis >= interval) {
    
    startMillis = currentMillis;
    dataPrint();
    //data.set("datetime", dateTime);
    currentMillis = 0; 
    tal = 0;
    count++;
  }
  Serial.println(currentMillis);
  tal++;
  //mqttbesked();
}