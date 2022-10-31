module.exports = function getFileSizeDate(stat) {
  const { birthtimeMs, size } = stat;
  const birthtime = new Date(birthtimeMs);
  const month = birthtime.getMonth() + 1;
  const day = birthtime.getDate();
  const hour = birthtime.getHours();
  const minute = birthtime.getMinutes();
  console.info("month", month, day, hour, minute);
  return (
    String(size).padStart(3, "0") +
    " " +
    month +
    "月" +
    day +
    " " +
    hour +
    ":" +
    minute
  );
};
