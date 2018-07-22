import clock from "clock";
import document from "document";
import display from "display";
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
  const heartRate = (heartRateSensor.heartRate || 0);

  const num1 = Math.floor(heartRate / 100);
  const num2 = Math.floor(heartRate / 10) % 10;
  const num3 = heartRate % 10;
  heartBeatNum1.href = `images/num_s_${num1}.png`;
  heartBeatNum2.href = `images/num_s_${num2}.png`;
  heartBeatNum3.href = `images/num_s_${num3}.png`;

  heartRateSensor.stop();
}
function updateHartRate(date) {
  const frame = date.getSeconds() % 2 === 0;
  heartBeatIcon.href = `images/heartbeat_${frame ? '1' : '2'}.png`;
  heartRateSensor.start();
}


// // battery
const batteryIcon = document.getElementById("batteryIcon");
const batteryNum1 = document.getElementById("batteryNum1");
const batteryNum2 = document.getElementById("batteryNum2");
const batteryNum3 = document.getElementById("batteryNum3");
function updateBattery() {
  const { chargeLevel } = battery;
  if (chargeLevel >= 60) {
    batteryIcon.href = "images/battery_full.png";
  } else if (chargeLevel >= 20) {
    batteryIcon.href = "images/battery_mid.png";
  } else {
    batteryIcon.href = "images/battery_low.png";
  }
  const num1 = Math.floor(chargeLevel / 100);
  const num2 = Math.floor(chargeLevel / 10) % 10;
  const num3 = chargeLevel % 10;
  batteryNum1.href = `images/num_s_${num1}.png`;
  batteryNum2.href = `images/num_s_${num2}.png`;
  batteryNum3.href = `images/num_s_${num3}.png`;
}


// time
const hourNum1 = document.getElementById("hourNum1");
const hourNum2 = document.getElementById("hourNum2");
const colon = document.getElementById("colon");
const minuteNum1 = document.getElementById("minuteNum1");
const minuteNum2 = document.getElementById("minuteNum2");
function updateTime(date) {
  let hours = date.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  }
  const minutes = date.getMinutes();
  const num1 = Math.floor(hours / 10);
  const num2 = hours % 10;
  const num3 = Math.floor(minutes / 10);
  const num4 = minutes % 10;
  hourNum1.href = `images/num_l_${num1}.png`;
  hourNum2.href = `images/num_l_${num2}.png`;
  minuteNum1.href = `images/num_l_${num3}.png`;
  minuteNum2.href = `images/num_l_${num4}.png`;

  colon.style.display = (date.getSeconds() % 2 === 0) ? "none" : "inline";
}

clock.granularity = "seconds";
clock.ontick = evt => {
  // if (display.on) {
    updateHartRate(evt.date);
    updateBattery();
    updateTime(evt.date);
  // }
}