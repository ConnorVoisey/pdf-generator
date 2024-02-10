const puppeteer = require("puppeteer");
const fs = require("fs");

async function printPdf() {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto("https://shgrid.dev", { waitUntil: "networkidle0" });
	const pdf = await page.pdf({ format: "A4" });

	await browser.close();
	fs.writeFileSync("example.pdf", pdf);
	console.log({ pdf });
	return pdf;
}

printPdf();
