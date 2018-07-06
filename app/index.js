import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";

import * as util from "../common/utils";

const heartRateLabel = document.getElementById("heartRateLabel");
const hrm = new HeartRateSensor();
hrm.onreading = () => {
  heartRateLabel.text = util.monoDigits(hrm.heartRate || 0, false);
  hrm.stop();
}
function updateHartRate() {
  hrm.start();
}

const batteryLevel = document.getElementById("batteryLevel");
const batteryLabel = document.getElementById("batteryLabel");
function updateBattery() {
  batteryLevel.width = Math.round(battery.chargeLevel * 30 / 100);
  batteryLevel.style.fill = chargeLevelToColor(battery.chargeLevel);
  batteryLabel.text = util.monoDigits(battery.chargeLevel) + '%';
}

const myLabel = document.getElementById("myLabel");
function updateTime(date) {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
}

clock.granularity = "seconds";
clock.ontick = evt => {
  if (display.on) {
    updateHartRate();
    updateBattery();
    updateTime(evt.date);
  }
}