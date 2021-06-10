import React, { useState } from 'react';
import DurationsChart from './charts/DurationsChart';
import {
  TStatisticsForIPCMethodWithComparisons,
  EMockDataSize,
} from 'ipc-benchmark-testing-types';

// Make all desired datasets available by importing here
import data_2021_06_09 from './data/2021-6-9.analyzed.publish.json';
import data_2021_06_10 from './data/2021-6-10.analyzed.publish.json';

type TDataAndDate = {
  data: TStatisticsForIPCMethodWithComparisons[];
  date: string; // like 2021-05-31
};

const availableDatasets: TDataAndDate[] = [
  {
    data: data_2021_06_09 as unknown as TStatisticsForIPCMethodWithComparisons[],
    date: '2021-06-09',
  },
  {
    data: data_2021_06_10 as unknown as TStatisticsForIPCMethodWithComparisons[],
    date: '2021-06-10',
  },
];

function App() {
  const [selectedDataset, setSelectedDataset] = useState<TDataAndDate>(
    availableDatasets[availableDatasets.length - 1],
  );

  const [selectedMockDataSize, setSelectedMockDataSize] =
    useState<EMockDataSize>('medium' as EMockDataSize.MEDIUM);

  return (
    <div className="App-wrapper">
      <div className="App">
        <h1>IPC testing results</h1>

        <div className="intro">
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
            All tests run on MacBook Air M1 2020 16 GB, Docker Desktop for Mac,
            Docker engine <span className="monospace-highlight">v20.10.7</span>,
            at settings of <span className="monospace-highlight">4 CPU</span>,{' '}
            <span className="monospace-highlight">2 GB RAM</span> and{' '}
            <span className="monospace-highlight">1 GB Swap</span>.
          </p>

          <hr />
        </div>

        <OptionsSelectors
          selectedDataset={selectedDataset}
          setSelectedDataset={setSelectedDataset}
          selectedMockDataSize={selectedMockDataSize}
          setSelectedMockDataSize={setSelectedMockDataSize}
        />

        <DurationsChart
          dataProp={selectedDataset.data}
          mockDataSizeProp={selectedMockDataSize}
        />

        <OptionsSelectors
          selectedDataset={selectedDataset}
          setSelectedDataset={setSelectedDataset}
          selectedMockDataSize={selectedMockDataSize}
          setSelectedMockDataSize={setSelectedMockDataSize}
        />
      </div>
    </div>
  );
}

export default App;

const OptionsSelectors = ({
  selectedDataset,
  setSelectedDataset,
  selectedMockDataSize,
  setSelectedMockDataSize,
}: {
  selectedDataset: TDataAndDate;
  setSelectedDataset: (dataset: TDataAndDate) => void;
  selectedMockDataSize: EMockDataSize;
  setSelectedMockDataSize: (mockDataSize: EMockDataSize) => void;
}) => (
  <div className="options-selectors">
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

    <p>
      Viewing mock data size: <b>{selectedMockDataSize}</b>
    </p>

    {Object.values(EMockDataSize).map(mds => (
      <MockDataSelectorButton
        size={mds}
        selectFn={setSelectedMockDataSize}
        activeSize={selectedMockDataSize}
      />
    ))}
  </div>
);

const MockDataSelectorButton = ({
  size,
  selectFn,
  activeSize,
}: {
  size: EMockDataSize;
  selectFn: (size: EMockDataSize) => void;
  activeSize: EMockDataSize;
}) => (
  <button
    style={{ margin: '5px' }}
    disabled={size === activeSize}
    onClick={() => selectFn(size)}
  >
    {size}
  </button>
);
