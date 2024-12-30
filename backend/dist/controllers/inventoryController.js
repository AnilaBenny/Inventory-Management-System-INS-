"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItemById = exports.getAllItems = exports.createItem = void 0;
const Item_1 = require("../models/Item");
const createItem = async (req, res) => {
    try {
        console.log(req.body);
        const { itemName, quantity, price, description, category } = req.body;
        if (!itemName || !quantity || !price || !category) {
            return res.status(400).json({
                message: "Required fields: itemName, quantity, price, and category must be provided"
            });
        }
        if (quantity < 0 || price < 0) {
            return res.status(400).json({
                message: "Quantity and price must be positive numbers"
            });
        }
        const newItem = new Item_1.Item({
            itemName,
            quantity,
            price,
            description,
            category,
        });
        const savedItem = await newItem.save();
        res.status(201).json({
            message: 'Item successfully created',
            item: savedItem,
        });
    }
    catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
exports.createItem = createItem;
const getAllItems = async (req, res) => {
    try {
        const items = await Item_1.Item.find();
        if (items.length === 0) {
            return res.status(200).json({
                message: 'No items in inventory',
                items: []
            });
        }
        res.status(200).json({
            message: 'Items retrieved successfully',
            items
        });
    }
    catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
exports.getAllItems = getAllItems;
const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item_1.Item.findById(id);
        if (!item) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }
        res.status(200).json({
            message: 'Item retrieved successfully',
            item
        });
    }
    catch (error) {
        console.error('Error retrieving item:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
exports.getItemById = getItemById;
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, quantity, price, description, category } = req.body;
        const existingItem = await Item_1.Item.findById(id);
        if (!existingItem) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }
        if (quantity !== undefined && quantity < 0) {
            return res.status(400).json({
                message: "Quantity must be a positive number"
            });
        }
        if (price !== undefined && price < 0) {
            return res.status(400).json({
                message: "Price must be a positive number"
            });
        }
        existingItem.itemName = itemName || existingItem.itemName;
        existingItem.quantity = quantity !== null && quantity !== void 0 ? quantity : existingItem.quantity;
        existingItem.price = price !== null && price !== void 0 ? price : existingItem.price;
        existingItem.description = description || existingItem.description;
        existingItem.category = category || existingItem.category;
        const updatedItem = await existingItem.save();
        res.status(200).json({
            message: 'Item successfully updated',
            item: updatedItem,
        });
    }
    catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item_1.Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }
        res.status(200).json({
            message: 'Item deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
exports.deleteItem = deleteItem;
