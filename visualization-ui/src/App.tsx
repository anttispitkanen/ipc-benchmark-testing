import React from 'react';
import data from './data/2021-5-19.analyzed.publish.json';
import Testing from './charts/Testing';
import Testing2 from './charts/Testing2';
import { TStatisticsForDataTransportMethodWithComparisons } from '../../shared/analyze';

function App() {
  console.log('Here are the raw results:');
  console.log(data);

  const typedData = (data as unknown) as TStatisticsForDataTransportMethodWithComparisons[];

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

      <p>All tests run on Docker for Mac, 1 CPU and 4 BG RAM.</p>

      <Testing dataProp={typedData} />

      <Testing2 dataProp={typedData} />
    </div>
  );
}

export default App;
