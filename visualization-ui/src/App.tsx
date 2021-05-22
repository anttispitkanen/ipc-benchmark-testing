import React from 'react';
import data from './data/2021-5-21.analyzed.publish.json';
import Testing2 from './charts/Testing2';
import { TStatisticsForDataTransportMethodWithComparisons } from '../../shared/analyze';

function App() {
  console.log('Here are the raw results:');
  console.log(data);

  const typedData =
    data as unknown as TStatisticsForDataTransportMethodWithComparisons[];

  console.log(typedData);

  return (
    <div className="App">
      <h1>IPC testing results</h1>

      <p>
        See{' '}
        <a
          href="https://github.com/anttispitkanen/ipc-benchmark-testing"
          target="_blank"
        >
          the repo
        </a>{' '}
        for context.
      </p>

      <p>All tests run on Docker for Mac, 1 CPU and 4 GB RAM.</p>

      <Testing2 dataProp={typedData} />
    </div>
  );
}

export default App;
