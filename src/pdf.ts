import puppeteer from "puppeteer";

type ViewPageToPdfParams = {
    url: string;
    cookies: Record<string, string>;
    headers: Record<string, string>;
};
export const getPdf = async ({
    url,
    cookies,
    headers,
}: ViewPageToPdfParams) => {
    const { browser, page } = await puppeteerViewPage({
        url,
        cookies,
        headers,
    });
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

export const puppeteerViewPage = async ({
    url,
    cookies,
    headers,
}: ViewPageToPdfParams) => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: "/usr/bin/google-chrome-stable",
        args: ["--disable-dev-shm-usage"],
    });

    const page = await browser.newPage();
    const cookiesPromises: Promise<unknown>[] = [];
    for (const name in cookies) {
        if (name === "" || cookies[name] === undefined) continue;
        cookiesPromises.push(
            page.setCookie({
                name,
                value: cookies[name] ?? "",
                url,
            }),
        );
    }
    await Promise.all(cookiesPromises);
    await page.goto(url, { waitUntil: "networkidle0" });
    return { browser, page };
};
