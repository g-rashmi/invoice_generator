import { Schema, model } from 'mongoose';

interface IProduct {
  name: string;
  quantity: number;
  rate: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true }
});

const Product = model<IProduct>('Product', productSchema);
export default Product;
