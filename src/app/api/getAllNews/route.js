import axios from "axios";
import cheerio from "cheerio";
import { NextResponse } from "next/server";
import { filterShortTitles, filterLongTitles } from "../../helpers/newsFilters";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    const response = await axios.get("https://news.ycombinator.com/");
    const html = response.data;
    const rawDataScraped = cheerio.load(html);
    console.log("rawDataScraped", rawDataScraped);

    const articles = [];

    rawDataScraped(".athing")
      .slice(0, 30)
      .each((index, element) => {
        const number = rawDataScraped(element)
          .find(".rank")
          .text()
          .replace(".", "");
        const titleElement = rawDataScraped(element).find(".titleline > a");
        const title = titleElement.text();
        const url = titleElement.attr("href");
        const points = rawDataScraped(element)
          .next()
          .find(".score")
          .text()
          .replace(" points", "");
        const commentsText = rawDataScraped(element)
          .next()
          .find("a")
          .last()
          .text();
        const comments = commentsText.includes("comment")
          ? commentsText.replace(" comments", "").replace(" comment", "")
          : "0";

        articles.push({
          number: parseInt(number, 10),
          title,
          url,
          points: parseInt(points, 10) || 0,
          comments: parseInt(comments, 10) || 0,
        });
      });

    let filteredEntries = [];
    if (type === "long-titles") {
      filteredEntries = filterLongTitles(articles);
    } else if (type === "short-titles") {
      filteredEntries = filterShortTitles(articles);
    } else {
      filteredEntries = articles;
    }

    return NextResponse.json({ articles: filteredEntries });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
