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

const rulesData = {
  flags: [
    {
      name: 'Red Flag',
      color: 'bg-red-600',
      icon: 'Flag',
      description: 'Session suspended. All cars must return to pit lane immediately.',
      usage: 'Used when track conditions are unsafe to continue racing or in case of a serious incident.',
      category: 'Emergency'
    },
    {
      name: 'Yellow Flag',
      color: 'bg-yellow-500',
      icon: 'Flag',
      description: 'Danger on track. Reduce speed, no overtaking.',
      usage: 'Displayed when there is an incident or hazard on or near the track.',
      category: 'Caution'
    },
    {
      name: 'Double Yellow Flags',
      color: 'bg-yellow-500',
      icon: 'Flag',
      description: 'Serious hazard. Be prepared to stop. No overtaking.',
      usage: 'Shown when there is a major incident or when marshals are working on or near the track.',
      category: 'Caution'
    },
    {
      name: 'Green Flag',
      color: 'bg-green-600',
      icon: 'Flag',
      description: 'Track clear. Racing conditions resume.',
      usage: 'Displayed after a yellow flag section to indicate normal racing can resume.',
      category: 'All Clear'
    },
    {
      name: 'Blue Flag',
      color: 'bg-blue-600',
      icon: 'Flag',
      description: 'Faster car approaching to lap you. Let them pass.',
      usage: 'Shown to a driver who is about to be lapped and must allow the faster car to pass at the first opportunity.',
      category: 'Information'
    },
    {
      name: 'White Flag',
      color: 'bg-gray-300 text-gray-800',
      icon: 'Flag',     
      description: 'Slow-moving vehicle on track.',
      usage: 'Indicates there is an ambulance, recovery vehicle, or official car on the racing circuit.',
      category: 'Information'
    },
    {
      name: 'Black & White Flag',
      color: 'bg-gray-900',
      icon: 'Flag',
      description: 'Warning for unsportsmanlike behavior.',
      usage: 'Final warning before penalties are applied for driving infractions.',
      category: 'Warning'
    },
    {
      name: 'Black Flag',
      color: 'bg-black',
      icon: 'Flag',
      description: 'Driver disqualified. Return to pits immediately.',
      usage: 'Shown when a driver has been disqualified from the race for a serious rule violation.',
      category: 'Disqualification'
    },
    {
      name: 'Black Flag with Orange Circle',
      color: 'bg-black',
      icon: 'CircleDot',
      description: 'Mechanical problem suspected. Return to pits for inspection.',
      usage: 'Displayed when officials suspect a car has a mechanical issue that could be dangerous.',
      category: 'Technical'
    },
    {
      name: 'Chequered Flag',
      color: 'bg-gray-800',
      icon: 'Flag',
      description: 'End of session or race.',
      usage: 'Waved to signal the completion of a practice session, qualifying, or race.',
      category: 'Finish'
    }
  ],
  penalties: [
    {
      name: 'Time Penalties',
      icon: 'Clock',
      color: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      description: 'Added time to a driver\'s race result or served during pit stops',
      examples: [
        { penalty: '5-Second Penalty', description: 'Track limits violations, minor collisions, unsafe releases' },
        { penalty: '10-Second Penalty', description: 'Causing collisions, forcing another driver off track' },
        { penalty: '20-Second Penalty', description: 'Serious driving infractions or multiple offenses' },
        { penalty: '30-Second Penalty', description: 'Severe breaches of sporting regulations' }
      ]
    },
    // Add all other penalties
    {
      name: 'Stop & Go Penalties',
      icon: 'Target',
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      description: 'Driver must enter pit lane, stop for specified time, then continue',
      examples: [
        { penalty: '5-Second Stop & Go', description: 'Pit lane speeding or unsafe pit releases' },
        { penalty: '10-Second Stop & Go', description: 'False starts or causing avoidable collisions' }
      ]
    },
    {
      name: 'Drive-Through Penalty',
      icon: 'Zap',
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      description: 'Driver must pass through the pit lane without stopping',
      examples: [
        { penalty: 'False Start', description: 'Moving before the lights go out at race start' },
        { penalty: 'Pit Lane Speeding', description: 'Exceeding the pit lane speed limit' },
        { penalty: 'Jump Start', description: 'Leaving grid position before formation lap' }
      ]
    },
    {
      name: 'Grid Penalties',
      icon: 'Car',
      color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
      description: 'Starting positions moved back on the grid',
      examples: [
        { penalty: '3-Place Grid Penalty', description: 'Impeding during qualifying sessions' },
        { penalty: '5-Place Grid Penalty', description: 'Unscheduled gearbox changes' },
        { penalty: '10-Place Grid Penalty', description: 'Engine component changes beyond allocation' },
        { penalty: 'Back of Grid', description: 'Multiple power unit component changes' }
      ]
    },
    {
      name: 'Championship Point Deductions',
      icon: 'Minus',
      color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      description: 'Points removed from driver or constructor standings',
      examples: [
        { penalty: 'Driver Points Deduction', description: 'Serious breaches of sporting conduct' },
        { penalty: 'Constructor Points Deduction', description: 'Technical regulation violations' }
      ]
    },
    {
      name: 'Race Bans & Suspensions',
      icon: 'X',
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      description: 'Exclusion from racing events',
      examples: [
        { penalty: 'Race Ban', description: 'Accumulating 12 penalty points in 12 months' },
        { penalty: 'Season Suspension', description: 'Extremely serious misconduct or safety violations' }
      ]
    },
    {
      name: 'Disqualification',
      icon: 'AlertTriangle',
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      description: 'Exclusion from session or race results',
      examples: [
        { penalty: 'Session Disqualification', description: 'Technical infringements or dangerous driving' },
        { penalty: 'Race Disqualification', description: 'Car fails post-race scrutineering' },
        { penalty: 'Championship Exclusion', description: 'Systematic rule violations' }
      ]
    },
    {
      name: 'Financial Penalties',
      icon: 'FileText',
      color: 'bg-green-500/10 text-green-600 border-green-500/20',
      description: 'Monetary fines imposed on drivers or teams',
      examples: [
        { penalty: 'Driver Fine', description: 'Minor protocol violations or unsportsmanlike conduct' },
        { penalty: 'Team Fine', description: 'Administrative breaches or equipment violations' }
      ]
    }
  ],
  sportingRegulations: [
    {
      title: 'Track Limits & Racing Surface',
      description: 'Drivers must keep all four wheels within the white lines. Track limits violations result in warnings, then time penalties.',
      details: 'Consistently exceeding track limits at the same corner can lead to time penalties or lap time deletions.'
    },
    {
      title: 'Overtaking & Racing Conduct',
      description: 'Drivers must leave racing room when alongside another car. Forcing a driver off track is prohibited.',
      details: 'The driver on the outside must be left at least one car width of space if they are significantly alongside.'
    },
    {
      title: 'Blue Flag Procedures',
      description: 'Lapped drivers must allow faster cars to pass within 3 marshal posts after being shown the blue flag.',
      details: 'Failure to comply can result in time penalties. The blue flag system uses electronic detection.'
    },
    {
      title: 'Safety Car & Virtual Safety Car',
      description: 'During SC periods, no overtaking allowed. Under VSC, drivers must maintain minimum sector times.',
      details: 'Cars must maintain specific distances and cannot gain advantage during safety car periods.'
    },
    {
      title: 'DRS (Drag Reduction System)',
      description: 'Can only be used in designated zones when within 1 second of car ahead at detection point.',
      details: 'DRS is disabled during yellow flag conditions and first two laps after race start or restart.'
    },
    {
      title: 'Formation Lap & Race Start',
      description: 'Drivers must maintain grid position during formation lap. No practice starts allowed.',
      details: 'Jump starts or gaining positions during formation lap result in penalties.'
    }
  ],
  technicalRegulations: [
    {
      title: 'Car Dimensions & Weight',
      description: 'Minimum weight 798kg including driver. Strict dimensional requirements for aerodynamics.',
      details: 'Cars are measured and weighed before and after each session to ensure compliance.'
    },
    {
      title: 'Power Unit Regulations',
      description: 'Hybrid power units with strict component allocation limits per season.',
      details: 'Exceeding allocation results in grid penalties. Fuel flow limited to 100kg/h maximum.'
    },
    {
      title: 'Aerodynamic Regulations',
      description: 'Specific rules governing front wing, rear wing, floor, and bodywork design.',
      details: 'All aerodynamic components must pass rigorous scrutineering and deflection tests.'
    },
    {
      title: 'Tire Regulations',
      description: 'Mandatory tire allocation for practice, qualifying, and race with specific compound requirements.',
      details: 'Q2 tire rule requires top 10 qualifiers to start race on their Q2 qualifying tire.'
    },
    {
      title: 'Parc Fermé Conditions',
      description: 'After qualifying, car setup cannot be changed except for specific allowed adjustments.',
      details: 'Limited to front wing angle, tire pressure, and specific safety-related modifications.'
    },
    {
      title: 'Fuel & Refueling',
      description: 'No refueling during race. Maximum 110kg of fuel allowed for race start.',
      details: 'Fuel samples are taken for analysis to ensure compliance with technical regulations.'
    }
  ],
  procedureRegulations: [
    {
      title: 'Qualifying Format',
      description: 'Three knockout sessions (Q1, Q2, Q3) with specific time allocations and elimination rules.',
      details: 'Q1: 18 minutes, eliminate slowest 5. Q2: 15 minutes, eliminate next 5. Q3: 12 minutes, top 10 fight for pole.'
    },
    {
      title: 'Pit Lane Procedures',
      description: 'Speed limits enforced electronically. Specific rules for pit entry, stops, and exit.',
      details: 'Pit lane speed limit varies by circuit (60-80 km/h). Unsafe releases result in penalties.'
    },
    {
      title: 'Scrutineering Process',
      description: 'Mandatory technical inspections before and after sessions to ensure regulatory compliance.',
      details: 'Random cars selected for detailed scrutineering including weight, dimensions, and component checks.'
    },
    {
      title: 'Driver Equipment',
      description: 'Strict safety requirements for helmets, HANS device, racing suits, and other protective gear.',
      details: 'All equipment must meet FIA safety standards and be approved before use in competition.'
    },
    {
      title: 'Communication Rules',
      description: 'Limited radio communication allowed between team and driver during race conditions.',
      details: 'Certain information prohibited to maintain driver skill importance and prevent excessive assistance.'
    },
    {
      title: 'Medical & Safety Procedures',
      description: 'Comprehensive medical facilities and extraction procedures required at all circuits.',
      details: 'Medical helicopter and extraction team must be operational for all sessions to proceed.'
    }
  ]
};

