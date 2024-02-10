import puppeteer from "puppeteer";

export const getPdf = async (url: string) => {
	const browser = await puppeteer.launch({
		headless: true,
		executablePath: "/usr/bin/google-chrome-stable",
		args: ["--disable-dev-shm-usage"],
	});

	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "networkidle0" });
	const pdfBuffer = await page.pdf({
		format: "A4",
		printBackground: true,
		omitBackground: true,
		displayHeaderFooter: false,
	});
	const blob = new Blob([pdfBuffer]);
	const stream = blob.stream();

	await browser.close();
	return stream;
};
