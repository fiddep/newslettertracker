import React from "react";
import Head from "next/head";

const NewsLetters = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      const data = await fetch("/api").then((res) => res.json());
      setData(data);
      setIsLoading(false);
    };
    run();
  }, []);

  return (
    <>
      <h2 className="title">News Letters</h2>
      <ul className="defaultListStyle">
        {data.map((props, i) => (
          <Card item={{ ...props }} key={props.href} />
        ))}
      </ul>
    </>
  );
};

const Card = ({ item }) => {
  const { href, title, pubDate, description } = item;

  return (
    <li className="card">
      <h3>
        <a href={`${href}#${new Date(pubDate).getTime()}`}>{title}</a>
      </h3>
      <p>{description}</p>
      <small>
        <b>Updated:</b> {new Date(pubDate).toLocaleDateString("sv-se")}
      </small>
    </li>
  );
};

export default NewsLetters;
