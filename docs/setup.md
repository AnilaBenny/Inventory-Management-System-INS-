# Inventory Management System Documentation


## Project Setup Instructions

### Prerequisites
1. **Node.js and npm**:
   - Ensure that Node.js (version 16 or higher) and npm are installed on your machine.
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```
2. **MongoDB**:
   - Install MongoDB locally or ensure access to a hosted MongoDB instance.

3. **Environment Variables**:
   - Create a `.env` file in the root directory and include the following variables:
     ```env
     MONGO_URI=<Your MongoDB Connection String>
     PORT=5000
     ```

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The server will be available at `http://localhost:5000`.

4. For the frontend, navigate to the `client` folder:
   ```bash
   cd client
   npm install
   npm start
   ```
   The client will be available at `http://localhost:3000`.

