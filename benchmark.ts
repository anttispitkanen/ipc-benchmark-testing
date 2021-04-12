/**
 * This is the benchmark where everything happens within the same process.
 * The comparisons should always be slower, since the algorithm and language
 * is the same, and the data transfer delay is added.
 */
import { mockDataCreator } from "./shared/mockData";
import { TheOperation } from "./shared/TheOperation";
import { timestamp } from "./shared/timestamp";

console.log(`Starting benchmark run: everything in one process.`);

const mockData = mockDataCreator();

/**
 * Do some arbitrary computation in this process before running TheOperation
 */
for (let i = 0; i < 1000000000; i++) {
  // @ts-expect-error
  const a = i * 2;
}

const start = timestamp();

const result = TheOperation(mockData);

console.log(result);

const end = timestamp();

const duration = end - start;

console.log(`Took ${duration} seconds in total`);
console.log(
  `Took ${duration - result.duration} seconds excluding TheOperation`
);
