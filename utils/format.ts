import dayjs from "./dayjs";

export const formatFullDateTime = (date: string): string => {
  return dayjs.utc(date).tz().format("DD/MM/YYYY HH:mm:ss");
};

export const formatDate = (date: string): string => {
  return dayjs.utc(date).tz().format("DD/MM/YYYY");
};

export const formatTime = (date: string): string => {
  return dayjs.utc(date).tz().format("HH:mm:ss");
};

export const formatShortDateTime = (date: string): string => {
  return dayjs.utc(date).tz().format("DD/MM HH:mm");
};

export const formatShortDate = (date: string): string => {
  return dayjs.utc(date).tz().format("DD/MM");
};

export const formatShortTime = (date: string): string => {
  return dayjs.utc(date).tz().format("HH:mm");
};
