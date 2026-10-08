export interface EventItem {
  id: string;
  shortTitle: string;
  title: string;
  dateLabel: string;
  dayLabel: string;
  timeLabel: string;
  startsAt: string;
  endsAt: string;
  venueName: string;
  venueAddress: string;
  dressCode?: string;
  note?: string;
  mapsQuery: string;
}

export interface WeddingData {
  couple: {
    bride: string;
    brideShort: string;
    brideFull: string;
    groom: string;
    groomShort: string;
    groomFull: string;
    hashtag: string;
  };
  invite: {
    kicker: string;
    line: string;
  };
  event: {
    title: string;
    startsAt: string;
    endsAt: string;
    dateLabel: string;
    dayLabel: string;
    timeLabel: string;
    dressCode: string;
    note: string;
  };
  events: EventItem[];
  venue: {
    name: string;
    address: string;
    mapsQuery: string;
    url: string;
    lat: number;
    lng: number;
  };
  story: Array<{
    year: string;
    title: string;
    text: string;
    image: string;
  }>;
  blessing: {
    line: string;
    translation: string;
    source: string;
  };
  footer: {
    families: string;
    contacts: Array<{
      name: string;
      phone: string;
    }>;
  };
  meta: {
    title: string;
    description: string;
    url: string;
    image: string;
    siteName: string;
  };
}

