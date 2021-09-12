import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
// import { daysToWeeks } from 'date-fns';
// import isSameDay from 'date-fns/isSameDay';

function formatChatListDate(date) {
  if (isToday(date)) {
    return format(date, 'H:mm');
  }
  if (isYesterday(date)) {
    return 'yesterday';
  }
  if (differenceInCalendarDays(date, new Date()) <= 7) {
    return format(date, 'EEEE');
  }

  return format(date, 'dd/MM/yyyy');
}

function formatMsgDate(date) {
  return formatChatListDate(date);
}

export { formatChatListDate, formatMsgDate };

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
