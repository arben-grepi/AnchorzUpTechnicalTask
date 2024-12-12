# AnchorzUpTechnicalTask

A technical task project built using Node.js and Express. This application includes various utility libraries to enhance functionality, such as QR code generation, database interaction, and environment configuration.

## Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm (v8 or later)
- MongoDB (for database interactions)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arben-grepi/AnchorzUpTechnicalTask.git && cd AnchorzUpTechnicalTask
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. ## Environment Setup

**Create a `.env` file in the root of the project. This file will store the following environment-specific variables:**

   - `DEBUG`: (Optional) Enables debug logging in the backend. 


**You may use the provided example below to set up your `.env` file:**

```plaintext
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/AnchorzUp
PORT=5000
DEBUG=app:log
```
**Save the `.env` file after making the changes..**


## Run the App

**Run the backend and frontend concurrently with:**
```bash
npm start
````

**You can also run them separately for a better logging experience**
In one terminal:
   ```bash
   node index.js
   ```
In another terminal:
   ```bash
   cd react-client/ && npm run dev
   ```
