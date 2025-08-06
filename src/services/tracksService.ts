import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Circuit {
  name: string;
  trackImage: string;
  location: string;
  continent: string;
  length: string;
  turns: number;
  lapRecord: string;
  firstGP: number;
  drsZones: number;
  description: string;
  keyFeatures: string[];
  difficulty: string;
  weather: string;
  surface: string;
  corners: {
    name: string;
    number: number;
    type: string;
    difficulty: string;
    description: string;
  }[];
  sectors: {
    number: number;
    description: string;
    characteristics: string[];
  }[];
  strategy: {
    overtaking: string;
    setup: string;
    tires: string;
    fuel: string;
  };
  history: {
    year: number;
    event: string;
  }[];
}

export const fetchAllCircuits = async (): Promise<Circuit[]> => {
  try {
    const circuitsCollection = collection(db, "circuits");
    const circuitsSnapshot = await getDocs(circuitsCollection);
    const circuitsList = circuitsSnapshot.docs.map(doc => doc.data() as Circuit).map(data => ({
      id: circuitsSnapshot.docs[0].id,
      ...data
    })) as Circuit[];
    
    // Sort alphabetically by name
    return circuitsList.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching circuits:", error);
    return [];
  }
};

export const fetchCircuitById = async (id: string): Promise<Circuit | null> => {
  try {
    const circuitRef = doc(db, "circuits", id);
    const circuitSnapshot = await getDoc(circuitRef);
    
    if (!circuitSnapshot.exists()) {
      return null;
    }
    
    return {
      id: circuitSnapshot.id as string,
      ...(circuitSnapshot.data() as Circuit)
    } as Circuit;
  } catch (error) {
    console.error("Error fetching circuit by ID:", error);
    return null;
  }
};

export const fetchCircuitByName = async (name: string): Promise<Circuit | null> => {
  try {
    const circuitsCollection = collection(db, "circuits");
    const q = query(circuitsCollection, where("name", "==", name));
    const circuitsSnapshot = await getDocs(q);
    
    if (circuitsSnapshot.empty) {
      return null;
    }
    
    return {
      id: circuitsSnapshot.docs[0].id as string,
      ...(circuitsSnapshot.docs[0].data() as Circuit)
    } as Circuit;
  } catch (error) {
    console.error("Error fetching circuit by name:", error);
    return null;
  }
};

export const fetchCircuitsByContinent = async (continent: string): Promise<Circuit[]> => {
  try {
    const circuitsCollection = collection(db, "circuits");
    const q = query(circuitsCollection, where("continent", "==", continent));
    const circuitsSnapshot = await getDocs(q);
    
    return circuitsSnapshot.docs.map(doc => ({
      id: doc.id as string,
      ...(doc.data() as Circuit)
    })) as Circuit[];
  } catch (error) {
    console.error("Error fetching circuits by continent:", error);
    return [];
  }
};

export const fetchCircuitsByDifficulty = async (difficulty: string): Promise<Circuit[]> => {
  try {
    const circuitsCollection = collection(db, "circuits");
    const q = query(circuitsCollection, where("difficulty", "==", difficulty));
    const circuitsSnapshot = await getDocs(q);
    
    return circuitsSnapshot.docs.map(doc => ({
      id: doc.id as string,
      ...(doc.data() as Circuit)
    })) as Circuit[];
  } catch (error) {
    console.error("Error fetching circuits by difficulty:", error);
    return [];
  }
};

// Utility function to get all unique continents
export const fetchAllContinents = async (): Promise<string[]> => {
  try {
    const circuits = await fetchAllCircuits();
    const continents = new Set(circuits.map(circuit => circuit.continent));
    return Array.from(continents).sort();
  } catch (error) {
    console.error("Error fetching continents:", error);
    return [];
  }
};

// Utility function to get all unique difficulties
export const fetchAllDifficulties = async (): Promise<string[]> => {
  try {
    const circuits = await fetchAllCircuits();
    const difficulties = new Set(circuits.map(circuit => circuit.difficulty));
    return Array.from(difficulties).sort();
  } catch (error) {
    console.error("Error fetching difficulties:", error);
    return [];
  }
};