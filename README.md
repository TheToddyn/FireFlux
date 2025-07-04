# Fireflux: Your Optimized Firebase Firestore Database Library

Fireflux is a lightweight and optimized Node.js library for interacting with Firebase Firestore, making cloud data management simple and efficient. It's ideal for projects seeking scalability, real-time synchronization, and the robustness of Firebase without the complexity of a traditional backend.

## Features

- **Add Documents (`add`):** Insert new data into your Firestore collections.
- **Get Documents (`get`):** Retrieve all documents from a collection.
- **Update Documents (`update`):** Modify existing data in specific documents.
- **Delete Documents (`remove`):** Remove documents from your collections.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/TheToddyn/FireFlux.git
    cd FireFlux
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Firebase Configuration (Essential Step)

For Fireflux to work, you need to connect your library to your Firebase project in the Google Cloud. Follow these steps:

1.  **Create a Project in Firebase Console:**
    *   Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
    *   Click on "Add project" and follow the instructions to create a new Firebase project.

2.  **Add a Web App to Your Project:**
    *   After creating the project, in the overview, click on the `</>` (Web) icon to add a web application.
    *   Give your app a nickname and click "Register app".

3.  **Get Your Configuration Credentials (`firebaseConfig`):**
    *   After registering the app, Firebase will display a JavaScript object named `firebaseConfig`. **COPY THIS ENTIRE OBJECT.** It will look similar to:

        ```javascript
        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };
        ```

4.  **Enable Firestore Database:**
    *   In the left-hand menu of the Firebase Console, under "Build", click on "Firestore Database".
    *   Click on "Create database" and choose "Start in test mode" to get started quickly (you can adjust security rules later).

5.  **Paste Your Credentials into `index.js`:**
    *   Open the `index.js` file in the root of your Fireflux project.
    *   Locate the section `// PLACE YOUR FIREBASE CREDENTIALS HERE`.
    *   Replace the existing `firebaseConfig` object with the one you copied from the Firebase Console.

## How to Use the Fireflux Library

After installing and configuring Firebase, you can use the library's functions in your own Node.js scripts.

### Basic Usage Example

Create a file (e.g., `test.js`) in the same directory as `index.js` and add the following code:

```javascript
const { add, get, update, remove } = require('./index');

async function main() {
    console.log("\n--- Starting Fireflux Tests ---");

    // 1. Add a new user
    console.log("Adding user...");
    const newUser = { name: "Alice", email: "alice@example.com", age: 30 };
    const aliceId = await add("users", newUser);
    console.log(`User Alice added with ID: ${aliceId}`);

    // 2. Add another user
    console.log("Adding another user...");
    const anotherUser = { name: "Bob", email: "bob@example.com", city: "New York" };
    await add("users", anotherUser);

    // 3. Get all users
    console.log("\nGetting all users...");
    const allUsers = await get("users");
    console.log("All users in Firestore:", allUsers);

    // 4. Update Alice's email
    console.log("\nUpdating Alice's email...");
    await update("users", aliceId, { email: "alice.smith@example.com" });
    console.log("Alice's email updated.");

    // 5. Get users again to see the update
    console.log("\nGetting users after update...");
    await get("users");

    // 6. Delete user Bob (you would need Bob's actual ID here)
    // For this example, let's assume Bob is the second user added and try to delete him.
    // In a real application, you would get Bob's ID from a search or a variable.
    // console.log("\nDeleting user Bob...");
    // const bobDoc = allUsers.find(user => user.name === "Bob");
    // if (bobDoc) {
    //     await remove("users", bobDoc.id);
    //     console.log("User Bob deleted.");
    // }

    // 7. Get users again to see the deletion
    // console.log("\nGetting users after deletion...");
    // await get("users");

    console.log("\n--- Fireflux Tests Completed ---");
}

main().catch(console.error);
```

To run this example, save it as `test.js` in the same directory as `index.js` and execute:

```bash
node test.js
```

## Error Logging

Fireflux includes basic error logging to the console. If an operation fails, an error message will be printed, providing details about the issue.

## Contribution

Feel free to contribute with improvements, bug fixes, or new features. Open an issue or send a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
