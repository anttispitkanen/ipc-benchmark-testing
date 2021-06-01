import React, { useState } from 'react';
import DurationsChart from './charts/DurationsChart';
import type { TStatisticsForIPCMethodWithComparisons } from 'ipc-benchmark-testing-types';

// Make all desired datasets available by importing here
import data_2021_05_26 from './data/2021-5-26.analyzed.publish.json';
import data_2021_05_31 from './data/2021-5-31.analyzed.publish.json';
import data_2021_06_01 from './data/2021-6-1.analyzed.publish.json';

type TDataAndDate = {
  data: TStatisticsForIPCMethodWithComparisons[];
  date: string; // like 2021-05-31
};

const availableDatasets: TDataAndDate[] = [
  {
    data: data_2021_05_26 as unknown as TStatisticsForIPCMethodWithComparisons[],
    date: '2021-05-26',
  },
  {
    data: data_2021_05_31 as unknown as TStatisticsForIPCMethodWithComparisons[],
    date: '2021-05-31',
  },
  {
    data: data_2021_06_01 as unknown as TStatisticsForIPCMethodWithComparisons[],
    date: '2021-06-01',
  },
];

function App() {
  const [selectedDataset, setSelectedDataset] = useState<TDataAndDate>(
    availableDatasets[availableDatasets.length - 1],
  );

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
        for context. See console for raw data.
      </p>

      {console.log('Here are the analyzed results:')}
      {console.log(selectedDataset.data)}

      <p>
        All tests run on Docker Desktop for Mac, Docker engine v20.10.6, at 8
        CPU and 4GB RAM.
      </p>

      <p>
        Viewing test suite run on:{' '}
        <select
          value={selectedDataset.date}
          onChange={e =>
            setSelectedDataset(
              availableDatasets.find(ad => ad.date === e.target.value)!,
            )
          }
        >
          {availableDatasets.map(ds => (
            <option>{ds.date}</option>
          ))}
        </select>
      </p>

      <DurationsChart dataProp={selectedDataset.data} />
    </div>
  );
}

export default App;
