import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import isSameDay from 'date-fns/isSameDay';
// import { daysToWeeks } from 'date-fns';

function formatChatListDate(date, todayFormat = 'HH:mm') {
  if (isToday(date)) {
    return format(date, todayFormat);
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  if (differenceInCalendarDays(new Date(),date) < 7) {
  return format(date, 'EEEE');
  }

  return format(date, 'dd/MM/yyyy');
}

function formatMsgTime(date) {
  return format(date, 'H:mm');
}

export { formatChatListDate, formatMsgTime, isSameDay };

/*
dateMarkerFormat()

stickyDateMarkerFormat()
  if isToday(msg)
    return Today  //<< only difference!
  if isYesterday(msg)
    return yesterday
  if daysAgo(msg) <= 7
    return {day}

  return dd/mm/yyy


formatMsgInfoDate()
  today at hh:mm,
  yesterday at hh:mm,
  05/09/2021 at hh:mm
*/
