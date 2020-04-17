import { sortByTitle, sortByRecentDate } from "./newsLetter";

describe("newsletter sortByTitle", () => {
  it("sorts array by title in descending order", () => {
    const array = [
      {
        title: "b",
      },
      {
        title: "a",
      },
    ];

    const result = sortByTitle(array);

    expect(result).toEqual([{ title: "a" }, { title: "b" }]);
  });
});

describe("newsletter sortByRecentDate", () => {
  it("sorts array by pubDate in descending order", () => {
    const array = [
      {
        pubDate: "Thu, 15 Apr 2020 00:00:00 +0000",
      },
      {
        pubDate: "Thu, 16 Apr 2020 00:00:00 +0000",
      },
    ];

    const result = sortByRecentDate(array);

    expect(result).toEqual([
      {
        pubDate: "Thu, 16 Apr 2020 00:00:00 +0000",
      },
      {
        pubDate: "Thu, 15 Apr 2020 00:00:00 +0000",
      },
    ]);
  });
});
