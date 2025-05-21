---

# Mood-Based Music Suggestion Website

Welcome to the **Mood-Based Music Suggestion Website**! This web application helps users find music recommendations based on their current mood. Whether you're feeling happy, sad, energetic, or relaxed, the app will suggest songs that match your emotions.

## Features

* **Mood Selection**: Choose from a set of predefined moods (happy, sad, energetic, etc.).
* **Music Recommendations**: Get curated music suggestions based on the selected mood.
* **Responsive UI**: The design adjusts to different screen sizes for an optimal experience.

## Tech Stack

* **Frontend**:

  * **TypeScript**: Used for writing strongly-typed, maintainable code.
  * **HTML**: For structuring the web pages.
  * **CSS**: For styling the web pages and making them responsive.
* **Backend**:

  * **Java**: Handles the server-side logic for fetching music recommendations based on the user's mood.

## Installation

To run this project locally, follow the instructions below.

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

* **[Node.js](https://nodejs.org/)**: JavaScript runtime environment for the frontend.
* **[Java JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)**: Java Development Kit for the backend.
* **[Maven](https://maven.apache.org/)**: Build automation tool for Java projects.
* **[Git](https://git-scm.com/)**: For cloning the repository.

You can check if you have these installed by running:

```bash
node -v    # Node.js version
java -version  # Java version
mvn -v    # Maven version
git --version  # Git version
```

If any of these are not installed, follow the links to install them first.

### Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/your-username/mood-music-suggestions.git
cd mood-music-suggestions
```

### Frontend Setup (TypeScript, HTML, CSS)

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

   This will install all required libraries from `package.json`.

3. If you haven't already, configure TypeScript by creating a `tsconfig.json` file (if it's not included) with the following basic structure:

   ```json
   {
     "compilerOptions": {
       "target": "ES5",
       "lib": ["dom", "es2015"],
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true
     },
     "include": ["src/**/*"]
   }
   ```

4. Build the TypeScript project:

   ```bash
   npm run build
   ```

   This will transpile TypeScript to JavaScript and place the output in the `dist` folder.

5. To start the development server:

   ```bash
   npm start
   ```

   The frontend should now be available at `http://localhost:3000`. You can open it in your browser.

### Backend Setup (Java)

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install Java dependencies using Maven. First, ensure your `pom.xml` is properly configured with the required dependencies. Then run:

   ```bash
   mvn install
   ```

   This command will install the necessary libraries and dependencies listed in the `pom.xml` file.

3. Compile the Java backend code:

   ```bash
   mvn compile
   ```

4. Run the backend server:

   ```bash
   mvn exec:java
   ```

   The backend server will now be running, and you should see output confirming it's running on a particular port (e.g., `http://localhost:8080`).

   **Note**: The frontend will communicate with this backend to fetch mood-based music recommendations.



### Testing

To ensure everything is working correctly, you can test the app in your browser. Try selecting different moods and checking if the music recommendations are generated.

## Usage

1. Open your browser and go to the frontend URL (usually `http://localhost:3000`).
2. Select a mood from the options provided.
3. View the music recommendations tailored to your chosen mood.
4. Enjoy the music!

## Contributing

We welcome contributions! Here's how you can get involved:

1. **Fork** the repository to your GitHub account.
2. **Clone** your forked repository locally.
3. Create a new **branch** for your changes.
4. Make your changes and **commit** them.
5. **Push** your changes to your fork.
6. Create a **pull request** with a clear description of the changes.

---
