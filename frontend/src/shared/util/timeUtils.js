const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options).toUpperCase();
};

const convertMinutesToHours = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours} hrs`;
  } else {
    return `${hours} hrs ${minutes} mins`;
  }
};

function calculateEndTime(startTime, runtime) {
  const startHour = Math.floor(startTime);
  const startMinute = (startTime - startHour) * 60;

  let startDate = new Date();
  startDate.setHours(startHour);
  startDate.setMinutes(startMinute);
  startDate.setSeconds(0);

  let endDate = new Date(startDate.getTime() + runtime * 60000);

  let endHour = endDate.getHours();
  let endMinute = endDate.getMinutes();

  if (endMinute < 10) {
    endMinute = "0" + endMinute;
  }

  return `${endHour}:${endMinute}`;
}

export { formatDate, convertMinutesToHours, calculateEndTime };
