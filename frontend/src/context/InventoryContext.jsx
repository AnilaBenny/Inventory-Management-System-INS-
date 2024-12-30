import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axiosInstance from '../AxiosConfig/AxiosConfig';
import { toast } from 'react-toastify';

// Create context
const InventoryContext = createContext();

// Action types
const ACTIONS = {
  SET_ITEMS: 'SET_ITEMS',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH: 'SET_SEARCH',
  SET_FILTER: 'SET_FILTER'
};

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
  search: '',
  filter: ''
};

// Reducer function
const inventoryReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null
      };

    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
        error: null
      };

    case ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item => 
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false,
        error: null
      };

    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false,
        error: null
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
};

// Provider component
export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Actions
  const fetchItems = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await axiosInstance.get('/items');
      dispatch({ type: ACTIONS.SET_ITEMS, payload: response.data.items});
    } catch (error) {
      console.error('Error fetching items:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to fetch inventory items' });
      toast.error('Failed to fetch inventory items.');
    }
  };

  const addItem = async (formData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await axiosInstance.post('/items', formData);
      dispatch({ type: ACTIONS.ADD_ITEM, payload: response.data.item });
      toast.success('Item added successfully!');
      return response.data;
    } catch (error) {
      console.error('Error adding item:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to add item' });
      toast.error('Failed to add item.');
      throw error;
    }
  };

  const updateItem = async (id, formData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await axiosInstance.put(`/items/${id}`, formData);
      dispatch({ type: ACTIONS.UPDATE_ITEM, payload: response.data.item });
      toast.success('Item updated successfully!');
      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to update item' });
      toast.error('Failed to update item.');
      throw error;
    }
  };

  const deleteItem = async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await axiosInstance.delete(`/items/${id}`);
      dispatch({ type: ACTIONS.DELETE_ITEM, payload: id });
      toast.success('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to delete item' });
      toast.error('Failed to delete item.');
      throw error;
    }
  };
  const getItemById = async (id) => {
    const response = await axiosInstance.get(`/items/${id}`);
    return response.data.item;
  };

  const setSearch = (searchTerm) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: searchTerm });
  };

  const setFilter = (filterTerm) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filterTerm });
  };

 
  const filteredItems = state.items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(state.search.toLowerCase()) &&
      (state.filter ? item.category.toLowerCase() === state.filter.toLowerCase() : true)
  );

  const value = {
    ...state,
    filteredItems,
    fetchItems,
    addItem,
    getItemById,
    updateItem,
    deleteItem,
    setSearch,
    setFilter
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook for using the inventory context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};