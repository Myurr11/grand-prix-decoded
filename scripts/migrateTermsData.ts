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

const termsData = [
  // Paste all your terms data here (the same array from your Terms component)
  {
      term: 'Pole Position',
      definition: 'The first starting position on the grid, earned by setting the fastest qualifying time in Q3',
      category: 'Racing Basics',
      icon: "Flag"
    },
    {
      term: 'Grid',
      definition: 'The starting formation for a race, arranged by qualifying times with fastest on pole position',
      category: 'Racing Basics',
      icon: "Target"    
    },
    {
      term: 'Formation Lap',
      definition: 'A slow lap before the race start where drivers warm up their tires and brakes',
      category: 'Racing Basics',
      icon: "Flag"    
    },
    {
      term: 'DNF',
      definition: 'Did Not Finish - When a driver fails to complete the race due to mechanical failure or crash',
      category: 'Racing Basics',
      icon: "AlertTriangle"
    },
    {
      term: 'DNS',
      definition: 'Did Not Start - When a driver is unable to take part in the race',
      category: 'Racing Basics',
      icon: "AlertTriangle"
    },
    {
      term: 'Lights Out',
      definition: 'The signal for the start of the race when all five red lights go out.',
      category: 'Racing Basics',
      icon: "Flag"
    },
    {
      term: 'Backmarker',
      definition: 'A slower car being lapped by the race leaders.',
      category: 'Racing Basics',
      icon: "AlertTriangle"
    },

    // Strategy & Pit Stops
    {
      term: 'Undercut',
      definition: 'Pit stop strategy where a driver stops earlier than rivals to gain track position with fresher tires',
      category: 'Strategy',
      icon: "Timer"
    },
    {
      term: 'Overcut',
      definition: 'Strategy of staying out longer than rivals to gain track position when they pit',
      category: 'Strategy',
      icon: "Clock"
    },
    {
      term: 'Box Box',
      definition: 'Radio call instructing driver to enter the pit lane for a pit stop',
      category: 'Strategy',
      icon: "Radio" 
    },
    {
      term: 'Pit Window',
      definition: 'The optimal time period during a race to make a pit stop for maximum strategic advantage',
      category: 'Strategy',
      icon: "Timer"
    },
    {
      term: 'Tyre Degradation',
      definition: 'The gradual loss of tire performance over time due to wear and temperature',
      category: 'Strategy',
      icon: "Gauge"
    },
    {
      term: 'Two-Stop Strategy',
      definition: 'Race strategy where a driver makes two pit stops, usually to manage tire degradation.',
      category: 'Strategy',
      icon: "Timer"
    },

    // Technology & Car Components
    {
      term: 'DRS',
      definition: 'Drag Reduction System - Moveable rear wing element that reduces drag on straights to aid overtaking',
      category: 'Technology',
      icon: "Wind"
    },
    {
      term: 'ERS',
      definition: 'Energy Recovery System - Hybrid technology that recovers and deploys energy for extra 160hp',
      category: 'Technology',
      icon: "Zap"
    },
    {
      term: 'MGU-K',
      definition: 'Motor Generator Unit-Kinetic - Recovers energy from braking and deploys it for acceleration',
      category: 'Technology',
      icon: "Zap"
    },
    {
      term: 'MGU-H',
      definition: 'Motor Generator Unit-Heat - Recovers energy from exhaust gases via the turbocharger',
      category: 'Technology',
      icon: "Fuel"
    },
    {
      term: 'Telemetry',
      definition: 'Real-time data transmission from the car to the pit wall about performance and systems',
      category: 'Technology',
      icon: "Radio"
    },

    // Aerodynamics
    {
      term: 'Dirty Air',
      definition: 'Turbulent air behind another car that reduces aerodynamic efficiency and downforce',
      category: 'Aerodynamics',
      icon: "Wind"
    },
    {
      term: 'Slipstream',
      definition: 'The area of reduced air pressure behind a car that allows following cars to go faster',
      category: 'Aerodynamics',
      icon: "Wind"
    },
    {
      term: 'Downforce',
      definition: 'Aerodynamic force that pushes the car down onto the track for better grip and cornering',
      category: 'Aerodynamics',
      icon: "Target"
    },
    {
      term: 'Ground Effect',
      definition: 'Aerodynamic phenomenon where air under the car creates a low-pressure area generating downforce',
      category: 'Aerodynamics',
      icon: "Wind"
    },
    {
      term: 'Porpoising',
      definition: 'Bouncing motion of the car caused by ground effect aerodynamics at high speeds',
      category: 'Aerodynamics',
      icon: "Wind"
    },
    {
      term: 'Power Unit',
      definition: 'Modern F1 engine system consisting of internal combustion engine and hybrid components.',
      category: 'Technology',
      icon: "Fuel"
    },   
    { 
      term: 'Turbulence',
      definition: 'Unstable air behind cars causing performance drop for following vehicles.',
      category: 'Aerodynamics',
      icon: "Wind"  
    },                            

    // Rules & Regulations
    {
      term: 'Parc Fermé',
      definition: 'Restricted area where cars are held and cannot be modified between qualifying and race',
      category: 'Rules',
      icon: "Shield"
    },
    {
      term: 'Track Limits',
      definition: 'The defined boundaries of the racing circuit that drivers must stay within',
      category: 'Rules',
      icon: "MapPin"
    },
    {
      term: 'Blue Flag',
      definition: 'Flag shown to backmarkers to let faster cars through when being lapped',
      category: 'Rules',
      icon: "Flag"
    },
    {
      term: 'Yellow Flag',
      definition: 'Caution flag indicating danger ahead - no overtaking allowed in that sector',
      category: 'Rules',
      icon: "Flag"
    },
    {
      term: 'Red Flag',
      definition: 'Flag that stops the session immediately due to dangerous conditions or serious incident',
      category: 'Rules',
      icon: "Flag"
    },
    {
      term: 'Drive-Through Penalty',
      definition: 'Penalty requiring a driver to drive through the pit lane without stopping.',
      category: 'Rules',
    icon: "AlertTriangle"
    },    

    // Safety
    {
      term: 'Safety Car',
      definition: 'Official car deployed to neutralize the race during dangerous conditions while keeping cars running',
      category: 'Safety',
      icon: "Car"
    },
    {
      term: 'Virtual Safety Car',
      definition: 'Electronic system that controls car speeds during caution periods without a physical safety car',
      category: 'Safety',
      icon: "Gauge"
    },
    {
      term: 'Halo',
      definition: 'Titanium head protection device that sits above the cockpit to protect drivers from debris',
      category: 'Safety',
      icon: "Shield"
    },
    {
      term: 'Marshals',
      definition: 'Track officials responsible for safety, recovery of broken-down cars, and flag signals',
      category: 'Safety',
      icon: "Users"
    },
    {
  term: 'Red Flag Procedure',
  definition: 'Protocol followed when a session is stopped, including pit lane entry and no overtaking.',
  category: 'Safety',
  icon: "Shield"
},

    // Communication & Terms
    {
      term: 'Radio Check',
      definition: 'Communication test between driver and pit crew to ensure clear radio contact',
      category: 'Communication',
      icon: "Radio"
    },
    {
      term: 'Copy',
      definition: 'Radio confirmation that a message has been received and understood',
      category: 'Communication',
      icon: "Radio"
    },
    {
      term: 'Gap',
      definition: 'The time difference between two cars, usually measured in seconds',
      category: 'Communication',
      icon: "Timer"
    },
    {
      term: 'Purple Sector',
      definition: 'The fastest sector time during a session, displayed in purple on timing screens',
      category: 'Communication',
      icon: "Trophy"
    },
{
  term: 'Push Now',
  definition: 'Instruction to the driver to give maximum effort for a lap or stint.',
  category: 'Communication',
  icon: "Radio"
},

    // Track & Racing Terms
    {
      term: 'Chicane',
      definition: 'A tight sequence of corners in alternate directions designed to slow cars down',
      category: 'Track Terms',
      icon: "MapPin"
    },
    {
      term: 'Hairpin',
      definition: 'A very tight, slow corner that turns back on itself, usually 180 degrees',
      category: 'Track Terms',
      icon: "MapPin"
    },
    {
      term: 'Apex',
      definition: 'The geometric center or ideal turning point of a corner for the fastest racing line',
      category: 'Track Terms',
      icon: "Target"
    },
    {
      term: 'Racing Line',
      definition: 'The fastest route around a circuit, maximizing speed through corners and straights',
      category: 'Track Terms',
      icon: "MapPin"
    },
    {
      term: 'Kerbs',
      definition: 'Raised strips at corner edges that drivers can use to maximize the racing line',
      category: 'Track Terms',
      icon: "MapPin"
    },
    {
  term: 'Sector',
  definition: 'A racetrack is divided into three sectors for timing and analysis.',
  category: 'Track Terms',
  icon: "MapPin"
},

  //Slangs
  {
  term: 'GOAT',
  definition: 'Acronym for "Greatest of All Time", often used for legendary drivers like Schumacher or Hamilton.',
  category: 'Slang',
  icon: "Trophy"
},
{
  term: 'Clown Fiesta',
  definition: 'Social media slang for a chaotic or mismanaged race.',
  category: 'Slang',
  icon: "AlertTriangle"
},
{
  term: 'Merchant',
  definition: 'Joking term for a driver known for one strong trait, e.g. "Wet weather merchant".',
  category: 'Slang',
  icon: "Users"
},
{
  term: 'WDC / WCC',
  definition: 'Abbreviations for World Drivers’ Championship and World Constructors’ Championship.',
  category: 'Slang',
  icon: "Flag"
},
{
  term: 'Cooked',
  definition: 'Used to describe a ruined strategy, tire, or driver stint. E.g., "His tires are cooked."',
  category: 'Slang',
  icon: "Gauge"
},
{
  term: 'Bottled It',
  definition: 'Slang for when a driver fails under pressure or makes a costly error.',
  category: 'Slang',
  icon: "AlertTriangle"
},
{
  term: 'Masterclass',
  definition: 'Social term used to describe a dominant performance, e.g. “Verstappen gave a masterclass today.”',
  category: 'Slang',
  icon: "Trophy"
}
];

const migrateData = async () => {
  try {
    for (const term of termsData) {
      // Create a document ID from the term (replace spaces and special chars)
      const docId = term.term.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await setDoc(doc(db, "terms", docId), term);
      console.log(`Migrated term: ${term.term}`);
    }
    console.log("Migration complete!");
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

migrateData();