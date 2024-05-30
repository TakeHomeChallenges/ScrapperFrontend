import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await axios.get("https://news.ycombinator.com/");
    const html = response.data;
    const rawDataScraped = cheerio.load(html);
    console.log('rawDataScraped', rawDataScraped);

    const articles = [];

    rawDataScraped(".athing")
      .slice(0, 30)
      .each((index, element) => {
        const number = rawDataScraped(element).find(".rank").text().replace(".", "");
        const title = rawDataScraped(element).find(".titleline > a").text();
        const points = rawDataScraped(element)
          .next()
          .find(".score")
          .text()
          .replace(" points", "");
        const commentsText = rawDataScraped(element).next().find("a").last().text();
        const comments = commentsText.includes("comment")
          ? commentsText.replace(" comments", "").replace(" comment", "")
          : "0";

        articles.push({
          number: parseInt(number, 10),
          title,
          points: parseInt(points, 10) || 0,
          comments: parseInt(comments, 10) || 0,
        });
      });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
