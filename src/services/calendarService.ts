import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Race {
  round: number;
  raceName: string;
  circuit: string;
  location: string;
  country: string;
  date: string;
  time: string;
  trackImage: string;
  realLifeImage: string;
  status: 'upcoming' | 'completed' | 'live';
  results?: {
    position: number;
    driver: string;
    team: string;
    time?: string;
    points: number;
    laps: number;
  }[];
  sessions: {
    name: string;
    date: string;
    time: string;
    completed: boolean;
  }[];
  circuitLength: string;
  laps: number;
  raceDistance: string;
  lapRecord: {
    driver: string;
    time: string;
    year: string;
  };
  firstGrandPrix: string;
}

export const fetchAllRaces = async (): Promise<Race[]> => {
  try {
    const racesCollection = collection(db, "calendar");
    const racesSnapshot = await getDocs(racesCollection);
    const racesList = racesSnapshot.docs.map(doc => ({
      ...doc.data()
    })) as Race[];
    
    // Sort by round number
    return racesList.sort((a, b) => a.round - b.round);
  } catch (error) {
    console.error("Error fetching races:", error);
    return [];
  }
};

export const fetchRaceByRound = async (round: number): Promise<Race | null> => {
  try {
    const racesCollection = collection(db, "calendar");
    const q = query(racesCollection, where("round", "==", round));
    const racesSnapshot = await getDocs(q);
    
    if (racesSnapshot.empty) {
      return null;
    }
    
    return racesSnapshot.docs[0].data() as Race;
  } catch (error) {
    console.error("Error fetching race by round:", error);
    return null;
  }
};

export const fetchCompletedRaces = async (): Promise<Race[]> => {
  try {
    const allRaces = await fetchAllRaces();
    return allRaces.filter(race => race.status === 'completed');
  } catch (error) {
    console.error("Error fetching completed races:", error);
    return [];
  }
};

export const fetchUpcomingRaces = async (): Promise<Race[]> => {
  try {
    const allRaces = await fetchAllRaces();
    return allRaces.filter(race => race.status === 'upcoming');
  } catch (error) {
    console.error("Error fetching upcoming races:", error);
    return [];
  }
};

export const fetchLiveRaces = async (): Promise<Race[]> => {
  try {
    const allRaces = await fetchAllRaces();
    return allRaces.filter(race => race.status === 'live');
  } catch (error) {
    console.error("Error fetching live races:", error);
    return [];
  }
};