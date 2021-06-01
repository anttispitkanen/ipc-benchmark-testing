import React from 'react';
import data from './data/2021-5-31.analyzed.publish.json';
import DurationsChart from './charts/DurationsChart';
import type { TStatisticsForIPCMethodWithComparisons } from 'ipc-benchmark-testing-types';

function App() {
  console.log('Here are the analyzed results:');
  console.log(data);

  const typedData = data as unknown as TStatisticsForIPCMethodWithComparisons[];

  return (
    <div className="App">
      <h1>IPC testing results</h1>

      <p>
        See{' '}
        <a
          href="https://github.com/anttispitkanen/ipc-benchmark-testing"
          target="_blank"
          rel="noreferrer noopener"
        >
          the repo
        </a>{' '}
        for context.
      </p>

      <p>
        All tests run on Docker Desktop for Mac, Docker engine v20.10.6, at 8
        CPU and 4GB RAM.
      </p>

      <p>
        Test suite run on{' '}
        <b>
          {new Date(
            typedData[0].statisticsByMockDataSize[0].runs[0].timestamp,
          ).toLocaleDateString()}
        </b>
      </p>

      <DurationsChart dataProp={typedData} />
    </div>
  );
}

export default App;
