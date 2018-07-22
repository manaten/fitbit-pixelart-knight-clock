import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";

import * as util from "../common/utils";

// // heart rate
// const heartRateLabel = document.getElementById("heartRateLabel");
// const heartRateSensor = new HeartRateSensor();
// heartRateSensor.onreading = () => {
//   heartRateLabel.text = util.monoDigits(heartRateSensor.heartRate || 0, false);
//   heartRateSensor.stop();
// }
// function updateHartRate() {
//   heartRateSensor.start();
// }


// // battery
// const batteryLevel = document.getElementById("batteryLevel");
// const batteryLabel = document.getElementById("batteryLabel");
// function updateBattery() {
//   batteryLevel.width = Math.round(battery.chargeLevel * 30 / 100);
//   batteryLevel.style.fill = chargeLevelToColor(battery.chargeLevel);
//   batteryLabel.text = util.monoDigits(battery.chargeLevel) + '%';
// }


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
    img.href = "images/fitbit2.png";
    // updateHartRate();
    // updateBattery();
    // updateTime(evt.date);
  // }
}