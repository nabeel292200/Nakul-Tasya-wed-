export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  dayLabel: string;
  timeLabel: string;
  venueName: string;
  venueAddress: string;
  dressCode?: string;
  note?: string;
  calendarStartsAt: string; // ISO string
  calendarEndsAt: string;   // ISO string
  mapsQuery?: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  text: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface FamilyMember {
  side: 'groom' | 'bride';
  title: string;
  names: string;
}

export interface WeddingConfig {
  couple: {
    groom: string;
    groomFull: string;
    bride: string;
    brideFull: string;
    hashtag: string;
    initials: string;
    portraitImage: string;
  };
  invitation: {
    kicker: string;
    openingLine: string;
    messageText: string;
  };
  mainDate: {
    dayOfWeek: string;
    dayNumber: string;
    month: string;
    year: string;
    formattedDate: string; // e.g. "21 . 11 . 2026"
    subtext: string;
    targetTimestamp: string; // ISO string for countdown e.g. "2026-11-21T11:30:00+05:30"
  };
  events: WeddingEvent[];
  primaryVenue: {
    title: string;
    name: string;
    address: string;
    cityState: string;
    mapPreviewImage: string;
    googleMapsUrl: string;
    directionsUrl: string;
    lat?: number;
    lng?: number;
  };
  loveStory: {
    heading: string;
    tagline: string;
    quote: string;
    quoteSource: string;
    milestones: StoryMilestone[];
  };
  gallery: {
    heading: string;
    subtitle: string;
    images: GalleryImage[];
  };
  blessings: {
    heading: string;
    sanskritLine: string;
    translation: string;
    source: string;
    families: FamilyMember[];
  };
  rsvp: {
    heading: string;
    subheading: string;
    deadlineText?: string;
  };
  closing: {
    monogram: string;
    dateText: string;
    message: string;
    familiesNote: string;
    contacts: Array<{ name: string; phone: string }>;
  };
  music: {
    audioSrc: string;
    title: string;
    artist: string;
    autoPlayPrompt: boolean;
  };
}
