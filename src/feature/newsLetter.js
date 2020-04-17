import Parser from "rss-parser";
let parser = new Parser();

export const parseNewsLetterRss = async (rss) => {
  const feed = await parser.parseURL(rss);

  return {
    title: feed.title,
    description: feed.description,
    href: feed.link,
    pubDate: feed.items[0].pubDate,
  };
};

export const sortByRecentDate = (array) =>
  array.sort((a, b) => toDate(b.pubDate) - toDate(a.pubDate));

export const sortByTitle = (array) =>
  array.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

const toDate = (x) => new Date(x);
