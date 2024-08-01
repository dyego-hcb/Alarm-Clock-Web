const clockElement = document.getElementById("clock");
const addAlarmButton = document.getElementById("addAlarm");
const alarmListElement = document.getElementById("alarmList");
const modalElement = document.getElementById("alarmModal");
const closeButton = document.getElementsByClassName("close")[0];
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const ampmInput = document.getElementById("ampm");
const repeatTypeSelect = document.getElementById("repeatType");
const customDays = document.getElementById("customDays");
const snoozeButtonTrigger = document.getElementById("snoozeButtonTrigger");
const cancelButtonTrigger = document.getElementById("cancelButtonTrigger");
const modalElementAlarmTrigger = document.getElementById("alarmModalTrigger");
const toggleThemeButton = document.getElementById("toggleTheme");
const toggleTimeFormatButton = document.getElementById("toggleTimeFormat");

let alarms = [];
let sound = new Audio(
  "https://freesound.org/data/previews/316/316847_4939433-lq.mp3"
);
sound.loop = true;

let isDarkTheme = false;
let is24HourFormat = false;

function displayTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  clockElement.textContent = formatTime(hours, minutes, seconds);
}

function formatTime(hours, minutes, seconds) {
  let formattedHours = hours;
  let ampm = "";

  if (!is24HourFormat) {
    ampm = hours >= 12 ? "PM" : "AM";
    formattedHours = hours % 12 || 12;
  }

  return `${padZero(formattedHours)}:${padZero(minutes)}:${padZero(seconds)} ${
    ampm ? ampm : ""
  }`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}

function openModal() {
  modalElement.style.display = "block";
  resetModal();
}

function closeModal() {
  modalElement.style.display = "none";
}

function resetModal() {
  hoursInput.value = "";
  minutesInput.value = "";
  ampmInput.value = "am";
  repeatTypeSelect.value = "none";
  customDays.classList.add("hide");
  Array.from(customDays.getElementsByTagName("input")).forEach((input) => {
    input.checked = false;
  });
}

repeatTypeSelect.addEventListener("change", function () {
  if (this.value === "custom") {
    customDays.classList.remove("hide");
  } else {
    customDays.classList.add("hide");
  }
});

function saveAlarm() {
  const hours = parseInt(hoursInput.value);
  const minutes = parseInt(minutesInput.value);
  const ampm = ampmInput.value;
  const repeatType = repeatTypeSelect.value;
  const days = Array.from(customDays.getElementsByTagName("input"))
    .filter((input) => input.checked)
    .map((input) => input.value);

  const alarm = {
    hours,
    minutes,
    ampm,
    repeatType,
    days,
    id: Date.now(),
  };

  alarms.push(alarm);
  renderAlarm(alarm);
  scheduleAlarm(alarm);

  closeModal();
}

function scheduleAlarm(alarm) {
  const { hours, minutes, ampm, repeatType, days } = alarm;
  let now = new Date();
  let alarmTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    is24HourFormat ? hours : convertTo24Hour(hours, ampm),
    minutes
  );

  if (repeatType === "everyday") {
    scheduleRepeatedAlarm(alarmTime, 24 * 60 * 60 * 1000);
  } else if (repeatType === "custom") {
    const dayMs = 24 * 60 * 60 * 1000;
    const today = now.getDay();
    for (let i = 0; i < 7; i++) {
      const alarmDay = (today + i) % 7;
      if (days.includes(getDayName(alarmDay))) {
        const alarmDayTime = alarmTime.getTime() + i * dayMs;
        scheduleRepeatedAlarm(new Date(alarmDayTime), dayMs);
      }
    }
  } else {
    let delay = alarmTime.getTime() - now.getTime();
    if (delay < 0) {
      delay += 24 * 60 * 60 * 1000; // set for the next day
    }
    setTimeout(() => {
      playAlarm(alarm);
    }, delay);
  }
}

function convertTo24Hour(hours, ampm) {
  return ampm === "pm" && hours !== 12
    ? hours + 12
    : ampm === "am" && hours === 12
    ? 0
    : hours;
}

function playAlarm(alarm) {
  sound.play();
  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification();
      }
    });
  }

  function showNotification() {
    const notification = new Notification("Alarm", {
      body: "It's time to wake up!",
      icon: "🦊",
    });

    notification.addEventListener("click", () => {
      window.focus();
      modalElementAlarmTrigger.style.display = "none";
    });
  }

  modalElementAlarmTrigger.style.display = "block";
  document.getElementById("alarmModalTriggerTitle").textContent = "Alarm";
  document.getElementById("alarmModalTriggerMensage").textContent =
    "🦊 It's time to wake up!";

  snoozeButtonTrigger.addEventListener("click", () => {
    const snoozeTime = 5 * 60 * 1000;
    const now = new Date().getTime();
    const alarmTime = now + snoozeTime;
    alarm.snoozeTime = alarmTime;
    sound.pause();
    setTimeout(() => {
      playAlarm(alarm);
    }, snoozeTime);
  });

  cancelButtonTrigger.addEventListener("click", () => {
    sound.pause();
    if (alarm.repeatType === "none") {
      deleteAlarm(alarms.indexOf(alarm));
    }
    modalElementAlarmTrigger.style.display = "none";
  });
}

function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

function clearAlarmList() {
  alarmListElement.innerHTML = "";
}

function renderAlarm(alarm) {
  const alarmItem = document.createElement("li");
  const alarmTime = document.createElement("span");
  const alarmRepeat = document.createElement("span");
  const deleteButton = document.createElement("button");

  alarmTime.textContent = `🦊 ${alarms.indexOf(alarm) + 1} ${padZero(
    alarm.hours
  )}:${padZero(alarm.minutes)} ${alarm.ampm} `;
  alarmItem.appendChild(alarmTime);

  if (alarm.repeatType !== "none") {
    alarmItem.classList.add("repeated");
    if (alarm.repeatType === "custom") {
      alarmRepeat.textContent = "Custom: " + alarm.days.join(", ");
    } else {
      alarmRepeat.textContent = "Repeat: " + alarm.repeatType;
    }
    alarmItem.appendChild(alarmRepeat);
  }

  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () =>
    deleteAlarm(alarms.indexOf(alarm))
  );

  alarmItem.appendChild(deleteButton);
  alarmListElement.appendChild(alarmItem);
}

function renderAlarms() {
  clearAlarmList();
  alarms.forEach((alarm) => renderAlarm(alarm));
}

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle("dark-theme", isDarkTheme);
  document
    .querySelector(".container")
    .classList.toggle("dark-theme", isDarkTheme);
}

function toggleTimeFormat() {
  is24HourFormat = !is24HourFormat;
  const ampmLabel = document.querySelector(".ampm-label");
  const ampmSelect = document.querySelector(".ampm-select");
  ampmLabel.style.display = is24HourFormat ? "none" : "inline-block";
  ampmSelect.style.display = is24HourFormat ? "none" : "inline-block";
}

addAlarmButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
saveButton.addEventListener("click", saveAlarm);
cancelButton.addEventListener("click", closeModal);
toggleThemeButton.addEventListener("click", toggleTheme);
toggleTimeFormatButton.addEventListener("click", toggleTimeFormat);

displayTime();
setInterval(displayTime, 1000);
