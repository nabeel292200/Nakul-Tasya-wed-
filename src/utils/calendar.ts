import { WeddingEvent } from '@/types/wedding';

function formatIsoForGoogleCalendar(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function generateGoogleCalendarUrl(
  event: WeddingEvent,
  coupleTitle: string
): string {
  const start = formatIsoForGoogleCalendar(event.calendarStartsAt);
  const end = formatIsoForGoogleCalendar(event.calendarEndsAt);
  const title = `${event.name}: ${coupleTitle}`;
  const details = `${event.name} of ${coupleTitle}\n\nVenue: ${event.venueName}, ${event.venueAddress}\nTime: ${event.dayLabel}, ${event.timeLabel}\nDress Code: ${event.dressCode || 'Traditional Indian'}\nNote: ${event.note || ''}`;
  const location = `${event.venueName}, ${event.venueAddress}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: details,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