const migrateData = async () => {
  try {
    // Create main rules document references
    const flagsDocRef = doc(db, "rules", "flags");
    const penaltiesDocRef = doc(db, "rules", "penalties");
    const sportingDocRef = doc(db, "rules", "sporting-regulations");
    const technicalDocRef = doc(db, "rules", "technical-regulations");
    const procedureDocRef = doc(db, "rules", "procedure-regulations");

    // Create empty parent documents first
    await setDoc(flagsDocRef, { type: "flags", createdAt: new Date() });
    await setDoc(penaltiesDocRef, { type: "penalties", createdAt: new Date() });
    await setDoc(sportingDocRef, { type: "sporting-regulations", createdAt: new Date() });
    await setDoc(technicalDocRef, { type: "technical-regulations", createdAt: new Date() });
    await setDoc(procedureDocRef, { type: "procedure-regulations", createdAt: new Date() });

    // Migrate flags to subcollection
    for (const flag of rulesData.flags) {
      const docId = flag.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await setDoc(doc(collection(flagsDocRef, "items"), docId), flag);
      console.log(`Migrated flag: ${flag.name}`);
    }

    // Migrate penalties to subcollection
    for (const penalty of rulesData.penalties) {
      const docId = penalty.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await setDoc(doc(collection(penaltiesDocRef, "items"), docId), penalty);
      console.log(`Migrated penalty: ${penalty.name}`);
    }

    // Migrate sporting regulations
    for (const regulation of rulesData.sportingRegulations) {
      const docId = regulation.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await setDoc(doc(collection(sportingDocRef, "items"), docId), regulation);
      console.log(`Migrated sporting regulation: ${regulation.title}`);
    }

    // Migrate technical regulations
    for (const regulation of rulesData.technicalRegulations) {
      const docId = regulation.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await setDoc(doc(collection(technicalDocRef, "items"), docId), regulation);
      console.log(`Migrated technical regulation: ${regulation.title}`);
    }

    // Migrate procedure regulations
    for (const regulation of rulesData.procedureRegulations) {
      const docId = regulation.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await setDoc(doc(collection(procedureDocRef, "items"), docId), regulation);
      console.log(`Migrated procedure regulation: ${regulation.title}`);
    }

    console.log("Migration complete!");
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

migrateData();