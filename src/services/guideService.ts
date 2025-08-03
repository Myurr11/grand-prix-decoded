import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

// Define types based on your current data structure
export interface TopicContent {
  [key: string]: string[] | { title: string; description: string }[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  content: TopicContent;
}

export const fetchTopics = async (): Promise<Topic[]> => {
  try {
    const topicsCollection = collection(db, "topics");
    const topicsSnapshot = await getDocs(topicsCollection);
    const topicsList = topicsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Topic[];
    return topicsList;
  } catch (error) {
    console.error("Error fetching topics:", error);
    return [];
  }
};