import React, { useState } from 'react';
import DurationsChart from './charts/DurationsChart';
import {
  TStatisticsForIPCMethodWithComparisons,
  EMockDataSize,
} from 'ipc-benchmark-testing-types';

// Make all desired datasets available by importing here
import data_2021_06_09 from './data/2021-6-9.analyzed.publish.json';
import data_2021_06_10 from './data/2021-6-10.analyzed.publish.json';
import data_2021_06_13 from './data/2021-6-13.analyzed.publish.json';
import data_2021_06_14 from './data/2021-6-14.analyzed.publish.json';

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
  {
    data: data_2021_06_13 as unknown as TStatisticsForIPCMethodWithComparisons[],
    date: '2021-06-13',
  },
  {
    data: data_2021_06_14 as unknown as TStatisticsForIPCMethodWithComparisons[],
    date: '2021-06-14',
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
        <header>
          <h1>IPC method latency testing</h1>
          <p>
            By <a href="https://github.com/anttispitkanen">@anttispitkanen</a>
          </p>
        </header>

        <div className="main-content">
          <section>
            <p>
              This is{' '}
              <a href="https://github.com/anttispitkanen/ipc-benchmark-testing">
                a project
              </a>{' '}
              that compares the latency cost of different methods of
              transferring data between two containers in the same loopback
              network interface, like a Kubernetes pod or ECS task, i.e. without
              having to worry about network latency.{' '}
              <a
                href="https://en.wikipedia.org/wiki/Inter-process_communication"
                target="_blank"
                rel="noreferrer noopener"
              >
                See Wikipedia on inter-process communication (IPC)
              </a>
              .
            </p>

            <p>
              See{' '}
              <a href="https://github.com/anttispitkanen/ipc-benchmark-testing">
                the repo
              </a>{' '}
              for more information on how this works and how to run the tests
              yourself.
            </p>

            <p>See console for raw data.</p>

            {console.log('Here are the analyzed results:')}
            {console.log(selectedDataset.data)}

            <p>
              All tests run on MacBook Air M1 2020 16 GB, Docker Desktop for
              Mac, Docker engine{' '}
              <span className="monospace-highlight">v20.10.7</span>, at settings
              of <span className="monospace-highlight">4 CPU</span>,{' '}
              <span className="monospace-highlight">2 GB RAM</span> and{' '}
              <span className="monospace-highlight">1 GB Swap</span>.
            </p>
          </section>

          <hr />

          <section>
            <h2>How this works</h2>

            <p>
              This test doesn't aim to be highly generalizable, but rather very
              specific. Basically there is simple JSON mock data ("comments" as
              provided by{' '}
              <a href="https://jsonplaceholder.typicode.com/comments">
                JSONPlaceholder
              </a>
              ) in three different sizes:
            </p>

            <ul>
              <li>small = 1.5K</li>
              <li>medium = 154K</li>
              <li>large = 770K</li>
            </ul>

            <p>
              To simulate whatever the computationally intensive operation would
              be, there's{' '}
              <a href="https://github.com/anttispitkanen/ipc-benchmark-testing/blob/main/shared/TheOperation.ts">
                "TheOperation"
              </a>
              . It takes the mock data and runs some arbitrary synchronous
              blocking operations on it: finding out the shortest and longest
              comment names, and finding the top 5 most commonly used words in
              the comment bodies. It responds with this data, along with the
              time it took to process the data.
            </p>
            <p>
              The actual test runs a{' '}
              <a href="https://github.com/anttispitkanen/ipc-benchmark-testing/blob/main/shared/mainProcess.ts">
                "main process"
              </a>{' '}
              script, that loads the mock data into memory and passes it to
              "TheOperation" with the desired data transport method given as a
              dependency injection. All the different methods run the same
              TheOperation script, the difference is in how the data is passed
              to TheOperation (i.e. over HTTP).
            </p>
            <p>
              "Main process" runs and takes time of the whole thing. It
              calculates the results:
            </p>
            <ul>
              <li>
                The whole process duration including data transfer latency and
                running TheOperation
              </li>
              <li>The duration of TheOperation</li>
              <li>
                Overhead duration = whole duration - TheOperation duration
              </li>{' '}
              <li>
                Overhead percentage, i.e. how many percent of the whole duration
                was in the overhead
              </li>
            </ul>
          </section>

          <hr />

          <section>
            <h2>Tested IPC methods</h2>

            <p>
              <a href="https://github.com/anttispitkanen/ipc-benchmark-testing/tree/main/ipc-methods/benchmark">
                <b>benchmark</b>
              </a>{' '}
              just runs main process and TheOperation in the same process,
              handling all the data in memory without need to (de)serialize it.
              There is no real overhead in transporting the data, but whatever
              "overhead" is spent is the baseline that the other methods are
              compared to.
            </p>

            <p>
              <a href="https://github.com/anttispitkanen/ipc-benchmark-testing/tree/main/ipc-methods/unix-socket">
                <b>unix-socket</b>
              </a>{' '}
              uses the Nodejs built-in `net` library over a Unix socket to
              transport the data between a client and a server running
              TheOperation. The data is serialized using JSON, with a custom
              delimiter character set. The Unix socket file is shared to both
              containers using a named Docker Volume in the compose file.
            </p>

            <p>
              <a href="https://github.com/anttispitkanen/ipc-benchmark-testing/tree/main/ipc-methods/tcp">
                <b>tcp</b>
              </a>{' '}
              uses TCP with the Nodejs built-in{' '}
              <span className="monospace-highlight">net</span> library, to
              transport the data between a client running main process and a
              server running TheOperation. The data is serialized using JSON
              with a custom delimiter character set.
            </p>

            <p>
              <a href="https://github.com/anttispitkanen/ipc-benchmark-testing/tree/main/ipc-methods/http">
                <b>http</b>
              </a>{' '}
              uses "raw" HTTP, meaning the Nodejs built-in{' '}
              <span className="monospace-highlight">http</span> library, to
              transport the data between a client running main process and a
              server running TheOperation. The data is serialized using JSON.
            </p>

            <p>
              <a href="https://github.com/anttispitkanen/ipc-benchmark-testing/tree/main/ipc-methods/http-express-axios">
                <b>http-express-axios</b>
              </a>{' '}
              uses the commonly used Nodejs HTTP server Express and the commonly
              used Nodejs HTTP client Axios. Data is serialized as JSON, and the
              parsing and serializing is handled by the libraries under the
              hood.
            </p>
          </section>

          <hr />

          <section>
            <h2>Results</h2>

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
          </section>
        </div>
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
    <span>
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
          <option key={ds.date}>{ds.date}</option>
        ))}
      </select>
    </span>

    <span>
      Viewing mock data size: <b>{selectedMockDataSize}</b>
    </span>

    <span>
      {Object.values(EMockDataSize).map(mds => (
        <MockDataSelectorButton
          key={mds}
          size={mds}
          selectFn={setSelectedMockDataSize}
          activeSize={selectedMockDataSize}
        />
      ))}
    </span>
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