export const weddingData: WeddingData = {
  couple: {
    bride: 'TASYA LUTHRA',
    brideShort: 'TASYA',
    brideFull: 'Tasya Luthra',
    groom: 'NAKUL LUTHRA',
    groomShort: 'NAKUL',
    groomFull: 'Nakul Luthra',
    hashtag: '#NakulWedsTasya',
  },
  invite: {
    kicker: 'Together with their families',
    line: 'cordially invite you to celebrate their wedding ceremonies',
  },
  event: {
    title: 'The Wedding of Nakul & Tasya',
    startsAt: '2026-12-02T19:00:00+05:30',
    endsAt: '2026-12-03T02:00:00+05:30',
    dateLabel: '02 . 12 . 2026',
    dayLabel: 'Wednesday',
    timeLabel: '7:00 in the evening',
    dressCode: 'Traditional / Royal Indian Formal',
    note: 'Sehra Bandi at 5:00 PM (A-56 Saraswati Vihar) followed by Barat & Wedding celebrations at 7:00 PM',
  },
  events: [
    {
      id: 'kirtan',
      shortTitle: 'Kirtan & Birthday',
      title: "Kirtan & Bhavika's 1st Birthday",
      dateLabel: '24 . 11 . 2026',
      dayLabel: 'Tuesday',
      timeLabel: '6:00 in the evening',
      startsAt: '2026-11-24T18:00:00+05:30',
      endsAt: '2026-11-24T22:00:00+05:30',
      venueName: 'Haryana Maitri Bhawan',
      venueAddress: 'Crossing of Rd Number 42 & 43, Pitampura, Delhi 110034',
      dressCode: 'Traditional / Festive Attire',
      note: 'Join us for devotional blessings and Bhavika’s 1st birthday celebrations',
      mapsQuery: 'Haryana Maitri Bhawan Pitampura Delhi 110034',
    },
    {
      id: 'sagan',
      shortTitle: 'Sagan',
      title: 'Sagan Ceremony',
      dateLabel: '28 . 11 . 2026',
      dayLabel: 'Saturday',
      timeLabel: '7:00 in the evening',
      startsAt: '2026-11-28T19:00:00+05:30',
      endsAt: '2026-11-28T23:30:00+05:30',
      venueName: 'Majestic Crown Banquet',
      venueAddress: '24, Najafgarh Rd, Block C, Najafgarh Road Industrial Area, New Delhi 110015',
      dressCode: 'Festive Indian / Indo-Western',
      note: 'Ring ceremony followed by celebratory dinner & music',
      mapsQuery: 'Majestic Crown Banquet Najafgarh Road New Delhi 110015',
    },
    {
      id: 'mehndi',
      shortTitle: 'Mehndi & Sufi',
      title: 'Mehndi Raat / Sufi Night',
      dateLabel: '30 . 11 . 2026',
      dayLabel: 'Monday',
      timeLabel: '7:00 in the evening',
      startsAt: '2026-11-30T19:00:00+05:30',
      endsAt: '2026-11-30T23:59:00+05:30',
      venueName: 'Sky Mansion by Tikka Junction',
      venueAddress: '3rd Floor, Landmark, Plot No 22 & 23, near Bawa Jewellers, opp. Metro Pillar 332, Tagore Market, Kirti Nagar, New Delhi 110015',
      dressCode: 'Ethnic Glam / Festive Shimmer',
      note: 'An enchanted evening of soul-stirring Sufi music, henna, and dinner',
      mapsQuery: 'Sky Mansion by Tikka Junction Kirti Nagar New Delhi 110015',
    },
    {
      id: 'haldi',
      shortTitle: 'Haldi',
      title: 'Haldi Ceremony',
      dateLabel: '01 . 12 . 2026',
      dayLabel: 'Tuesday',
      timeLabel: '12:00 in the afternoon',
      startsAt: '2026-12-01T12:00:00+05:30',
      endsAt: '2026-12-01T16:00:00+05:30',
      venueName: 'Luthra Residence',
      venueAddress: 'A-56, Saraswati Vihar, Pitampura, Delhi',
      dressCode: 'Shades of Yellow & Sunshine',
      note: 'A joyous morning filled with turmeric, flowers, laughter, and lunch',
      mapsQuery: 'A56 Saraswati Vihar Pitampura Delhi',
    },
    {
      id: 'wedding',
      shortTitle: 'The Wedding',
      title: 'The Wedding (Vivah)',
      dateLabel: '02 . 12 . 2026',
      dayLabel: 'Wednesday',
      timeLabel: 'Sehra Bandi: 5:00 PM • Barat: 7:00 PM',
      startsAt: '2026-12-02T17:00:00+05:30',
      endsAt: '2026-12-03T02:00:00+05:30',
      venueName: 'The Gracious Banquets',
      venueAddress: 'A-25, Block B, Naraina Industrial Area Phase 2, Naraina, Delhi 110028',
      dressCode: 'Royal Indian Traditional',
      note: 'Sehra Bandi at A-56 Saraswati Vihar (5 PM), followed by Barat meeting point & wedding at The Gracious Banquets (7 PM)',
      mapsQuery: 'The Gracious Banquets Naraina Industrial Area Phase 2 Delhi 110028',
    },
  ],
  venue: {
    name: 'The Gracious Banquets',
    address: 'A-25, Block B, Naraina Industrial Area Phase 2, Naraina, Delhi 110028',
    mapsQuery: 'The Gracious Banquets, A-25, Block B, Naraina Industrial Area Phase 2, Naraina, Delhi 110028',
    url: 'https://www.google.com/maps/search/?api=1&query=The+Gracious+Banquets+Naraina+Industrial+Area+Phase+2+Delhi+110028',
    lat: 28.6256,
    lng: 77.1378,
  },
  story: [
    {
      year: '2024',
      title: 'The First Spark',
      text: 'A serendipitous encounter, endless conversations, and the beautiful discovery of kindred spirits.',
      image: '/assets/tasya-nakul-moments.png',
    },
    {
      year: '2025',
      title: 'Growing Together',
      text: 'Sharing adventures, mutual laughter, and finding warmth and home in each other’s presence.',
      image: '/assets/tasya-nakul-night.png',
    },
    {
      year: '2026',
      title: 'The Eternal Bond',
      text: 'Surrounded by our families and loved ones, stepping hand-in-hand into our forever together.',
      image: '/assets/tasya-nakul-portrait.png',
    },
  ],
  blessing: {
    line: 'May your intentions be one, may your hearts beat as one.',
    translation: 'Two families, one thread of gold — and a lifetime of happiness made luminous together.',
    source: 'A blessing from both families',
  },
  footer: {
    families: 'With love & blessings from in loving remembrance of late Smt. Raj Luthra & late Shri Inderjeet Luthra and Smt. Dimple & Shri Nitin Luthra',
    contacts: [
      { name: 'Nakul Luthra', phone: '+919999343069' },
      { name: 'Nitin Luthra', phone: '+919582883992' },
    ],
  },
  meta: {
    title: 'Nakul & Tasya — Wedding Invitation',
    description: 'Nakul Luthra and Tasya Luthra cordially invite you to celebrate their wedding ceremonies in New Delhi.',
    url: 'https://nakul-tasya-wedding.vercel.app',
    image: '/assets/tasya-nakul-portrait.png',
    siteName: 'Nakul & Tasya Wedding',
  },
};

export const weddingConfig = weddingData;
