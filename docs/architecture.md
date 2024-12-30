## System Architecture Overview

### Overview
The Inventory Management System is built with the following architecture:

- **Frontend**:
  - Built with React.js and Tailwind CSS.
  - Communicates with the backend through REST API calls.

- **Backend**:
  - Built with Node.js and Express.js.
  - Handles business logic and database operations.

- **Database**:
  - MongoDB is used for data storage.
  - Data models include `Item` schema.

### Component Interaction
1. **Frontend Components**:
   - **ItemList**: Displays all items.
   - **ItemDetails**: Shows details of a single item with edit and delete options.
   - **InventoryModal**: Handles editing and adding items.

2. **Backend Services**:
   - **Routes**: Define API endpoints.
   - **Controllers**: Contain logic for handling requests.
   - **Models**: Define data structure for MongoDB.
