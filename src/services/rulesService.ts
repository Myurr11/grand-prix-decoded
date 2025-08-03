import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

// Flag type
export interface FlagData {
  name: string;
  color: string;
  icon: string;
  description: string;
  usage: string;
  category: string;
}

// Penalty type
export interface Penalty {
  name: string;
  icon: string;
  color: string;
  description: string;
  examples: {
    penalty: string;
    description: string;
  }[];
}

// Regulation type
export interface Regulation {
  title: string;
  description: string;
  details: string;
}

// Fetch all flags
export const fetchFlags = async (): Promise<FlagData[]> => {
  try {
    const flagsCollection = collection(db, "rules/flags/items");
    const flagsSnapshot = await getDocs(flagsCollection);
    return flagsSnapshot.docs.map(doc => {
      const data = doc.data() as FlagData;
      
      // Handle special flags
      if (data.name.toLowerCase().includes("black and white")) {
        return { ...data, color: "bg-gradient-to-r from-black to-white" };
      }
      if (data.name.toLowerCase().includes("chequered")) {
        return { ...data, color: "bg-gradient-to-r from-black to-white" };
      }
      if (data.name.toLowerCase().includes("orange dot")) {
        return { ...data, color: "bg-black", hasOrangeDot: true };
      }
      
      return data;
    });
  } catch (error) {
    console.error("Error fetching flags:", error);
    return [];
  }
};

// Fetch all penalties
export const fetchPenalties = async (): Promise<Penalty[]> => {
  try {
    const penaltiesCollection = collection(db, "rules/penalties/items");
    const penaltiesSnapshot = await getDocs(penaltiesCollection);
    return penaltiesSnapshot.docs.map(doc => doc.data() as Penalty);
  } catch (error) {
    console.error("Error fetching penalties:", error);
    return [];
  }
};

// Fetch sporting regulations
export const fetchSportingRegulations = async (): Promise<Regulation[]> => {
  try {
    const regulationsCollection = collection(db, "rules/sporting-regulations/items");
    const regulationsSnapshot = await getDocs(regulationsCollection);
    return regulationsSnapshot.docs.map(doc => doc.data() as Regulation);
  } catch (error) {
    console.error("Error fetching sporting regulations:", error);
    return [];
  }
};

// Fetch technical regulations
export const fetchTechnicalRegulations = async (): Promise<Regulation[]> => {
  try {
    const regulationsCollection = collection(db, "rules/technical-regulations/items");
    const regulationsSnapshot = await getDocs(regulationsCollection);
    return regulationsSnapshot.docs.map(doc => doc.data() as Regulation);
  } catch (error) {
    console.error("Error fetching technical regulations:", error);
    return [];
  }
};

// Fetch procedure regulations
export const fetchProcedureRegulations = async (): Promise<Regulation[]> => {
  try {
    const regulationsCollection = collection(db, "rules/procedure-regulations/items");
    const regulationsSnapshot = await getDocs(regulationsCollection);
    return regulationsSnapshot.docs.map(doc => doc.data() as Regulation);
  } catch (error) {
    console.error("Error fetching procedure regulations:", error);
    return [];
  }
};