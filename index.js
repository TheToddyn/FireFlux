
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } = require("firebase/firestore");

// PLACE YOUR FIREBASE CREDENTIALS HERE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Adds a new document to a Firestore collection.
 * @param {string} collectionName - The name of the collection (e.g., 'users', 'products').
 * @param {object} data - The data object to be added.
 * @returns {Promise<string>} The ID of the newly created document.
 */
async function add(collectionName, data) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log(`Document added with ID: ${docRef.id}`);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document:", e.message);
        throw e;
    }
}

/**
 * Retrieves all documents from a Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @returns {Promise<Array<object>>} An array of documents, including their IDs.
 */
async function get(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        console.log(`Documents in '${collectionName}':`, documents);
        return documents;
    } catch (e) {
        console.error("Error getting documents:", e.message);
        throw e;
    }
}

/**
 * Updates a specific document in a collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document to be updated.
 * @param {object} newData - The new data for the document.
 * @returns {Promise<void>}
 */
async function update(collectionName, docId, newData) {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, newData);
        console.log(`Document with ID '${docId}' updated successfully.`);
    } catch (e) {
        console.error("Error updating document:", e.message);
        throw e;
    }
}

/**
 * Deletes a specific document from a collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document to be deleted.
 * @returns {Promise<void>}
 */
async function remove(collectionName, docId) {
    try {
        await deleteDoc(doc(db, collectionName, docId));
        console.log(`Document with ID '${docId}' deleted successfully.`);
    } catch (e) {
        console.error("Error deleting document:", e.message);
        throw e;
    }
}

module.exports = {
    add,
    get,
    update,
    remove
};
