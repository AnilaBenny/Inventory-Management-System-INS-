import mongoose, { Schema, model } from 'mongoose';

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

itemSchema.index({ itemName: 1 });
itemSchema.index({ category: 1 });

const Item = mongoose.models.Item || model('Item', itemSchema);

export { Item };
