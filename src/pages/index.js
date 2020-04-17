import React from "react";
import path from "path";
import {
  parseNewsLetterRss,
  sortByRecentDate,
  sortByTitle,
} from "../feature/newsLetter";
import fs from "fs";

const NewsLetters = (props) => {
  const [sorting, setSorting] = React.useState("latest");
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(props.sites);

  React.useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      const data = await fetch("/api").then((res) => res.json());
      setData(data);
      setIsLoading(false);
    };
    run();
  }, []);

  const sortFn = sorting === "latest" ? sortByRecentDate : sortByTitle;

  return (
    <>
      <h2 className="title">News Letters</h2>
      <ul style={{ display: "flex", listStyleType: "none" }}>
        <li onClick={() => setSorting("default")}>
          <p>Alphabetically</p>
        </li>
        <li onClick={() => setSorting("latest")}>
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
      <small>
        {isMounted && (
          <>
            <b>Updated:</b> {new Date(pubDate).toLocaleDateString("sv-se")}
          </>
        )}
      </small>
    </li>
  );
};

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

export default NewsLetters;
