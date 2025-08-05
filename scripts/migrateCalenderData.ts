import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPv-VACF8qWb4sCLHLHDX95xtvMNVhvo0",
  authDomain: "f1-guide-c0eed.firebaseapp.com",
  projectId: "f1-guide-c0eed",
  storageBucket: "f1-guide-c0eed.appspot.com",
  messagingSenderId: "1041900201657",
  appId: "1:1041900201657:web:ad9bdb5ae89507ba99dd68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Race {
  round: number;
  raceName: string;
  circuit: string;
  location: string;
  country: string;
  date: string;
  time: string;
  trackImage: string;
  realLifeImage: string;
  status: string;
  circuitLength: string;
  laps: number;
  raceDistance: string;
  lapRecord: {
    driver: string;
    time: string;
    year: string;
  };
  firstGrandPrix: string;
  sessions: {
    name: string;
    date: string;
    time: string;
    completed: boolean;
  }[];
  results: {
    position: number;
    driver: string;
    team: string;
    time: string;
    points: number;
    laps: number;
  }[];
}

const manualRaceCalendar: Race[] = [
  //
  // Round 1 – Australian GP — Albert Park, Melbourne
  {
    round: 1,
    raceName: 'Australian Grand Prix',
    circuit: 'Albert Park Circuit',
    location: 'Melbourne, Australia',
    country: 'Australia',
    date: '2025-03-16',
    time: '15:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://motorsporttickets.com/blog/wp-content/uploads/2024/08/1020080097-LAT-20240323-GP2403_170112_FC17049.jpg',
    status: 'completed',
    circuitLength: '5.278 km',
    laps: 58,
    raceDistance: '306.124 km',
    lapRecord: {
      driver: 'Charles Leclerc',
      time: '1:19.813',
      year: '2024'
    },
    firstGrandPrix: '1996',
    sessions: [
      { name: 'Practice 1', date: '2025-03-14', time: '12:30', completed: true },
      { name: 'Practice 2', date: '2025-03-14', time: '16:00', completed: true },
      { name: 'Practice 3', date: '2025-03-15', time: '12:30', completed: true },
      { name: 'Qualifying', date: '2025-03-15', time: '16:00', completed: true },
      { name: 'Race', date: '2025-03-16', time: '15:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Lando Norris', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'George Russell', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 2 – Chinese GP (Sprint weekend)
  {
    round: 2,
    raceName: 'Chinese Grand Prix',
    circuit: 'Shanghai International Circuit',
    location: 'Shanghai, China',
    country: 'China',
    date: '2025-03-23',
    time: '15:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/China_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://media.formula1.com/image/upload/t_16by9South/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/China/GettyImages-2147970664.webp',
    status: 'completed',
    circuitLength: '5.451 km',
    laps: 56,
    raceDistance: '305.066 km',
    lapRecord: {
      driver: 'Michael Schumacher',
      time: '1:32.238',
      year: '2004'
    },
    firstGrandPrix: '2004',
    sessions: [
      { name: 'Practice 1', date: '2025-03-21', time: '11:30', completed: true },
      { name: 'Sprint Qualifying', date: '2025-03-21', time: '15:30', completed: true },
      { name: 'Sprint Race', date: '2025-03-22', time: '11:00', completed: true },
      { name: 'Qualifying', date: '2025-03-22', time: '15:00', completed: true },
      { name: 'Race', date: '2025-03-23', time: '15:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Oscar Piastri', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Lando Norris', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'George Russell', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 3 – Japanese GP
  {
    round: 3,
    raceName: 'Japanese Grand Prix',
    circuit: 'Suzuka International Racing Course',
    location: 'Suzuka, Japan',
    country: 'Japan',
    date: '2025-04-06',
    time: '14:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Japan_Circuit.png.transform/8col-retina/image.png',
     realLifeImage: 'https://media.formula1.com/image/upload/t_16by9South/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2024/F1_Grand_Prix_of_Japan/2147405986.webp',
    status: 'completed',
    circuitLength: '5.807 km',
    laps: 53,
    raceDistance: '307.471 km',
    lapRecord: {
      driver: 'Lewis Hamilton',
      time: '1:30.983',
      year: '2019'
    },
    firstGrandPrix: '1987',
    sessions: [
      { name: 'Practice 1', date: '2025-04-04', time: '11:30', completed: true },
      { name: 'Practice 2', date: '2025-04-04', time: '15:00', completed: true },
      { name: 'Practice 3', date: '2025-04-05', time: '11:30', completed: true },
      { name: 'Qualifying', date: '2025-04-05', time: '15:00', completed: true },
      { name: 'Race', date: '2025-04-06', time: '14:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Max Verstappen', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Lando Norris', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Oscar Piastri', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 4 – Bahrain GP
  {
    round: 4,
    raceName: 'Bahrain Grand Prix',
    circuit: 'Bahrain International Circuit',
    location: 'Sakhir, Bahrain',
    country: 'Bahrain',
    date: '2025-04-13',
    time: '18:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://autogear.pt/wp-content/uploads/2025/02/Bahrain-Grand-Prix-1000x570.jpg',
    status: 'completed',
    circuitLength: '5.412 km',
    laps: 57,
    raceDistance: '308.238 km',
    lapRecord: {
      driver: 'Pedro de la Rosa',
      time: '1:31.447',
      year: '2005'
    },
    firstGrandPrix: '2004',
    sessions: [
      { name: 'Practice 1', date: '2025-04-11', time: '14:30', completed: true },
      { name: 'Practice 2', date: '2025-04-11', time: '18:00', completed: true },
      { name: 'Practice 3', date: '2025-04-12', time: '15:30', completed: true },
      { name: 'Qualifying', date: '2025-04-12', time: '19:00', completed: true },
      { name: 'Race', date: '2025-04-13', time: '18:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Oscar Piastri', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'George Russell', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Lando Norris', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 5 – Saudi Arabian GP
  {
    round: 5,
    raceName: 'Saudi Arabian Grand Prix',
    circuit: 'Jeddah Corniche Circuit',
    location: 'Jeddah, Saudi Arabia',
    country: 'Saudi Arabia',
    date: '2025-04-20',
    time: '20:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Saudi_Arabia_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://www.total-motorsport.com/wp-content/uploads/2023/03/SI202303170966-1024x683.jpg',
    status: 'completed',
    circuitLength: '6.174 km',
    laps: 50,
    raceDistance: '308.450 km',
    lapRecord: {
      driver: 'Lewis Hamilton',
      time: '1:30.734',
      year: '2021'
    },
    firstGrandPrix: '2021',
    sessions: [
      { name: 'Practice 1', date: '2025-04-18', time: '16:30', completed: true },
      { name: 'Practice 2', date: '2025-04-18', time: '20:00', completed: true },
      { name: 'Practice 3', date: '2025-04-19', time: '16:30', completed: true },
      { name: 'Qualifying', date: '2025-04-19', time: '20:00', completed: true },
      { name: 'Race', date: '2025-04-20', time: '20:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Oscar Piastri', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Charles Leclerc', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 6 – Miami GP (Sprint weekend)
  {
    round: 6,
    raceName: 'Miami Grand Prix',
    circuit: 'Miami International Autodrome',
    location: 'Miami, USA',
    country: 'USA',
    date: '2025-05-04',
    time: '16:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Miami_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://hips.hearstapps.com/hmg-prod/images/general-view-of-the-race-action-during-the-f1-grand-prix-of-news-photo-1746211243.pjpeg?crop=1.00xw:0.918xh;0,0.0357xh&resize=980:*',
    status: 'completed',
    circuitLength: '5.412 km',
    laps: 57,
    raceDistance: '308.326 km',
    lapRecord: {
      driver: 'Max Verstappen',
      time: '1:29.708',
      year: '2023'
    },
    firstGrandPrix: '2022',
    sessions: [
      { name: 'Practice 1', date: '2025-05-02', time: '12:30', completed: true },
      { name: 'Sprint Qualifying', date: '2025-05-02', time: '16:30', completed: true },
      { name: 'Sprint Race', date: '2025-05-03', time: '12:00', completed: true },
      { name: 'Qualifying', date: '2025-05-03', time: '16:00', completed: true },
      { name: 'Race', date: '2025-05-04', time: '16:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Oscar Piastri', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Lando Norris', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'George Russell', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 7 – Emilia Romagna GP
  {
    round: 7,
    raceName: 'Emilia Romagna Grand Prix',
    circuit: 'Imola Circuit',
    location: 'Imola, Italy',
    country: 'Italy',
    date: '2025-05-18',
    time: '15:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Emilia_Romagna_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://www.total-motorsport.com/wp-content/uploads/2024/05/240030-scuderia-ferrari-emilia-romagna-gp-friday_d6c2c9c8-49fd-4873-8fa2-7024e7781b2a-2048x1366.jpg',
    status: 'completed',
    circuitLength: '4.909 km',
    laps: 63,
    raceDistance: '309.049 km',
    lapRecord: {
      driver: 'Lewis Hamilton',
      time: '1:15.484',
      year: '2020'
    },
    firstGrandPrix: '1980',
    sessions: [
      { name: 'Practice 1', date: '2025-05-16', time: '13:30', completed: true },
      { name: 'Practice 2', date: '2025-05-16', time: '17:00', completed: true },
      { name: 'Practice 3', date: '2025-05-17', time: '12:30', completed: true },
      { name: 'Qualifying', date: '2025-05-17', time: '16:00', completed: true },
      { name: 'Race', date: '2025-05-18', time: '15:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Max Verstappen', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Lando Norris', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Oscar Piastri', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 8 – Monaco GP
  {
    round: 8,
    raceName: 'Monaco Grand Prix',
    circuit: 'Circuit de Monaco',
    location: 'Monte Carlo, Monaco',
    country: 'Monaco',
    date: '2025-05-25',
    time: '15:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monaco_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://blog.savills.com/_images/monaco-grand-prix---linity-media.jpg',
    status: 'completed',
    circuitLength: '3.337 km',
    laps: 78,
    raceDistance: '260.286 km',
    lapRecord: {
      driver: 'Lewis Hamilton',
      time: '1:12.909',
      year: '2021'
    },
    firstGrandPrix: '1950',
    sessions: [
      { name: 'Practice 1', date: '2025-05-23', time: '13:30', completed: true },
      { name: 'Practice 2', date: '2025-05-23', time: '17:00', completed: true },
      { name: 'Practice 3', date: '2025-05-24', time: '12:30', completed: true },
      { name: 'Qualifying', date: '2025-05-24', time: '16:00', completed: true },
      { name: 'Race', date: '2025-05-25', time: '15:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Lando Norris', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Charles Leclerc', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Oscar Piastri', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 9 – Spanish GP
  {
    round: 9,
    raceName: 'Spanish Grand Prix',
    circuit: 'Circuit de Barcelona‑Catalunya',
    location: 'Barcelona, Spain',
    country: 'Spain',
    date: '2025-06-01',
    time: '15:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Spain_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://www.grandprix247.com/wp-content/uploads/2019/05/D6NRJWnXsAAdjTW.jpg',
    status: 'completed',
    circuitLength: '4.675 km',
    laps: 66,
    raceDistance: '308.424 km',
    lapRecord: {
      driver: 'Max Verstappen',
      time: '1:16.330',
      year: '2023'
    },
    firstGrandPrix: '1991',
    sessions: [
      { name: 'Practice 1', date: '2025-05-30', time: '13:30', completed: true },
      { name: 'Practice 2', date: '2025-05-30', time: '17:00', completed: true },
      { name: 'Practice 3', date: '2025-05-31', time: '12:30', completed: true },
      { name: 'Qualifying', date: '2025-05-31', time: '16:00', completed: true },
      { name: 'Race', date: '2025-06-01', time: '15:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Oscar Piastri', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Lando Norris', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Charles Leclerc', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 10 – Canadian GP
  {
    round: 10,
    raceName: 'Canadian Grand Prix',
    circuit: 'Circuit Gilles Villeneuve',
    location: 'Montreal, Canada',
    country: 'Canada',
    date: '2025-06-15',
    time: '14:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Canada_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/c72f/live/6e13bc70-3f0c-11f0-8acc-376867527657.jpg.webp',
    status: 'completed',
    circuitLength: '4.361 km',
    laps: 70,
    raceDistance: '305.270 km',
    lapRecord: {
      driver: 'Valtteri Bottas',
      time: '1:13.078',
      year: '2019'
    },
    firstGrandPrix: '1967',
    sessions: [
      { name: 'Practice 1', date: '2025-06-13', time: '13:30', completed: true },
      { name: 'Practice 2', date: '2025-06-13', time: '17:00', completed: true },
      { name: 'Practice 3', date: '2025-06-14', time: '12:30', completed: true },
      { name: 'Qualifying', date: '2025-06-14', time: '16:00', completed: true },
      { name: 'Race', date: '2025-06-15', time: '14:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'George Russell', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Andrea Kimi Antonelli', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 11 – Austrian GP
  {
    round: 11,
    raceName: 'Austrian Grand Prix',
    circuit: 'Red Bull Ring',
    location: 'Spielberg, Austria',
    country: 'Austria',
    date: '2025-06-29',
    time: '15:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Austria_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://grandprixexperience.com/wp-content/uploads/2022/07/Red-Bull-Ring.jpg',
    status: 'completed',
    circuitLength: '4.318 km',
    laps: 71,
    raceDistance: '306.452 km',
    lapRecord: {
      driver: 'Carlos Sainz',
      time: '1:05.619',
      year: '2020'
    },
    firstGrandPrix: '1970',
    sessions: [
      { name: 'Practice 1', date: '2025-06-27', time: '13:30', completed: true },
      { name: 'Practice 2', date: '2025-06-27', time: '17:00', completed: true },
      { name: 'Practice 3', date: '2025-06-28', time: '12:30', completed: true },
      { name: 'Qualifying', date: '2025-06-28', time: '16:00', completed: true },
      { name: 'Race', date: '2025-06-29', time: '15:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Lando Norris', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Oscar Piastri', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Charles Leclerc', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 12 – British GP
  {
    round: 12,
    raceName: 'British Grand Prix',
    circuit: 'Silverstone Circuit',
    location: 'Silverstone, UK',
    country: 'UK',
    date: '2025-07-06',
    time: '15:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2022-07/Silverstone.jpg.webp?itok=S2iDYCLV',
    status: 'completed',
    circuitLength: '5.891 km',
    laps: 52,
    raceDistance: '306.198 km',
    lapRecord: {
      driver: 'Max Verstappen',
      time: '1:27.097',
      year: '2020'
    },
    firstGrandPrix: '1950',
    sessions: [
      { name: 'Practice 1', date: '2025-07-04', time: '12:30', completed: true },
      { name: 'Practice 2', date: '2025-07-04', time: '16:00', completed: true },
      { name: 'Practice 3', date: '2025-07-05', time: '11:30', completed: true },
      { name: 'Qualifying', date: '2025-07-05', time: '15:00', completed: true },
      { name: 'Race', date: '2025-07-06', time: '15:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Lando Norris', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Oscar Piastri', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Nico Hulkenberg', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Round 13 – Belgian GP (Sprint weekend)
  {
    round: 13,
    raceName: 'Belgian Grand Prix',
    circuit: 'Circuit de Spa‑Francorchamps',
    location: 'Stavelot, Belgium',
    country: 'Belgium',
    date: '2025-07-27',
    time: '15:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Belgium_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Belgium.webp',
    status: 'completed',
    circuitLength: '7.004 km',
    laps: 44,
    raceDistance: '308.052 km',
    lapRecord: {
      driver: 'Valtteri Bottas',
      time: '1:46.286',
      year: '2018'
    },
    firstGrandPrix: '1950',
    sessions: [
      { name: 'Practice 1', date: '2025-07-25', time: '12:30', completed: true },
      { name: 'Sprint Qualifying', date: '2025-07-25', time: '16:30', completed: true },
      { name: 'Sprint Race', date: '2025-07-26', time: '12:00', completed: true },
      { name: 'Qualifying', date: '2025-07-26', time: '16:00', completed: true },
      { name: 'Race', date: '2025-07-27', time: '15:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Oscar Piastri', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Lando Norris', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'Charles Leclerc', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
    // race results not yet processed here
  },

  //
  // Round 14 – Hungarian GP (today – results pending)
  {
    round: 14,
    raceName: 'Hungarian Grand Prix',
    circuit: 'Hungaroring',
    location: 'Budapest, Hungary',
    country: 'Hungary',
    date: '2025-08-03',
    time: '15:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Hungary_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/b732/live/08d9b080-6b08-11f0-b68b-71e63fac86aa.jpg.webp',
    status: 'completed',
    circuitLength: '4.381 km',
    laps: 70,
    raceDistance: '306.630 km',
    lapRecord: {
      driver: 'Lewis Hamilton',
      time: '1:16.627',
      year: '2020'
    },
    firstGrandPrix: '1986',
    sessions: [
      { name: 'Practice 1', date: '2025-08-01', time: '13:30', completed: true },
      { name: 'Practice 2', date: '2025-08-01', time: '17:00', completed: true },
      { name: 'Practice 3', date: '2025-08-02', time: '12:30', completed: true },
      { name: 'Qualifying', date: '2025-08-02', time: '16:00', completed: true },
      { name: 'Race', date: '2025-08-03', time: '15:00', completed: true }
    ],
    results: [
      { position: 1, driver: 'Lando Norris', team: 'McLaren', time: '1:42:06.304', points: 25, laps: 58 },
      { position: 2, driver: 'Oscar Piastri', team: 'Red Bull Racing', time: '+0.895', points: 18, laps: 58 },
      { position: 3, driver: 'George Russell', team: 'Mercedes', time: '+8.481', points: 15, laps: 58 }
    ]
  },

  // Rounds 15–24: upcoming races (sessions/results empty)
  {
    round: 15,
    raceName: 'Dutch Grand Prix',
    circuit: 'Circuit Zandvoort',
    location: 'Zandvoort, Netherlands',
    country: 'Netherlands',
    date: '2025-08-31',
    time: '13:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Netherlands_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://stacksfs.com/wp-content/uploads/2024/08/race-winner-max-verstappen-red.jpg',
    status: 'upcoming',
    circuitLength: '4.259 km',
    laps: 72,
    raceDistance: '306.648 km',
    lapRecord: {
      driver: 'Lewis Hamilton',
      time: '1:11.097',
      year: '2021'
    },
    firstGrandPrix: '1952',
    sessions: [
      { name: 'Practice 1', date: '2025-08-29', time: '10:30', completed: false },
      { name: 'Practice 2', date: '2025-08-29', time: '14:00', completed: false },
      { name: 'Practice 3', date: '2025-08-30', time: '09:30', completed: false },
      { name: 'Qualifying', date: '2025-08-30', time: '13:00', completed: false },
      { name: 'Race', date: '2025-08-31', time: '13:00', completed: false }
    ],
    results: []
  },
  {
    round: 16,
    raceName: 'Italian Grand Prix',
    circuit: 'Monza Circuit',
    location: 'Monza, Italy',
    country: 'Italy',
    date: '2025-09-07',
    time: '13:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://raceexperiences.com/wp-content/uploads/2023/02/IMG_20210912_144548_801_2-min-1024x576.jpg',
    status: 'upcoming',
    circuitLength: '5.793 km',
    laps: 53,
    raceDistance: '306.720 km',
    lapRecord: {
      driver: 'Rubens Barrichello',
      time: '1:21.046',
      year: '2004'
    },
    firstGrandPrix: '1950',
    sessions: [
      { name: 'Practice 1', date: '2025-09-05', time: '11:30', completed: false },
      { name: 'Practice 2', date: '2025-09-05', time: '15:00', completed: false },
      { name: 'Practice 3', date: '2025-09-06', time: '10:30', completed: false },
      { name: 'Qualifying', date: '2025-09-06', time: '14:00', completed: false },
      { name: 'Race', date: '2025-09-07', time: '13:00', completed: false }
    ],
    results: []
  },
  {
    round: 17,
    raceName: 'Azerbaijan Grand Prix',
    circuit: 'Baku City Circuit',
    location: 'Baku, Azerbaijan',
    country: 'Azerbaijan',
    date: '2025-09-21',
    time: '11:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Azerbaijan_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://www.idman.biz/media/2025/04/22/1920x1280/74251.jpg?v=1745306073',
    status: 'upcoming',
    circuitLength: '6.003 km',
    laps: 51,
    raceDistance: '306.049 km',
    lapRecord: {
      driver: 'Charles Leclerc',
      time: '1:43.009',
      year: '2019'
    },
    firstGrandPrix: '2017',
    sessions: [
      { name: 'Practice 1', date: '2025-09-19', time: '08:30', completed: false },
      { name: 'Practice 2', date: '2025-09-19', time: '12:00', completed: false },
      { name: 'Practice 3', date: '2025-09-20', time: '08:30', completed: false },
      { name: 'Qualifying', date: '2025-09-20', time: '12:00', completed: false },
      { name: 'Race', date: '2025-09-21', time: '11:00', completed: false }
    ],
    results: []
  },
  {
    round: 18,
    raceName: 'Singapore Grand Prix',
    circuit: 'Marina Bay Street Circuit',
    location: 'Singapore',
    country: 'Singapore',
    date: '2025-10-05',
    time: '05:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Singapore_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://motorsporttickets.com/blog/wp-content/uploads/2021/04/hide-ishi-FD61TgTehqQ-unsplash.jpg',
    status: 'upcoming',
    circuitLength: '4.940 km',
    laps: 62,
    raceDistance: '306.143 km',
    lapRecord: {
      driver: 'Lewis Hamilton',
      time: '1:41.905',
      year: '2023'
    },
    firstGrandPrix: '2008',
    sessions: [
      { name: 'Practice 1', date: '2025-10-03', time: '02:30', completed: false },
      { name: 'Practice 2', date: '2025-10-03', time: '06:00', completed: false },
      { name: 'Practice 3', date: '2025-10-04', time: '02:30', completed: false },
      { name: 'Qualifying', date: '2025-10-04', time: '06:00', completed: false },
      { name: 'Race', date: '2025-10-05', time: '05:00', completed: false }
    ],
    results: []
  },
  {
    round: 19,
    raceName: 'United States Grand Prix',
    circuit: 'Circuit of the Americas',
    location: 'Austin, USA',
    country: 'USA',
    date: '2025-10-19',
    time: '12:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/USA_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/2024/United%20States%20(Austin)/austin-f1-2023-aerial.webp',
    status: 'upcoming',
    circuitLength: '5.513 km',
    laps: 56,
    raceDistance: '308.405 km',
    lapRecord: {
      driver: 'Charles Leclerc',
      time: '1:36.169',
      year: '2019'
    },
    firstGrandPrix: '2012',
    sessions: [
      { name: 'Practice 1', date: '2025-10-17', time: '10:30', completed: false },
      { name: 'Sprint Qualifying', date: '2025-10-17', time: '14:30', completed: false },
      { name: 'Sprint Race', date: '2025-10-18', time: '10:00', completed: false },
      { name: 'Qualifying', date: '2025-10-18', time: '14:00', completed: false },
      { name: 'Race', date: '2025-10-19', time: '12:00', completed: false }
    ],
    results: []
  },
  {
    round: 20,
    raceName: 'Mexico City Grand Prix',
    circuit: 'Autódromo Hermanos Rodríguez',
    location: 'Mexico City, Mexico',
    country: 'Mexico',
    date: '2025-10-26',
    time: '13:30',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Mexico_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://cdn.williamsf1.tech/images/fnx611yr/production/5b45e32be2b1f6c00cdeff1782f25df7fa922058-5181x2914.jpg?w=1200&auto=format',
    status: 'upcoming',
    circuitLength: '4.304 km',
    laps: 71,
    raceDistance: '305.354 km',
    lapRecord: {
      driver: 'Valtteri Bottas',
      time: '1:18.741',
      year: '2021'
    },
    firstGrandPrix: '1963',
    sessions: [
      { name: 'Practice 1', date: '2025-10-24', time: '14:30', completed: false },
      { name: 'Practice 2', date: '2025-10-24', time: '18:00', completed: false },
      { name: 'Practice 3', date: '2025-10-25', time: '13:30', completed: false },
      { name: 'Qualifying', date: '2025-10-25', time: '17:00', completed: false },
      { name: 'Race', date: '2025-10-26', time: '13:30', completed: false }
    ],
    results: []
  },
  {
    round: 21,
    raceName: 'São Paulo Grand Prix',
    circuit: 'Interlagos Circuit',
    location: 'São Paulo, Brazil',
    country: 'Brazil',
    date: '2025-11-09',
    time: '14:00',
    trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.png.transform/8col-retina/image.png',
     realLifeImage: 'https://gpticketstore.vshcdn.net/uploads/images/6055/brazil-f1-tickets-weather.png',
    status: 'upcoming',
    circuitLength: '4.309 km',
    laps: 71,
    raceDistance: '305.909 km',
    lapRecord: {
      driver: 'Valtteri Bottas',
      time: '1:10.540',
      year: '2018'
    },
    firstGrandPrix: '1973',
    sessions: [
      { name: 'Practice 1', date: '2025-11-07', time: '06:30', completed: false },
      { name: 'Sprint Qualifying', date: '2025-11-07', time: '10:30', completed: false },
      { name: 'Sprint Race', date: '2025-11-08', time: '06:00', completed: false },
      { name: 'Qualifying', date: '2025-11-08', time: '10:00', completed: false },
      { name: 'Race', date: '2025-11-09', time: '14:00', completed: false }
    ],
    results: []
  },
  {
    round: 22,
    raceName: 'Las Vegas Grand Prix',
    circuit: 'Las Vegas Strip Circuit',
    location: 'Las Vegas, USA',
    country: 'USA',
    date: '2025-11-22',
    time: '20:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Las_Vegas_Circuit.png.transform/8col-retina/image.png',
     realLifeImage: 'https://motorsporttickets.com/blog/wp-content/uploads/2024/03/Verstappen-at-Las-vegas-GP.png',
    status: 'upcoming',
    circuitLength: '6.201 km',
    laps: 50,
    raceDistance: '310.050 km',
    lapRecord: {
      driver: 'Oscar Piastri',
      time: '1:35.490',
      year: '2023'
    },
    firstGrandPrix: '2023',
    sessions: [
      { name: 'Practice 1', date: '2025-11-20', time: '16:30', completed: false },
      { name: 'Practice 2', date: '2025-11-20', time: '20:00', completed: false },
      { name: 'Practice 3', date: '2025-11-21', time: '16:30', completed: false },
      { name: 'Qualifying', date: '2025-11-21', time: '20:00', completed: false },
      { name: 'Race', date: '2025-11-22', time: '20:00', completed: false }
    ],
    results: []
  },
  {
    round: 23,
    raceName: 'Qatar Grand Prix',
    circuit: 'Lusail International Circuit',
    location: 'Lusail, Qatar',
    country: 'Qatar',
    date: '2025-11-30',
    time: '8:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Qatar_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://ct-group.com/me/wp-content/uploads/sites/17/2024/02/Qatar-Grand-Prix-scaled.jpg',
    status: 'upcoming',
    circuitLength: '5.380 km',
    laps: 57,
    raceDistance: '306.660 km',
    lapRecord: {
      driver: 'Max Verstappen',
      time: '1:24.319',
      year: '2023'
    },
    firstGrandPrix: '2021',
    sessions: [
      { name: 'Practice 1', date: '2025-11-28', time: '05:30', completed: false },
      { name: 'Sprint Qualifying', date: '2025-11-28', time: '09:30', completed: false },
      { name: 'Sprint Race', date: '2025-11-29', time: '06:00', completed: false },
      { name: 'Qualifying', date: '2025-11-29', time: '10:00', completed: false },
      { name: 'Race', date: '2025-11-30', time: '08:00', completed: false }
    ],
    results: []
  },
  {
    round: 24,
    raceName: 'Abu Dhabi Grand Prix',
    circuit: 'Yas Marina Circuit',
    location: 'Abu Dhabi, UAE',
    country: 'UAE',
    date: '2025-12-07',
    time: '13:00',
     trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit.png.transform/8col-retina/image.png',
    realLifeImage: 'https://beaumondetraveler.com/wp-content/uploads/2021/01/image-3-829x423.jpg',
    status: 'upcoming',
    circuitLength: '5.281 km',
    laps: 58,
    raceDistance: '306.183 km',
    lapRecord: {
      driver: 'Max Verstappen',
      time: '1:26.993',
      year: '2021'
    },
    firstGrandPrix: '2009',
    sessions: [
      { name: 'Practice 1', date: '2025-12-05', time: '09:30', completed: false },
      { name: 'Practice 2', date: '2025-12-05', time: '13:00', completed: false },
      { name: 'Practice 3', date: '2025-12-06', time: '10:30', completed: false },
      { name: 'Qualifying', date: '2025-12-06', time: '14:00', completed: false },
      { name: 'Race', date: '2025-12-07', time: '13:00', completed: false }
    ],
    results: []
  }
];

const migrateData = async () => {
  try {
    for (const race of manualRaceCalendar) {
      // Create a document ID from the race round
      const docId = `race_${race.round}`;
      await setDoc(doc(db, "calendar", docId), race);
      console.log(`Migrated race: Round ${race.round} - ${race.raceName}`);
    }
    console.log("Calendar migration complete!");
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

migrateData();