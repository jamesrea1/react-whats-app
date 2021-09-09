import format from 'date-fns/format';
// import { daysToWeeks } from 'date-fns';
// import isSameDay from 'date-fns/isSameDay';

//https://date-fns.org/v2.23.0/docs/format
function formatChatListDate(date) {
  return format(date, 'dd/MM/yyyy'); //'h:mm a'
}

function formatMsgDate(date) {
  return format(date, 'dd/MM/yyyy h:mm a'); //'h:mm a'
}

export { formatChatListDate, formatMsgDate };

/*

chatListFormat
  const msgDate

  if isToday(msg)
    return hh:mm
  if isYesterday(msg)
    return yesterday
  if daysAgo(msg) <= 7
    return {day}

  return dd/mm/yyy


dateMarkerFormat()
stickyDateMarkerFormat()
  const msgDate

  if isToday(msg)
    return Today          //<< only difference!
  if isYesterday(msg)
    return yesterday
  if daysAgo(msg) <= 7
    return {day}

  return dd/mm/yyy



msgInfo
today at hh:mm,
yesterday at hh:mm,
05/09/2021 at hh:mm
*/
