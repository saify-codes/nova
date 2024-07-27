import {
  getFirestore,
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
  addDoc,
  getDoc,
  setDoc,
  query,
  doc,
} from "firebase/firestore";
import { app } from "@/App.vue";

export class FireStore {
  constructor() {
    this.db = getFirestore(app);
    this.lastInsertedId = null;
  }

  async setRecord(_collection, uid, record) {
    try {
      await setDoc(doc(this.db, _collection, uid), record);
      this.lastInsertedId = uid;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async insertRecord(_collection, record) {
    try {
      const record = await addDoc(collection(this.db, _collection), record);
      this.lastInsertedId = record.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getRecords(_collection) {
    try {
      const querySnapshot = await getDocs(collection(this.db, _collection));
      const records = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return records;
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }

  async getRecordById(_collection, recordId) {
    try {
      const record = await getDoc(doc(this.db, _collection, recordId));

      if (record.exists()) {
        return { id: record.id, ...record.data() };
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  }

  async updateRecord(_collection, recordId, newRecord) {
    try {
      await updateDoc(doc(db, _collection, recordId), newRecord);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async deleteRecord(_collection, recordId) {
    try {
      await deleteDoc(doc(db, _collection, recordId));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  async queryRecord(_collection, ...clause) {
    try {
      const q = query(collection(db, _collection), ...clause);
      const querySnapshot = await getDocs(q);

      const records = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return records;
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }
}
