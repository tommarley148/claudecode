export const siteConfig = {
  name: "Cricket Club Directory",
  description: "Find your perfect cricket club in England and Wales",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    ecb: "https://www.ecb.co.uk",
  },
  creator: {
    name: "ECB",
    url: "https://www.ecb.co.uk",
  },
}

export const appConfig = {
  // Search Configuration
  search: {
    defaultRadius: 10, // miles
    maxRadius: 50,
    resultsPerPage: 20,
  },

  // Club Configuration
  clubs: {
    maxImages: 10,
    maxVenues: 5,
    maxTeams: 20,
  },

  // Review Configuration
  reviews: {
    minRating: 1,
    maxRating: 5,
    requireModeration: true,
  },

  // Widget Configuration
  widgets: {
    maxWidgetsPerClub: 15,
    defaultWidgets: [
      'upcoming-events',
      'teams',
      'amenities',
      'maps',
      'reviews',
    ],
  },

  // Age Groups (standard ECB categories)
  ageGroups: [
    'U9',
    'U11',
    'U13',
    'U15',
    'U17',
    'U19',
    'Adult',
    'Senior (50+)',
    'All Ages',
  ],

  // Standard Amenities
  amenities: [
    'Parking',
    'Changing Rooms',
    'Clubhouse',
    'Cafe/Bar',
    'Practice Nets',
    'Indoor Facilities',
    'Wheelchair Access',
    'Equipment Storage',
    'Scoreboard',
    'Seating',
    'Toilets',
    'First Aid',
    'WiFi',
    'Floodlights',
  ],

  // Counties in England and Wales
  counties: [
    'Bedfordshire',
    'Berkshire',
    'Bristol',
    'Buckinghamshire',
    'Cambridgeshire',
    'Cheshire',
    'Cornwall',
    'Cumbria',
    'Derbyshire',
    'Devon',
    'Dorset',
    'Durham',
    'East Sussex',
    'Essex',
    'Gloucestershire',
    'Greater London',
    'Greater Manchester',
    'Hampshire',
    'Herefordshire',
    'Hertfordshire',
    'Isle of Wight',
    'Kent',
    'Lancashire',
    'Leicestershire',
    'Lincolnshire',
    'Merseyside',
    'Norfolk',
    'Northamptonshire',
    'Northumberland',
    'North Yorkshire',
    'Nottinghamshire',
    'Oxfordshire',
    'Rutland',
    'Shropshire',
    'Somerset',
    'South Yorkshire',
    'Staffordshire',
    'Suffolk',
    'Surrey',
    'Tyne and Wear',
    'Warwickshire',
    'West Midlands',
    'West Sussex',
    'West Yorkshire',
    'Wiltshire',
    'Worcestershire',
    // Wales
    'Anglesey',
    'Blaenau Gwent',
    'Bridgend',
    'Caerphilly',
    'Cardiff',
    'Carmarthenshire',
    'Ceredigion',
    'Conwy',
    'Denbighshire',
    'Flintshire',
    'Gwynedd',
    'Merthyr Tydfil',
    'Monmouthshire',
    'Neath Port Talbot',
    'Newport',
    'Pembrokeshire',
    'Powys',
    'Rhondda Cynon Taf',
    'Swansea',
    'Torfaen',
    'Vale of Glamorgan',
    'Wrexham',
  ].sort(),
}
