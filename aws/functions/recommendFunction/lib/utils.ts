import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

const settings = {
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath(),
  headless: chromium.headless,
}

const browser = await puppeteer.launch(settings);

export async function getHtmlContent(
  url: string,
  target?: string,
): Promise<string> {
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (resourceType === 'image' || resourceType === 'media' || resourceType === 'font') {
      req.abort();
    } else {
      req.continue();
    }
  });

  try {
    await page.goto(url, { waitUntil: ["load", "networkidle2"], timeout: 10_000 });

    // await autoScroll(page);

    // if (target) {
    //   await page.waitForSelector(target, { timeout: 30_000 });
    // } else {
    //   await page.waitForSelector('body', { timeout: 30_000 });
    // }

    const html = await page.content();
    return html;
  } catch (error) {
    console.error(`Error fetching HTML content: ${error}`);
    throw error;
  } finally {
    if (page) {
      await page.close();
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function autoScroll(page: any): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const delay = 100;

      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        const scrollHeight = document.body.scrollHeight;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, delay);
    });
  });
}


export function convertRatingToNumber(rating: string): number {
  const fullStars = (rating.match(/★/g) || []).length;
  const hasHalfStar = rating.includes("½");

  return fullStars + (hasHalfStar ? 0.5 : 0);
}

export function parseDateString(dateString: string): Date | undefined {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date;
  }

  // If dateString is like "12 September 2024", convert it
  const regex = /(\d+)\s+(\w+)\s+(\d{4})/;
  const match = dateString.match(regex);
  if (match) {
    const day = parseInt(match[1], 10);
    const monthName = match[2];
    const year = parseInt(match[3], 10);
    const month = new Date(`${monthName} 1, ${year}`).getMonth();
    const parsedDate = new Date(year, month, day);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return undefined;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
