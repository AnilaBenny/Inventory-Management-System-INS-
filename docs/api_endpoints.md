## API Endpoints

### Endpoint Details

#### 1. **Get All Items**
   - **URL**: `/items`
   - **Method**: GET
   - **Purpose**: Retrieve a list of all items.
   - **Response**:
     ```json
     [
       {
         "_id": "60f6f8d4f2e4c8001d3c9d40",
         "itemName": "Laptop",
         "category": "electronics",
         "quantity": 10,
         "price": 1200
       }
     ]
     ```

#### 2. **Get Item By ID**
   - **URL**: `/items/:id`
   - **Method**: GET
   - **Purpose**: Retrieve details of a specific item by its ID.
   - **Response**:
     ```json
     {
       "_id": "60f6f8d4f2e4c8001d3c9d40",
       "itemName": "Laptop",
       "category": "electronics",
       "quantity": 10,
       "price": 1200,
       "description": "High-performance laptop."
     }
     ```

#### 3. **Create a New Item**
   - **URL**: `/items`
   - **Method**: POST
   - **Request Body**:
     ```json
     {
       "itemName": "Smartphone",
       "category": "electronics",
       "quantity": 15,
       "price": 800
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Item created successfully!",
       "item": {
         "_id": "60f6f8d4f2e4c8001d3c9d41",
         "itemName": "Smartphone",
         "category": "electronics",
         "quantity": 15,
         "price": 800
       }
     }
     ```

#### 4. **Update an Item**
   - **URL**: `/items/:id`
   - **Method**: PUT
   - **Request Body**:
     ```json
     {
       "quantity": 20
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Item updated successfully!",
       "item": {
         "_id": "60f6f8d4f2e4c8001d3c9d40",
         "quantity": 20
       }
     }
     ```

#### 5. **Delete an Item**
   - **URL**: `/items/:id`
   - **Method**: DELETE
   - **Response**:
     ```json
     {
       "message": "Item deleted successfully!"
     }
     ```


