import {
  format,
  parse,
  isAfter,
  isBefore,
  addMonths,
  addDays,
  isValid,
} from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const formats = Object.freeze({
  default: "MMMM do yyyy", // June 6th 2023
  comma: "MMMM d, yyyy", // June 6, 2023
  commaShort: "MMM do, yyyy", // Jun 6th, 2023
  commaShortNumbers: "MMM d, yyyy", // Jun 6, 2023
  dash: "yyyy-MM-dd", // 2023-06-06
  full: "LLLL do, y H:mm O", // June 6th, 2023 11:48 GMT+2
  short: "MMM do, yyyy H:mm", // Jun 6th, 2023 11:48
  fullDateTime: "yyyy-MM-dd'T'HH:mm", //2023-09-29T11:39:38+02:00
  time: "H:mm",
  slash: "yyyy/MM/dd",
  fullTime: "HH:mm",
  slim: "MMM do",
});

type F = keyof typeof formats;
type RelativeDate = { days?: number; months?: number };
type Timezone = Intl.DateTimeFormatOptions["timeZone"];

export const relativeDatePresets = {
  MINUS_30_DAYS: { days: -30 },
  MINUS_60_DAYS: { days: -60 },
  PLUS_7_DAYS: { days: 7 },
};

export function getCurrentDateFormatted(dateFormat: F = "default"): string {
  return getDateFormatted(new Date(), dateFormat);
}

export function getDateFormatted(
  date: Date,
  dateFormat: F = "default",
  timezone?: Timezone,
): string {
  if (timezone) {
    return formatInTimeZone(date, timezone, formats[dateFormat]);
  }
  return format(date, formats[dateFormat]);
}

function getRelativeDate(diff: RelativeDate): Date {
  const now = new Date();
  const daysShift = addDays(now, diff.days || 0);
  const daysAndMonthsShift = addMonths(daysShift, diff.months || 0);
  return daysAndMonthsShift;
}

export function getRelativeDateFormatted(
  dateFormat: F = "default",
  diff: RelativeDate,
  timezone?: Timezone,
): string {
  const relativeDate = getRelativeDate(diff);
  return getDateFormatted(relativeDate, dateFormat, timezone);
}

export function isDateInRange(
  targetDate: Date,
  before: RelativeDate,
  after: RelativeDate,
) {
  const lowerBoundDate = getRelativeDate(before);
  const upperBoundDate = getRelativeDate(after);
  return (
    isAfter(targetDate, lowerBoundDate) && isBefore(targetDate, upperBoundDate)
  );
}
