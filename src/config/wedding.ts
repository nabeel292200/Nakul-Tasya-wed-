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
  mapsUrl?: string;
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
    monogram?: string;
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
    imagePosition?: string;
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
    monogram: 'NATA',
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
      shortTitle: 'Kirtan',
      title: 'Kirtan',
      dateLabel: '24 . 11 . 2026',
      dayLabel: 'Tuesday',
      timeLabel: '6:00 in the evening',
      startsAt: '2026-11-24T18:00:00+05:30',
      endsAt: '2026-11-24T22:00:00+05:30',
      venueName: 'Haryana Maitri Bhawan',
      venueAddress: 'Crossing of Rd Number 42 & 43, Pitampura, Delhi 110034',
      dressCode: 'Traditional / Festive Attire',
      note: 'Join us for devotional blessings',
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
      dressCode: 'Modern Evening Wear',
      note: 'Celebratory dinner & music',
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
      mapsQuery: '28.6967545,77.1195526',
      mapsUrl:
        "https://www.google.com/maps/place/28%C2%B041'48.3%22N+77%C2%B007'10.4%22E/@28.6967545,77.1169777,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.6967545!4d77.1195526?hl=en&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
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
      image: '/assets/tasya-nakul-holding-hands.png',
      imagePosition: 'center center',
    },
    {
      year: '2025',
      title: 'Growing Together',
      text: 'Sharing adventures, mutual laughter, and finding warmth and home in each other’s presence.',
      image: '/assets/tasya-nakul-night.png',
      imagePosition: 'center 15%',
    },
    {
      year: '2026',
      title: 'The Eternal Bond',
      text: 'Surrounded by our families and loved ones, stepping hand-in-hand into our forever together.',
      image: '/assets/tasya-nakul-portrait.png',
      imagePosition: 'center 18%',
    },
  ],
  blessing: {
    line: 'May your intentions be one, may your hearts beat as one.',
    translation: 'Two families, one thread of gold — and a lifetime of happiness made luminous together.',
    source: 'A blessing from both families',
  },
  footer: {
    families: 'With love & blessings from in loving remembrance of late Smt. Raj Luthra & late Shri Inderjeet Luthra',
    contacts: [
      { name: 'Pranav Luthra', phone: '+919582883992' },
      { name: 'Nakul Luthra', phone: '+919999343069' },
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
