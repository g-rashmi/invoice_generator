import { Schema, model } from 'mongoose';

interface IInvoice {
  user: Schema.Types.ObjectId;
  products: {
    name: string;
    quantity: number;
    rate: number;
  }[];
  total: number;
  gst: number;
  date: Date;
}

const invoiceSchema = new Schema<IInvoice>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ name: String, quantity: Number, rate: Number }],
  total: { type: Number, required: true },
  gst: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Invoice = model<IInvoice>('Invoice', invoiceSchema);
export default Invoice;
