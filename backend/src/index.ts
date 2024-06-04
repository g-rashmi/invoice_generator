import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/routee";
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
dotenv.config();
const cors = require("cors");
const app = express();
app.get("/", (req, res) => {
  return res.send("Welcome to typescript backend!");
});
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb+srv://me:kW4h2qK16NOZcEyE@cluster0.jlatybj.mongodb.net/invoice_app?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.get("/generate", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 0, // Remove the timeout limit for loading the page
    });

  
    await page.evaluate(() => {
      const downloadButton = document.querySelector('button');
      if (downloadButton) {
        downloadButton.style.display = "none";
      }
    });

    const pdf = await page.pdf({ format: "A4", printBackground: true });
    
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="invoice.pdf"',
    });

    res.send(pdf);
    console.log("done");
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF"+error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
