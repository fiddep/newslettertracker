import "isomorphic-unfetch";
import { parseNewsLetterRss } from "../../feature/newsLetter";
import newsletters from "../../data/news-letters.json";

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const withCdnCache = (ttl = 1) => (handler) => (req, res) => {
  const previous = res.getHeader("Cache-Control");
  const header = `s-maxage=${ttl}, stale-while-revalidate`;
  const value = previous ? `${previous}, ${header}` : header;

  res.setHeader("Cache-Control", value);

  return handler(req, res);
};

const withContentJson = () => (handler) => (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return handler(req, res);
};

const controller = async (req, res) => {
  if (req.method === "GET") {
    const promises = newsletters.map((site) => parseNewsLetterRss(site.rss));

    const resolvedData = await Promise.all(promises);

    res.statusCode = 200;
    res.end(JSON.stringify(resolvedData));
  }
};

export default compose(withCdnCache(120), withContentJson())(controller);
