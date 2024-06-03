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
app.use(cors());
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/invoice-generator';
mongoose_1.default.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});
app.use('/api/auth', routee_1.default);
app.get("/generate", async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send("URL is required");
    }
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: ['networkidle0', 'domcontentloaded'],
            timeout: 0, // Remove the timeout limit for loading the page
        });
        // Remove the download button before generating the PDF
        await page.evaluate(() => {
            const downloadButton = document.querySelector('button');
            if (downloadButton) {
                downloadButton.style.display = 'none';
            }
        });
        const pdf = await page.pdf({ format: "A4", printBackground: true });
        await browser.close();
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="invoice.pdf"',
        });
        res.send(pdf);
    }
    catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error generating PDF");
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
