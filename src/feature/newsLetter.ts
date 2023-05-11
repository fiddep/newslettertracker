import Parser from "rss-parser";

export type NewsLetter = {
  title: string;
  description: string;
  href: string;
  pubDate: number;
};

export const parseNewsLetterRss = async (rssUrl) => {
  const response = await fetch(rssUrl, {
    next: { revalidate: 30 },
  });
  const rss = await response.text();

  const parser = new Parser();
  const feed = await parser.parseString(rss);

  return {
    title: feed.title,
    description: feed.description,
    href: feed.link,
    pubDate: new Date(feed.items[0].pubDate).getTime(),
  };
};

export const sortByRecentDate = (array) =>
  array.sort(
    (a, b) => toDate(b.pubDate).getTime() - toDate(a.pubDate).getTime()
  );

export const sortByTitle = (array) =>
  array.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

const toDate = (x) => new Date(x);
