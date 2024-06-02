const puppeteer = require("puppeteer");

async function downloadPdfFromUrl(url, outputPath) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto(url, { waitUntil: "networkidle0" });

  // Generate PDF from the page content
  await page.pdf({ path: outputPath, format: "A4" });

  // Close the browser
  await browser.close();
} 