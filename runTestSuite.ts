import { spawnSync } from 'child_process';
import { EIPCMethod, EMockDataSize } from 'ipc-benchmark-testing-types';

/**
 * Run each test permutation 5 times. Randomize the order so that the host
 * machine behavior doesn't affect the results in a consistent way at least.
 *
 * Start by constructing an array where each permutation exists 5 times.
 * Then randomize that array, and run the tests from it sequentially.
 */
type TTestRunConfig = { method: EIPCMethod; mockDataSize: EMockDataSize };

const testRuns: TTestRunConfig[] = [];

Object.values(EIPCMethod).forEach(method => {
  Object.values(EMockDataSize).forEach(mockDataSize => {
    for (let i = 1; i <= 5; i++) {
      testRuns.push({ method, mockDataSize });
    }
  });
});

// https://stackoverflow.com/a/2450976
const shuffle = <T>(arr: T[]): T[] => {
  let currentIndex = arr.length;
  let randomIndex = 0;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

const shuffled = shuffle<TTestRunConfig>(testRuns);

const numberOfTestRuns = shuffled.length;

shuffled.forEach((testRun, i) => {
  console.log(
    `\nStarting test run ${i + 1} / ${numberOfTestRuns}: ${JSON.stringify(
      testRun,
    )}\n`,
  );

  spawnSync(
    `MOCK_DATA_SIZE=${testRun.mockDataSize} npm run test:${testRun.method}`,
    {
      shell: true,
      stdio: 'inherit',
    },
  );
});
