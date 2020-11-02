import { getUnixTime, parse, getTime } from "date-fns";

export const getTimeStamp = (time) => {
  const date = parse(
    time,
    "HH:mm:ss",
    new Date(new Date().toDateString()).valueOf()
  );
  const timestamp = getTime(date);
  return timestamp;
};
