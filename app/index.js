import clock from 'clock';
import document from 'document';
import { preferences } from 'user-settings';
import { display } from 'display';
import { HeartRateSensor } from 'heart-rate';
import { battery } from 'power';

// import * as util from '../common/utils';

function getNumberOfPlace(num, place) {
  switch (place) {
  case 1: return num % 10;
  case 2: return Math.floor(num / 10) % 10;
  case 3: return Math.floor(num / 100) % 10;
  case 4: return Math.floor(num / 1000);
  }
  return 0; // not supported;
}

// heart rate
const heartBeatNum1 = document.getElementById('heartBeatNum1');
const heartBeatNum2 = document.getElementById('heartBeatNum2');
const heartBeatNum3 = document.getElementById('heartBeatNum3');
const heartRateSensor = new HeartRateSensor();
heartRateSensor.onreading = () => {
  const heartRate = (heartRateSensor.heartRate || 0);
  heartBeatNum1.href = `images/num_s_${getNumberOfPlace(heartRate, 1)}.png`;
  heartBeatNum2.href = `images/num_s_${getNumberOfPlace(heartRate, 2)}.png`;
  heartBeatNum3.href = `images/num_s_${getNumberOfPlace(heartRate, 3)}.png`;

  heartRateSensor.stop();
};
function updateHartRate() {
  heartRateSensor.start();
}


// battery
const batteryIcon = document.getElementById('batteryIcon');
const batteryNum1 = document.getElementById('batteryNum1');
const batteryNum2 = document.getElementById('batteryNum2');
const batteryNum3 = document.getElementById('batteryNum3');
function updateBattery() {
  const { chargeLevel } = battery;
  if (chargeLevel >= 60) {
    batteryIcon.href = 'images/battery_full.png';
  } else if (chargeLevel >= 20) {
    batteryIcon.href = 'images/battery_mid.png';
  } else {
    batteryIcon.href = 'images/battery_low.png';
  }
  batteryNum1.href = `images/num_s_${getNumberOfPlace(chargeLevel, 1)}.png`;
  batteryNum2.href = `images/num_s_${getNumberOfPlace(chargeLevel, 2)}.png`;
  batteryNum3.href = `images/num_s_${getNumberOfPlace(chargeLevel, 3)}.png`;
}


// calender
const dayNum1 = document.getElementById('dayNum1');
const dayNum2 = document.getElementById('dayNum2');
const month = document.getElementById('month');
const yearNum1 = document.getElementById('yearNum1');
const yearNum2 = document.getElementById('yearNum2');
const yearNum3 = document.getElementById('yearNum3');
const yearNum4 = document.getElementById('yearNum4');
function updateCalender(date) {
  const day = date.getDate();
  const year = date.getFullYear();
  dayNum1.href = `images/num_sy_${getNumberOfPlace(day, 1)}.png`;
  dayNum2.href = `images/num_sy_${getNumberOfPlace(day, 2)}.png`;
  month.href = `images/mon_${date.getMonth() + 1}.png`;
  yearNum1.href = `images/num_sy_${getNumberOfPlace(year, 1)}.png`;
  yearNum2.href = `images/num_sy_${getNumberOfPlace(year, 2)}.png`;
  yearNum3.href = `images/num_sy_${getNumberOfPlace(year, 3)}.png`;
  yearNum4.href = `images/num_sy_${getNumberOfPlace(year, 4)}.png`;
}


// time
const hourNum1 = document.getElementById('hourNum1');
const hourNum2 = document.getElementById('hourNum2');
const minuteNum1 = document.getElementById('minuteNum1');
const minuteNum2 = document.getElementById('minuteNum2');
const secondNum1 = document.getElementById('secondNum1');
const secondNum2 = document.getElementById('secondNum2');
function updateTime(date) {
  let hours = date.getHours();
  if (preferences.clockDisplay === '12h') {
    // 12h format
    hours = hours % 12 || 12;
  }
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  hourNum1.href = `images/num_l_${getNumberOfPlace(hours, 1)}.png`;
  hourNum2.href = `images/num_l_${getNumberOfPlace(hours, 2)}.png`;
  minuteNum1.href = `images/num_l_${getNumberOfPlace(minutes, 1)}.png`;
  minuteNum2.href = `images/num_l_${getNumberOfPlace(minutes, 2)}.png`;
  secondNum1.href = `images/num_s_${getNumberOfPlace(seconds, 1)}.png`;
  secondNum2.href = `images/num_s_${getNumberOfPlace(seconds, 2)}.png`;

}


// animation
const colon = document.getElementById('colon');
const heartBeatIcon = document.getElementById('heartBeatIcon');
const character = document.getElementById('character');
function updateAnimation(date) {
  const seconds = date.getSeconds();
  const frame = seconds % 2 === 0;
  colon.style.display = frame ? 'none' : 'inline';
  heartBeatIcon.href = `images/heartbeat_${frame ? '1' : '2'}.png`;

  const charFrame = seconds % 4 + 1;
  character.href = `images/char_2_${charFrame === 4 ? 2 : charFrame}.png`;
}


let initialized = false;
clock.granularity = 'seconds';
clock.ontick = evt => {
  const { date } = evt;
  if (date.getSeconds() === 0 || !initialized) {
    updateHartRate();
    updateBattery();
    updateTime(date);
    updateCalender(date);
  } else if (display.on) {
    updateTime(date);
    updateAnimation(date);
  }
  initialized = true;
};
