# Auto_Delivery_Robot_Web_Control_GUI

## SetUp Guide

1. Pull the Repository to a Server that you desire
2. copy [config\ConnectionConfig.js.template](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/config/ConnectionConfig.js.template) to config\ConnectionConfig.js and change the config to what you need
3. Host the Website using Nginx or similar Service

## Project Wiki

### Project Pages

* Main Page(index.html) contain a camera view from Robot and a joysticks to control it
* Map Page(map.html) contain Map View that show the robot gps location. It will do path planning for the robot to a remote gps location
* Field Page(field.html) contain a joysticks to control robot and a map shown the gps location

### Use the robot through internet

1. You need to buy a server from a Server Provider like AWS or Linode
2. You need to give robot internet access (Use a mobile hotspot or a USB Sim Adapter)
3. You need to use Intranet penetration Service to publish the robot port to the internet
   * [NPS/NPC](https://github.com/ehang-io/nps/) is recommanded
4. You are good to go

### Project Structure

* [asset](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/asset) contain Image/Icon used for this Webside
* [commmonLIB](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/commmonLIB) contain the common file for all three Page
* [config](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/config) contain the setting of the project
* [mainUIJS](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/mainUIJS) contain the javascript entry point of the index.html
* [mapUIJS](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/mapUIJS) contain the javascript entry point of the map.html
* [FieldUIJS](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/FieldUIJS) contain the javascript entry point of the field.html
* [renderLib](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/renderLib) contain the all file needed to render the Website so you can run the Website offline (Google Map will not show in Offline Condition)
* [googlemap](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/googlemap) contain the custom js function relatide to google map API
* [rosjs](https://github.com/CMPE195-Group-28-Auto-Delivery-Robot/Auto_Delivery_Robot_Web_Control_GUI/tree/master/rosjs) contain the custom js function relatide to rosLib API
