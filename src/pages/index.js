import React from "react";
import path from "path";
import {
  parseNewsLetterRss,
  sortByRecentDate,
  sortByTitle,
} from "../feature/newsLetter";
import fs from "fs";
import { useRouter } from "next/router";

const NewsLetters = (props) => {
  const querySort = useSearchQuery();
  const [sorting, setSorting] = React.useState(querySort);
  const [data, setData] = React.useState(props.sites);

  React.useEffect(() => {
    const run = () =>
      fetch("/api")
        .then((res) => res.json())
        .then(setData);

    run();
  }, []);

  const sortFn = sorting === "latest" ? sortByRecentDate : sortByTitle;

  return (
    <>
      <h2 className="title">News Letters</h2>
      <ul style={{ display: "flex", listStyleType: "none" }}>
        <li style={{ padding: "0 8px" }} onClick={() => setSorting("default")}>
          <p>Alphabetically</p>
        </li>
        <li style={{ padding: "0 8px" }} onClick={() => setSorting("latest")}>
          <p>Latest</p>
        </li>
      </ul>
      <ul className="defaultListStyle">
        {sortFn(data).map((props) => (
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
          href={`${href}#${new Date(pubDate).getTime()}`}
          target="_blank"
          rel="noopener"
        >
          {title}
        </a>
      </h3>
      <p>{description}</p>
      {isMounted && (
        <small>
          <b>Updated:</b> {formatPreferredDate(pubDate)}
        </small>
      )}
    </li>
  );
};

function useSearchQuery() {
  const validQueries = ["default", "latest"];
  const { query } = useRouter();
  const sort = query.sort;

  return validQueries.some((q) => q === sort) ? sort : "default";
}

function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "src", "data", "news-letters.json");
  const siteLinks = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const sites = await Promise.all(
    siteLinks.map(({ rss }) => parseNewsLetterRss(rss))
  ).then(sortByTitle);

  return {
    props: {
      sites,
    },
  };
}

const formatPreferredDate = (date) =>
  new Date(date).toLocaleDateString(getPreferredLanguage());

const getPreferredLanguage = () =>
  window.navigator.userLanguage || window.navigator.language;

export default NewsLetters;
