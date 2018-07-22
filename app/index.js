import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";

import * as util from "../common/utils";

// heart rate
const heartBeatIcon = document.getElementById("heartBeatIcon");
const heartBeatNum1 = document.getElementById("heartBeatNum1");
const heartBeatNum2 = document.getElementById("heartBeatNum2");
const heartBeatNum3 = document.getElementById("heartBeatNum3");
const heartRateSensor = new HeartRateSensor();
heartRateSensor.onreading = () => {
  heartRateSensor.stop();
}
function updateHartRate(date) {
  const frame = date.getSeconds() % 2 === 0;
  const haertRate = heartRateSensor.heartRate || 0;

  heartBeatIcon.href = `images/heartbeat_${frame ? '1' : '2'}.png`;
  heartRateSensor.start();
}


// // battery
const batteryIcon = document.getElementById("batteryIcon");
const batteryNum1 = document.getElementById("batteryNum1");
const batteryNum2 = document.getElementById("batteryNum2");
const batteryNum3 = document.getElementById("batteryNum3");
function updateBattery() {
  const {chargeLevel} = battery;
  if (chargeLevel >= 60) {
    batteryIcon.href = "images/battery_full.png";
  } else if (chargeLevel >= 20) {
    batteryIcon.href = "images/battery_mid.png";
  } else {
    batteryIcon.href = "images/battery_low.png";
  } 
  
}


// // time & date
// const myLabel = document.getElementById("myLabel");
// function updateDateTime(date) {
//   let today = date;
//   let hours = today.getHours();
//   if (preferences.clockDisplay === "12h") {
//     // 12h format
//     hours = hours % 12 || 12;
//   } else {
//     // 24h format
//     hours = util.zeroPad(hours);
//   }
//   let mins = util.zeroPad(today.getMinutes());
//   myLabel.text = `${hours}:${mins}`;
// }

const img = document.getElementById("img");

clock.granularity = "seconds";
clock.ontick = evt => {
  // if (display.on) {
    updateHartRate(evt.date);
    updateBattery();
    // updateTime(evt.date);
  // }
}