/**
 * This is the benchmark where everything happens within the same process.
 * The comparisons should always be slower, since the algorithm and language
 * is the same, and the data transfer delay is added.
 */
import mockData from "./shared/mockData";
import { TheOperation } from "./shared/TheOperation";
import { timestamp } from "./shared/timestamp";

console.log(`Starting benchmark run: everything in one process.`);

/**
 * Do some arbitrary computation in this process before running TheOperation
 */
for (let i = 0; i < 1000000000; i++) {
  // @ts-expect-error
  const a = i * 2;
}

const startTheOperation = timestamp();

const result = TheOperation(mockData);

console.log(result);

const endTheOperation = timestamp();

const duration = endTheOperation - startTheOperation;

console.log(`Took ${duration} seconds`);
