"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const puppeteer_1 = __importDefault(require("puppeteer"));
(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/');
    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    // Type into search box
    await page.type('.devsite-search-field', 'automate beyond recorder');
    // Wait and click on first result
    const searchResultSelector = '.devsite-result-item-link';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector('text/Customize and automate');
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);
    await browser.close();
})();
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new user_1.default({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'error occurred' + error });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'error :' + error });
    }
});
exports.default = router;
