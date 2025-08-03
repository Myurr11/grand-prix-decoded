import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

// Your Firebase config - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyCPv-VACF8qWb4sCLHLHDX95xtvMNVhvo0",
  authDomain: "f1-guide-c0eed.firebaseapp.com",
  projectId: "f1-guide-c0eed",
  storageBucket: "f1-guide-c0eed.firebasestorage.app",
  messagingSenderId: "1041900201657",
  appId: "1:1041900201657:web:ad9bdb5ae89507ba99dd68",
  measurementId: "G-8D60X5BNM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Copy your essentialTopics array from Guide.tsx but remove the icon references
const essentialTopics = [
  {
    id: 'intro',
    title: 'What is Formula 1?',
    icon: 'BookOpen',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    description: 'An introduction to the world of Formula 1 racing',
    content: {
      overview: [
        "Formula 1 (F1) is the premier international motorsport for single-seater, open-wheel racing cars.",
        "Regulated by the FIA, F1 features the fastest, most technologically advanced racing cars on purpose-built and street circuits worldwide.",
        "A full grid includes 20 drivers representing 10 teams, competing in races called Grands Prix.",
        "The sport is a blend of engineering excellence, driver skill, and strategic mastery."
      ],
      whyItMatters: [
        "F1 is a global sport watched by millions, with races hosted across five continents.",
        "It leads automotive innovation, with technologies often transferring to road cars.",
        "Beyond speed, it offers thrilling narratives involving rivalries, teamwork, politics, and high-stakes decisions."
      ]
    }
  },
  {
    id: 'teams-drivers',
    title: 'Teams & Drivers',
    icon: 'Users', // Change from Users component to string 'Users'
    color: 'bg-teal-500',
    gradient: 'from-teal-500 to-teal-600',
    description: 'Meet the people who race and the teams behind them',
    content: {
      teams: [
        "There are 10 teams in F1, each fielding two drivers and building their own cars.",
        "Iconic teams include Ferrari, Mercedes, McLaren, and Red Bull. Newer entries include Haas and Aston Martin.",
        "Teams compete in the Constructors’ Championship based on the combined results of both drivers."
      ],
      drivers: [
        "F1 drivers are elite athletes with lightning reflexes, technical feedback ability, and endurance.",
        "Stars of the sport include Lewis Hamilton, Max Verstappen, Charles Leclerc, and Fernando Alonso.",
        "Rising talent typically enters through junior categories like F2 and F3."
      ]
    }
  },
  {
    id: 'cars',
    title: 'The F1 Car',
    icon: "Cpu",
    color: 'bg-gray-600',
    gradient: 'from-gray-600 to-gray-700',
    description: 'Explore what makes these machines so advanced',
    content: {
      components: [
        "Chassis: Made of carbon fiber for strength and lightness; it forms the main body of the car.",
        "Power Unit: A hybrid 1.6L V6 turbo engine paired with energy recovery systems, producing ~1000 hp.",
        "ERS (Energy Recovery System): Stores energy from braking and heat to give the car electric boosts.",
        "DRS (Drag Reduction System): Reduces rear-wing drag on straights to improve overtaking.",
        "Tyres: Provided by Pirelli, with multiple compounds (soft, medium, hard) and wet-weather options."
      ],
      designPrinciples: [
        "Downforce: Increases grip by pushing the car down onto the track, crucial in corners.",
        "Aerodynamics: Shapes airflow for speed and cooling — teams use wind tunnels and CFD simulations.",
        "Weight & Balance: Cars are built to minimum allowed weight, balanced for optimum handling."
      ]
    }
  },
{
  id: 'race-weekend',
  title: 'Race Weekend Explained',
  icon: "Calendar",
  color: 'bg-green-500',
  gradient: 'from-green-500 to-green-600',
  description: 'What happens across a typical Grand Prix weekend',
  content: {
    FreePracticeOne: [
      'Duration: 60 minutes, typically held on Friday morning.',
      'Drivers get their first feel for the track conditions and layout.',
      'Teams experiment with different car setups, aerodynamics, and balance.',
      'Initial data is collected on tire wear, fuel loads, and overall performance.',
      'Often used to test new upgrades or evaluate young/reserve drivers.'
    ],
    FreePracticeTwo: [
      'Held on Friday afternoon, also 60 minutes long.',
      'Focus shifts to race simulations and long-run performance.',
      'Drivers complete both low-fuel and high-fuel stints.',
      'Conditions often resemble the expected race time, making data crucial.',
      'Strategists begin shaping potential race strategies and tire plans.'
    ],
    FreePracticeThree: [
      'Takes place on Saturday morning for 60 minutes.',
      'Final session before qualifying — mainly focused on short runs.',
      'Teams fine-tune the car for one-lap pace and track grip.',
      'Crucial for dialing in confidence before the all-important qualifying.',
      'Setup changes are finalized before Parc Fermé rules lock car settings.'
    ],
    Qualifying: [
      'Takes place on Saturday afternoon and lasts about an hour.',
      'Divided into three sessions: Q1 (18 mins), Q2 (15 mins), Q3 (12 mins).',
      'Q1: All 20 drivers compete; slowest 5 are eliminated.',
      'Q2: Top 15 advance; next 5 are eliminated.',
      'Q3: Top 10 battle for pole position and front grid spots.',
      'Each driver aims for their fastest possible lap time on low fuel and fresh tires.',
      'Grid position is key, especially on circuits where overtaking is difficult.'
    ],
    RaceDay: [
      'Held on Sunday, usually in the afternoon local time.',
      'Grand Prix distance: ~305 km or up to 2 hours (shorter in Monaco).',
      'Race begins with a standing start — lights out and away we go!',
      'At least one pit stop is required (to use two tire compounds unless wet).',
      'Race strategy, tire management, and driver skill all influence results.',
      'Points awarded to top 10 finishers; fastest lap earns 1 extra point (if in top 10).',
      'Ends with a podium celebration for the top 3 finishers.'
    ],
    SprintWeekend: [
      'Used at selected events — offers a different weekend format.',
      'Friday: One practice session, then Sprint Qualifying (sets Sprint grid).',
      'Saturday: Sprint Race (~100 km), no mandatory pit stop.',
      'Points awarded to top 8 finishers in the Sprint.',
      'Sunday: Grand Prix runs as usual, with its own starting grid.',
      'Sprint format adds unpredictability and gives fans more racing action.'
    ]
  }
},
  {
  id: 'points',
  title: 'Championship & Points',
  icon: "Trophy",
  color: 'bg-yellow-500',
  gradient: 'from-yellow-500 to-yellow-600',
  description: 'How titles are won in F1',
  content: {
    scoring: [
      'Points are awarded to the top 10 finishers in each race as follows:',
      '1st: 25 pts, 2nd: 18 pts, 3rd: 15 pts, 4th: 12 pts, 5th: 10 pts,',
      '6th: 8 pts, 7th: 6 pts, 8th: 4 pts, 9th: 2 pts, 10th: 1 pt.',
      'An additional point is given for the fastest lap — but only if the driver finishes in the top 10.',
      'Sprint races offer fewer points: Top 8 earn 8-7-6-5-4-3-2-1 respectively.'
    ],
    championships: [
      'Drivers’ Championship: Awarded to the driver with the most points over the season.',
      'Constructors’ Championship: Given to the team with the highest total points from both drivers combined.',
      'Both championships are highly prestigious and often closely contested.',
      'Consistent performance and teamwork across the season are key to winning titles.'
    ]
  }
},
  {
  id: 'strategy',
  title: 'Race Strategy',
  icon: "PieChart",
  color: 'bg-purple-500',
  gradient: 'from-purple-500 to-purple-600',
  description: 'Mastering the race with clever tactics',
  content: {
    TireManagement: [
      'Each driver has a limited number of tire sets (soft, medium, hard).',
      'Choosing the right compound at the right time is essential for pace and durability.',
      'Drivers must use at least two different dry-weather compounds in a race (unless it’s wet).',
      'Managing tire wear while maintaining speed is a crucial skill, especially on abrasive tracks.'
    ],
    PitStops: [
      'Pit stops are used to change tires or repair damage; a good stop takes around 2–3 seconds.',
      'Timing is everything — a poorly timed stop can cost track position.',
      'Pit crews practice relentlessly to minimize errors and delays.',
      'Teams also use “double stack” stops when both drivers pit one after the other — risky but sometimes necessary.'
    ],
    Undercut: [
      'A strategy where a driver pits earlier than a rival to take advantage of fresher tires.',
      'While the rival stays out on worn tires, the undercutting driver sets faster lap times.',
      'When the rival finally pits, they may rejoin the track behind — losing position.',
      'Works best when tire degradation is high and overtaking is difficult.'
    ],
    Overcut: [
      'Involves staying out longer while rivals pit, aiming to build a gap.',
      'Can be effective if the driver still has good pace on older tires or if the track is clearing of traffic.',
      'Also useful if the rival gets stuck behind slower cars after their stop.',
      'The overcut is more likely to work on circuits where tire wear is low.'
    ],
    SafetyCarAndVSC: [
      'The Safety Car (SC) and Virtual Safety Car (VSC) neutralize the race due to incidents on track.',
      'During SC or VSC, the field slows down, which reduces time lost during pit stops.',
      'Teams often make opportunistic pit stops during these periods to gain track position.',
      'Strategists must react instantly — making or missing a stop during SC/VSC can change the race outcome.'
    ]
  }
},
  {
  id: 'rules',
  title: 'F1 Rules & Flags',
  icon: "Flag",
  color: 'bg-orange-500',
  gradient: 'from-orange-500 to-orange-600',
  description: 'The basic rulebook and flag signals',
  content: {
    flags: [
      "🟢 Green: Track is clear; racing can continue normally.",
      "🟡 Yellow: Caution — slow down and no overtaking.",
      "🟡🟡 Double Yellow: Extreme caution — be prepared to stop.",
      "🔴 Red: Session stopped due to dangerous conditions (e.g., crash, weather).",
      "🔵 Blue: Let faster, lapping cars pass safely.",
      "⚫ Black: Driver disqualified or summoned to the pits for a serious violation.",
      "🏁 Checkered: End of session or race.",
      "🔄 Restart Types: After a red flag or Safety Car, races may restart using standing or rolling starts."
    ],
    penalties: [
      "⏱️ Time Penalties: 5s or 10s added to race time for minor infractions (like track limits).",
      "🚧 Drive-Through Penalty: Must drive through the pit lane without stopping.",
      "🛑 Stop-Go Penalty: Must stop in the pit box for 10 seconds, then rejoin the race.",
      "⬇️ Grid Penalty: Applied to starting position for things like unscheduled engine or gearbox changes.",
      "⚪ Track Limits: Drivers must stay within white lines — repeated violations lead to penalties.",
      "📊 License Points: Drivers earn points for misconduct; accumulating 12 within 12 months results in a 1-race ban."
    ],
    procedures: [
      "🔁 Formation Lap: A warm-up lap before the race starts, where drivers heat tires and brakes. No overtaking allowed.",
      "📏 Technical Regulations: Post-race scrutineering ensures all cars comply with technical specs. Failing this can lead to disqualification."
    ],
    SafetyCarProcedures: [
      "🟪 Virtual Safety Car (VSC): Drivers must reduce speed and maintain a delta. No overtaking allowed.",
      "🚗 Safety Car: A real car leads the pack slowly during incidents. Racing resumes when it exits.",
    ]
  }
},
  {
  id: 'terminology',
  title: 'F1 Terminology',
  icon: "FileText",
  color: 'bg-indigo-500',
  gradient: 'from-indigo-500 to-indigo-600',
  description: 'Key terms you’ll hear during a race',
  content: {
    basicTerms: [
      "DRS (Drag Reduction System): A rear-wing mechanism that opens on straights to reduce drag and help overtaking. Only usable in designated zones if you're within 1 second of the car ahead.",
      "Pole Position: First place on the starting grid, earned by setting the fastest lap time in qualifying.",
      "DNF (Did Not Finish): When a driver retires from a race due to mechanical failure, crash, or other issues.",
      "Box, Box: The radio command from the team telling the driver to enter the pits for a tire change or repair.",
      "Stint: The time a driver spends on one set of tires before pitting for a new set.",
      "Outlap / Inlap: Outlap is the lap after exiting the pits; Inlap is the lap just before entering the pits.",
      "Flying Lap: A timed lap during qualifying or practice, typically with maximum pace.",
      "Push Lap: When a driver is told to go flat out to gain time or set a fast lap."
    ],
    strategyTerms: [
      "Undercut: Pitting earlier than a rival to gain time on fresher tires before they stop.",
      "Overcut: Staying out longer than a rival to gain time while they’re on cold tires after their stop.",
      "Tyre Degradation: The gradual loss of grip and performance from tire wear during a stint.",
      "Tire Compounds: F1 uses Soft, Medium, and Hard dry tires — each with different grip and durability levels.",
      "Dirty Air: Turbulent air created by the car in front, which reduces downforce and makes following harder.",
      "Clean Air: Uninterrupted airflow — ideal for maximum aerodynamic efficiency, often when leading the race."
    ],
    technicalTerms: [
      "Parc Fermé: A locked state for cars after qualifying — no major changes are allowed before the race.",
      "Telemetry: Real-time data sent from the car to engineers, including speed, tire temperatures, fuel usage, etc.",
      "Brake Bias: The adjustable balance between front and rear braking force, optimized by drivers during the race.",
      "ERS (Energy Recovery System): Recovers energy during braking and stores it in batteries to give an extra power boost.",
      "Lift and Coast: A fuel- or brake-saving technique where the driver lifts off the throttle before braking into corners.",
      "Weighbridge: A mandatory FIA platform where cars are randomly weighed during qualifying to ensure compliance."
    ],
    slangAndCommunication: [
      "Push Now: Command to give maximum pace, often for an overtake or flying lap.",
      "Delta Time: The time difference compared to a set target lap time (used during VSC or qualifying runs).",
      "Hammer Time: Mercedes-specific phrase meaning ‘go flat out now’ — made famous by Lewis Hamilton’s team.",
      "Engine Mode: Settings that change engine performance, fuel saving, or energy deployment.",
      "Strat Mode: Short for ‘strategy mode’ — controls engine performance profiles (e.g., attack vs fuel-save)."
    ]
  }
},
  {
  id: 'tracks',
  title: 'Race Tracks & Circuits',
  icon: "Map",
  color: 'bg-lime-500',
  gradient: 'from-lime-500 to-lime-600',
  description: 'Where the action unfolds around the globe',
  content: {
    circuitTypes: [
      {
        title: "Street Circuits",
        description:
          "Temporary tracks built on city streets, offering tight corners and little room for error. Known for unpredictability and spectacle. Example: Monaco, Singapore."
      },
      {
        title: "Permanent Circuits",
        description:
          "Purpose-built race tracks with wide run-off areas, elevation changes, and designed for speed and safety. Example: Silverstone, Suzuka."
      },
      {
        title: "Hybrid Circuits",
        description:
          "A mix of street and permanent track features. Often partially built into urban areas with dedicated racing sections. Example: Melbourne (Albert Park)."
      }
    ],
    iconicExamples: [
      {
        title: "Monaco",
        description:
          "The most iconic street circuit — narrow, glamorous, and incredibly tough to overtake on. Precision is everything."
      },
      {
        title: "Spa-Francorchamps",
        description:
          "A fan favorite with long straights, dramatic elevation, and the legendary Eau Rouge corner. Known for weather drama."
      },
      {
        title: "Monza",
        description:
          "High-speed temple of speed in Italy. Minimal downforce and maximum top speed — great for overtaking."
      },
      {
        title: "Suzuka",
        description:
          "Unique figure-8 layout in Japan. Demanding and fast with a mix of corners that test driver skill."
      },
      {
        title: "Silverstone",
        description:
          "The historic home of British motorsport. Fast-flowing and technical — F1’s very first race took place here."
      }
    ]
  }
},
  {
  id: 'season-format',
  title: 'F1 Season Format',
  icon: "Clock",
  color: 'bg-cyan-600',
  gradient: 'from-cyan-600 to-cyan-700',
  description: 'How a full season of Formula 1 is structured',
  content: {
    calendar: [
      "The F1 season typically runs from March to December.",
      "There are usually 22–24 races held in different countries across five continents.",
      "Each race weekend spans 3 days — Friday (practice), Saturday (qualifying), and Sunday (race).",
      "Sprint weekends are included in select events, adding an extra competitive session on Saturday.",
      "The season features a mix of high-speed circuits, street tracks, and technical layouts to test drivers in all conditions."
    ],
    pointsSystem: [
      "Points are awarded after every race to the top 10 finishers: 25-18-15-12-10-8-6-4-2-1.",
      "An extra point is given for the fastest lap, if set by a top-10 finisher.",
      "Sprint races award fewer points: 8 for the winner down to 1 point for 8th place.",
      "Two main championships run in parallel: the Drivers’ Championship and Constructors’ Championship.",
      "Consistency is key — regular top finishes often outweigh occasional wins.",
      "Car upgrades, strategic planning, and team development continue throughout the season."
    ]
  }
},
  {
  id: 'f1-roles',
  title: 'People Behind the Scenes',
  icon: "Users2",
  color: 'bg-rose-500',
  gradient: 'from-rose-500 to-rose-600',
  description: 'F1 is more than just drivers and cars',
  content: {
    keyPeople: [
      {
        title: "Race Engineers",
        description: "Act as the driver's right hand during races. They analyze telemetry data, suggest setup changes, and give real-time updates during the race. Constantly on the radio, they're the voice a driver hears most."
      },
      {
        title: "Team Principals",
        description: "Responsible for the overall leadership of the team — making decisions about drivers, team operations, and corporate strategy. Well-known principals include Toto Wolff (Mercedes) and Christian Horner (Red Bull)."
      },
      {
        title: "Pit Crew",
        description: "Specialized mechanics trained to perform tire changes and minor repairs in 2–3 seconds. Each member has a specific role — from loosening wheel nuts to lifting the car."
      },
      {
        title: "Strategists",
        description: "Work behind the scenes using simulations and data to decide pit stop timing, tire choices, and responses to changing race conditions. Their calls can make or break a race result."
      },
      {
        title: "FIA Officials",
        description: "Regulate the sport’s rules, safety standards, and fairness. Includes the Race Director, Stewards, and technical delegates — all key to ensuring consistency and control during races."
      },
      {
        title: "Marshals & Medical Team",
        description: "Trackside marshals wave flags, assist in clearing crashes, and support driver safety. The medical team — including a rapid response car — ensures immediate care in case of incidents."
      }
    ],
    supportRoles: [
      {
        title: "Mechanics & Garage Crew",
        description: "Responsible for assembling and maintaining the cars. They manage overnight repairs, engine swaps, and ensure the car is race-ready after every session."
      },
      {
        title: "Performance Analysts",
        description: "Study race data, tire degradation, driver behavior, and fuel usage to optimize pace and strategy. Collaborate closely with engineers and strategists."
      },
      {
        title: "Reserve & Simulator Drivers",
        description: "Act as backup drivers and spend countless hours in simulators testing setups and upgrades. Their feedback is vital for race preparation."
      },
      {
        title: "Media & Communications Team",
        description: "Handle all team communications, social media, and media relations. They manage driver interviews, press releases, and fan engagement."
      }
    ]
  }
},
  {
  id: 'how-to-watch',
  title: 'How to Watch & Enjoy',
  icon: "Monitor",
  color: 'bg-pink-500',
  gradient: 'from-pink-500 to-pink-600',
  description: 'Maximize your F1 viewing experience',
  content: {
    platforms: [
      "Watch races live or on-demand via F1 TV Pro, Sky Sports F1, ESPN, or regional broadcasters.",
      "Use the official F1 app for live timing, driver trackers, team radios, and onboard cameras.",
      "YouTube offers race highlights, driver interviews, and post-race breakdowns for free."
    ],
    engagementTips: [
      "Familiarize yourself with team liveries, driver helmets, and car numbers for easy identification.",
      "Tune into pre- and post-race coverage to understand strategies and controversies.",
      "Join the F1 community on Reddit (r/formula1), Twitter/X, Discord servers, or F1 Fantasy leagues to deepen your understanding.",
      "Follow F1 content creators, podcasts, and explainers like Chain Bear, WTF1, or The Race for deeper insights."
    ]
  }
},
  {
  id: 'getting-involved',
  title: 'Becoming an F1 Fan',
  icon: "Heart",
  color: 'bg-red-600',
  gradient: 'from-red-600 to-red-700',
  description: 'How to go from curious to committed fan',
  content: {
    howToStart: [
      "Pick a favorite driver or team — it makes watching races far more exciting.",
      "Watch Netflix’s ‘Drive to Survive’ for drama, rivalries, and behind-the-scenes insights.",
      "Start with current races, but also explore past iconic moments and seasons.",
      "Attend a live Grand Prix or visit an F1 fan zone to feel the energy firsthand."
    ],
    growYourFandom: [
      "Follow your favorite teams and drivers on social media for news and fun content.",
      "Join online F1 communities on Reddit, Discord, or YouTube comment sections.",
      "Play F1 video games or try fantasy leagues to learn more about tracks and strategies.",
      "Stay curious — every race weekend has stories, strategies, and controversies to discover."
    ]
  }
},
  {
  id: 'fun-facts',
  title: 'Fun Facts & Trivia',
  icon: "Smile",
  color: 'bg-sky-500',
  gradient: 'from-sky-500 to-sky-600',
  description: 'Impress your friends with quirky F1 knowledge',
  content: {
    trivia: [
      "Top Speed: Valtteri Bottas hit ~397 km/h during qualifying at Baku in 2016.",
      "Youngest Winner: Max Verstappen won at age 18 in Spain 2016.",
      "Most Championships: Michael Schumacher and Lewis Hamilton share the record with 7 titles each.",
      "Longest Race: 2011 Canadian GP lasted over 4 hours due to heavy rain.",
      "Most Constructors' Titles: Ferrari leads with 16 championships.",
      "G-forces: Drivers endure up to 6g under heavy braking and fast corners.",
      "Driver Stamina: F1 drivers can lose 2–4 kg of body weight in a single hot race."
    ],
    didYouKnow: [
      "F1 steering wheels cost over $50,000 and feature 20+ customizable buttons.",
      "Pit stops can be completed in under 2 seconds — the record is 1.82s by Red Bull Racing.",
      "F1 cars can theoretically drive upside-down at speed due to high downforce.",
      "Monaco is the slowest circuit on the calendar but among the hardest to win.",
      "Engineers use encrypted radios and tire blankets with temperature sensors for secrecy.",
      "Each team ships 40–60 tons of gear per race using cargo planes and containers.",
      "F1 engines rev up to 15,000 RPM and can’t be started without external power units."
    ],
    recordBreakers: [
      "Most Race Wins: Lewis Hamilton — 103 (and counting).",
      "Oldest Winner: Luigi Fagioli, who won in 1951 at age 53.",
      "Most Races Started: Fernando Alonso — over 380 races as of 2025.",
      "Biggest Win Margin: Jim Clark once lapped the entire field in 1963.",
      "Shortest Race Ever: 2021 Belgian GP — only 2 laps behind the safety car due to rain.",
      "Most Consecutive Wins: Sebastian Vettel — 9 wins in a row in 2013.",
      "Most Poles in a Season: Sebastian Vettel — 15 poles in 2011."
    ]
  }
}
  ];

const migrateData = async () => {
  try {
    for (const topic of essentialTopics) {
      await setDoc(doc(db, "topics", topic.id), topic);
      console.log(`Migrated topic: ${topic.id}`);
    }
    console.log("Migration complete!");
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

migrateData();