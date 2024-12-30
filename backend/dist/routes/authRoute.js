"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventoryController_1 = require("../controllers/inventoryController");
const inventoryRoute = express_1.default.Router();
inventoryRoute.post('/items', inventoryController_1.createItem);
inventoryRoute.get('/items', inventoryController_1.getAllItems);
inventoryRoute.get('/items/:id', inventoryController_1.getItemById);
inventoryRoute.put('/items/:id', inventoryController_1.updateItem);
inventoryRoute.delete('/items/:id', inventoryController_1.deleteItem);
exports.default = inventoryRoute;
