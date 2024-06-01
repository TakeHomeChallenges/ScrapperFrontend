# Next.js and React.js Take Home Challenge

## Overview

This project is built using Next.js and React.js, solely utilizing JavaScript. It incorporates the UI library from AntDesign and includes functionality to scrape data from a specific URL. The project is designed to be fully responsive and uses `mockapi.io` as a free API to store log data. The main purpose of this project is to demonstrate how to scrape the latest 30 news articles from a webpage and then apply certain filters based on the content of the titles.

## Getting Started

To get started with this project, you need to clone the repository, install dependencies, and run the development server. Here are the steps:

git clone [https://github.com/TakeHomeChallenges/ScrapperFrontend.git](https://github.com/TakeHomeChallenges/ScrapperFrontend.git)

cd ScrapperFrontend

npm install

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Features

1. **Web Scraping**: Scrapes the last 30 news articles from [a designated webpage.](https://news.ycombinator.com/)
2. **Data Filtering**:
   - **Long Titles**: Filter all previous entries with more than five words in the title ordered by the number of comments first
   - **Short Titles**: Filter all previous entries with less than or equal to five words in the title ordered by points.
3. **Responsive Design**: Ensures that the application is usable on a wide range of devices.
4. **External API Usage**: Utilizes `mockapi.io` to manage and store log data, which simulates database interactions.

## Possible Improvements

- **Code Improvement**: Convert inline JSX into reusable helper functions to enhance code readability and maintainability.
- **Backend and Database**:
  - Upgrade from `mockapi.io` to a more robust SQL or NoSQL database to improve data handling and allow for more than 100 items.
- **Frontend Requests**:
  - Transition all frontend requests to use Axios for consistency and to take advantage of its features over the native `fetch` API.
- **Responsive Design Improvements**: Further refine the responsive aspects of the frontend to ensure better usability across all devices.

## How to use the log feature

- **Click on the News Scraper text**: To see the logs please click on the 'News Scraper Text' button.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
