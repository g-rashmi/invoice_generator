import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/routee';
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
dotenv.config();
const cors=require('cors')
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/invoice-generator';

mongoose.connect(MONGO_URI, ).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});
app.use('/api/auth', authRoutes);

app.get('/generate', async (req, res) => {
  const url = req.query.url as string;

  if (!url) {
      return res.status(400).json({ error: 'URL is required' });
  }

  try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Generate PDF
      const pdf = await page.pdf({path:'invoice.pdf',format: 'A4' });
    
      await browser.close();

      res.contentType("application/pdf");
      res.send(pdf);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
