import express from 'express';
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
} from '../controllers/inventoryController';

const inventoryRoute = express.Router();

inventoryRoute.post('/items', createItem);

inventoryRoute.get('/items', getAllItems);

inventoryRoute.get('/items/:id', getItemById);

inventoryRoute.put('/items/:id', updateItem);

inventoryRoute.delete('/items/:id', deleteItem);

export default inventoryRoute;