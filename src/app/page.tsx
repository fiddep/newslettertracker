import type { NewsLetter } from "../feature/newsLetter";
import { getFeeds } from "../feature/newsLetter";
import { DateFormat } from "./DateFormat";

const NewsLetters = async () => {
  const newsFeeds = await getFeeds();

  return (
    <>
      <h2 className="title">News Letters</h2>

      <ul className="defaultListStyle">
        {newsFeeds.map((props) => (
          <Card feed={{ ...props }} key={props.href} />
        ))}
      </ul>
    </>
  );
};

const Card = ({ feed }: { feed: NewsLetter }) => {
  const { href, title, pubDate, description } = feed;

  return (
    <li className="card">
      <h3>
        <a href={`${href}#${pubDate}`} target="_blank" rel="noopener">
          {title}
        </a>
      </h3>
      <p>{description}</p>

      <small>
        <b>Updated:</b> <DateFormat date={pubDate} />
      </small>
    </li>
  );
};

export default NewsLetters;
