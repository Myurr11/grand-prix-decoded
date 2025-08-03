import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface Term {
  term: string;
  definition: string;
  category: string;
  icon: string;
}

export const fetchAllTerms = async (): Promise<Term[]> => {
  try {
    const termsCollection = collection(db, "terms");
    const termsSnapshot = await getDocs(termsCollection);
    return termsSnapshot.docs.map(doc => doc.data() as Term);
  } catch (error) {
    console.error("Error fetching terms:", error);
    return [];
  }
};

export const fetchTermsByCategory = async (category: string): Promise<Term[]> => {
  try {
    const termsCollection = collection(db, "terms");
    const q = query(termsCollection, where("category", "==", category));
    const termsSnapshot = await getDocs(q);
    return termsSnapshot.docs.map(doc => doc.data() as Term);
  } catch (error) {
    console.error("Error fetching terms by category:", error);
    return [];
  }
};

export const searchTerms = async (searchText: string): Promise<Term[]> => {
  try {
    const allTerms = await fetchAllTerms();
    return allTerms.filter(term => 
      term.term.toLowerCase().includes(searchText.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchText.toLowerCase()) ||
      term.category.toLowerCase().includes(searchText.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching terms:", error);
    return [];
  }
};