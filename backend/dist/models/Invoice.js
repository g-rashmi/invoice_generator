"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const invoiceSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ name: String, quantity: Number, rate: Number }],
    total: { type: Number, required: true },
    gst: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});
const Invoice = (0, mongoose_1.model)('Invoice', invoiceSchema);
exports.default = Invoice;
