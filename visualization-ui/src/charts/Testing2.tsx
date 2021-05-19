import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import type {
  TStatisticsForIPCMethodWithComparisons,
  EMockDataSize,
  EIPCMethod,
} from 'ipc-benchmark-testing-types';

const colors = [
  {
    background: 'rgba(255, 99, 132, 0.2)',
    border: 'rgba(255, 99, 132, 1)',
  },
  {
    background: 'rgba(54, 162, 235, 0.2)',
    border: 'rgba(54, 162, 235, 1)',
  },
  {
    background: 'rgba(255, 206, 86, 0.2)',
    border: 'rgba(255, 206, 86, 1)',
  },
  {
    background: 'rgba(75, 192, 192, 0.2)',
    border: 'rgba(75, 192, 192, 1)',
  },
  {
    background: 'rgba(153, 102, 255, 0.2)',
    border: 'rgba(153, 102, 255, 1)',
  },
  {
    background: 'rgba(255, 159, 64, 0.2)',
    border: 'rgba(255, 159, 64, 1)',
  },
];

const chartCompatibleDatasets = (
  data: TStatisticsForIPCMethodWithComparisons[],
  mockDataSize: EMockDataSize,
) =>
  data.map((d, i) => {
    const averages = d.statisticsByMockDataSize.find(
      s => s.mockDataSize === mockDataSize,
    )?.averages;

    return {
      label: d.ipcMethod,
      data: [averages?.TheOperationDurationMs, averages?.overheadDurationMs],
      backgroundColor: colors[i % colors.length].background,
      borderColor: colors[i % colors.length].border,
      borderWidth: 1,
    };
  });

const chartCompatibleData = (
  data: TStatisticsForIPCMethodWithComparisons[],
  mockDataSize: EMockDataSize,
) => ({
  labels: ['benchmark', 'http', 'http-express-axios'],
  datasets: [
    {
      label: 'TheOperation duration (ms)',
      data: data.map(
        d =>
          d.statisticsByMockDataSize.find(s => s.mockDataSize === mockDataSize)
            ?.averages.TheOperationDurationMs,
      ),
      backgroundColor: colors[0].background,
      borderColor: colors[0].border,
      borderWidth: 1,
    },
    {
      label: 'Overhead duration (ms)',
      data: data.map(
        d =>
          d.statisticsByMockDataSize.find(s => s.mockDataSize === mockDataSize)
            ?.averages.overheadDurationMs,
      ),
      backgroundColor: colors[1].background,
      borderColor: colors[1].border,
      borderWidth: 1,
    },
  ],
});

const options = {
  scales: {
    y: {
      title: {
        display: true,
        text: 'Milliseconds',
      },
      stacked: true,
    },
    x: {
      stacked: true,
    },
  },
};

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

const VerticalBar = ({
  dataProp,
}: {
  dataProp: TStatisticsForIPCMethodWithComparisons[];
}) => {
  const [mockDataSize, setMockDataSize] = useState<EMockDataSize>(
    'medium' as EMockDataSize.MEDIUM,
  );
  return (
    <>
      <div className="header">
        <h1 className="title">Vertical Bar Chart</h1>
        <div className="links"></div>
      </div>
      <Bar
        type="bar"
        width={800}
        height={500}
        data={chartCompatibleData(dataProp, mockDataSize)}
        options={options}
      />
      <div>
        <p>
          Viewing mock data size: <b>{mockDataSize}</b>
        </p>
        <MockDataSelectorButton
          size={'small' as EMockDataSize.SMALL}
          selectFn={setMockDataSize}
          activeSize={mockDataSize}
        />
        <MockDataSelectorButton
          size={'medium' as EMockDataSize.MEDIUM}
          selectFn={setMockDataSize}
          activeSize={mockDataSize}
        />
        <MockDataSelectorButton
          size={'large' as EMockDataSize.LARGE}
          selectFn={setMockDataSize}
          activeSize={mockDataSize}
        />
      </div>
    </>
  );
};

export default VerticalBar;
