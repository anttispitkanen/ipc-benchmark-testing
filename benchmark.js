"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is the benchmark where everything happens within the same process.
 * The comparisons should always be slower, since the algorithm and language
 * is the same, and the data transfer delay is added.
 */
const mockData_1 = require("./shared/mockData");
const TheOperation_1 = require("./shared/TheOperation");
const timestamp_1 = require("./shared/timestamp");
console.log(`Starting benchmark run: everything in one process.`);
/**
 * Do some arbitrary computation in this process before running TheOperation
 */
for (let i = 0; i < 1000000000; i++) {
    // @ts-expect-error
    const a = i * 2;
}
const startTheOperation = timestamp_1.timestamp();
const result = TheOperation_1.TheOperation(mockData_1.default);
console.log(result);
const endTheOperation = timestamp_1.timestamp();
const duration = endTheOperation - startTheOperation;
console.log(`Took ${duration} seconds`);
//# sourceMappingURL=benchmark.js.map