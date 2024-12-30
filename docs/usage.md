
## Instructions for Using the System

### Accessing the Application
1. Open the client URL in your browser (`https://ins-nu.vercel.app`).
2. Use the navigation bar to view, add, edit, or delete inventory items.

### Managing Items
- **Add New Item**:
  1. Click the "Add Item" button.
  2. Fill in the details and submit the form.

- **Edit Item**:
  1. Select an item to view its details.
  2. Click the "Edit" button, modify details, and save changes.

- **Delete Item**:
  1. Select an item to view its details.
  2. Click the "Delete" button and confirm the action.

---

## Codebase Comments
- **`ItemDetails.js`**:
  Key logic and decisions are commented within the file:
  ```javascript
  useEffect(() => {
    // Fetch item details when component mounts
    const fetchItem = async () => {
      try {
        const data = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchItem();
  }, [id, getItemById]);
  ```

- **`InventoryModal.js`**:
  ```javascript
  const handleSave = () => {
    // Validate and save item data
    if (!updatedItem.itemName) {
      alert("Item name is required");
      return;
    }
    onSave(updatedItem);
  };
  ```

Comments are provided throughout the codebase to clarify logic and facilitate future development.

