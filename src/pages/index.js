import { useState, useEffect } from "react";
import path from "path";
import { parseNewsLetterRss, sortByRecentDate } from "../feature/newsLetter";
import fs from "fs";

const NewsLetters = (props) => {
  return (
    <>
      <h2 className="title">News Letters</h2>

      <ul className="defaultListStyle">
        {props.sites.map((props) => (
          <Card item={{ ...props }} key={props.href} />
        ))}
      </ul>
    </>
  );
};

const Card = ({ item }) => {
  const isMounted = useMounted();
  const { href, title, pubDate, description } = item;

  return (
    <li className="card">
      <h3>
        <a
          href={`${href}#${getTimestamp(pubDate)}`}
          target="_blank"
          rel="noopener"
        >
          {title}
        </a>
      </h3>
      <p>{description}</p>

      <small>
        <b>Updated:</b> {isMounted && formatPreferredDate(pubDate)}
      </small>
    </li>
  );
};

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "src", "data", "news-letters.json");
  const siteLinks = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const sites = await Promise.all(
    siteLinks.map(({ rss }) => parseNewsLetterRss(rss))
  ).then(sortByRecentDate);

  return {
    props: {
      sites,
    },
    revalidate: 60,
  };
}

const formatPreferredDate = (date) =>
  new Date(date).toLocaleDateString(getPreferredLanguage());

const getPreferredLanguage = () =>
  window.navigator.userLanguage || window.navigator.language;

const getTimestamp = (date) => new Date(date).getTime();

export default NewsLetters;
