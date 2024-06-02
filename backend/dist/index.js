"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routee_1 = __importDefault(require("./routes/routee"));
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
dotenv_1.default.config();
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/invoice-generator';
mongoose_1.default.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});
app.use('/api/auth', routee_1.default);
app.get('/generate', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        // Generate PDF
        const pdf = await page.pdf({ path: 'invoice.pdf', format: 'A4' });
        await browser.close();
        res.contentType("application/pdf");
        res.send(pdf);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
