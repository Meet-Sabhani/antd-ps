export default function slotsCalculate(startTime, endTime, interval) {

  const startMinutes = parseTime(startTime);
  const endMinutes = parseTime(endTime);
  const intervalMinutes = parseInt(interval);

  const timeSlots = [];

  for (
    let currentTime = startMinutes;
    currentTime <= endMinutes;
    currentTime += intervalMinutes
  ) {
    const slotStart = convertMinutesToTime(currentTime);
    const slotEnd = convertMinutesToTime(currentTime + intervalMinutes);
    timeSlots.push({ time: `${slotStart} - ${slotEnd}`, booked: false });
  }

  return timeSlots;
}


function parseTime(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

function convertMinutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${padZero(hours)}:${padZero(remainingMinutes)}`;
}

function padZero(value) {
  return value < 10 ? `0${value}` : value.toString();
}
