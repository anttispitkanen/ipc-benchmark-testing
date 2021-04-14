/**
 * This is a function that simulates The Operation that could be outsourced
 * to another container and/or another language. The contents don't really
 * matter as this whole thing is more about benchmarking the different ways
 * of moving data between services.
 */
import { timestamp } from "./timestamp";
import { IMockData } from "./mockData";

type bodyWordStats = {
  word: string;
  numberOfAppearances: number;
  // Which comments the word appeared in
  sourceCommentIds: number[];
};

export interface ITheOperationResults {
  duration: number;
  commentWithShortestName: IMockData;
  commentWithLongestName: IMockData;
  topFiveWordsInBody: bodyWordStats[];
}

export const TheOperation = (
  commentsArray: IMockData[]
): Promise<ITheOperationResults> =>
  new Promise((resolve) => {
    const start = timestamp();

    const commentWithShortestName = commentsArray.sort((c1, c2) =>
      c1.name.length > c2.name.length ? 1 : -1
    )[0];

    const commentWithLongestName = commentsArray.sort((c1, c2) =>
      c1.name.length > c2.name.length ? -1 : 1
    )[0];

    // Record word appearances
    const dictionary: {
      [word: string]: {
        numberOfAppearances: number;
        sourceCommentIds: number[];
      };
    } = {} as {
      [word: string]: {
        numberOfAppearances: number;
        sourceCommentIds: number[];
      };
    };

    commentsArray.forEach((comment) => {
      comment.body
        // Strip newlines
        .replace("\n", " ")
        // This can be dumb as there are no commast, dots etc. Besides we're not actually
        // interested in the results.
        .split(" ")
        // The JSON is weirdly formatted with line breaks, so strip them off again
        .map((w) => w.replace(/\n/, " ").split(" "))
        .flat()
        .forEach((word) => {
          // If this is the first sighting of the word, add it to dictionary
          if (!dictionary[word]) {
            dictionary[word] = {
              numberOfAppearances: 1,
              sourceCommentIds: [comment.id],
            };
          } else {
            // If the word is already in dictionary, increment numberOfAppearances...
            dictionary[word].numberOfAppearances++;
            // ...and add current comment's id if not already present
            if (!dictionary[word].sourceCommentIds.includes(comment.id)) {
              dictionary[word].sourceCommentIds.push(comment.id);
            }
          }
        });
    });

    const topFiveWordsInBody = Object.keys(dictionary)
      .map((word) => ({ word, ...dictionary[word] }))
      .sort((w1, w2) =>
        w1.numberOfAppearances > w2.numberOfAppearances ? -1 : 1
      )
      .slice(0, 5);

    const end = timestamp();

    const duration = end - start;

    resolve({
      duration,
      commentWithShortestName,
      commentWithLongestName,
      topFiveWordsInBody,
    });
  });
