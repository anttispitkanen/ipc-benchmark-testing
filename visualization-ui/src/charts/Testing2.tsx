import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Analyze, MockData } from 'ipc-benchmark-testing-types';

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

// type TSize = 'small' | 'medium' | 'large';

const chartCompatibleDatasets = (
  data: Analyze.TStatisticsForDataTransportMethodWithComparisons[],
  mockDataSize: MockData.EMockDataSize,
) =>
  data.map((d, i) => {
    const averages = d.statisticsByMockDataSize.find(
      s => s.mockDataSize === mockDataSize,
    )?.averages;

    return {
      label: d.dataTransportMethod,
      data: [averages?.TheOperationDurationMs, averages?.overheadDurationMs],
      backgroundColor: colors[i % colors.length].background,
      borderColor: colors[i % colors.length].border,
      borderWidth: 1,
    };
  });

const chartCompatibleData = (
  data: Analyze.TStatisticsForDataTransportMethodWithComparisons[],
  mockDataSize: MockData.EMockDataSize,
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
  size: MockData.EMockDataSize;
  selectFn: (size: MockData.EMockDataSize) => void;
  activeSize: MockData.EMockDataSize;
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
  dataProp: Analyze.TStatisticsForDataTransportMethodWithComparisons[];
}) => {
  const [mockDataSize, setMockDataSize] = useState<MockData.EMockDataSize>(
    MockData.EMockDataSize.MEDIUM,
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
          size={MockData.EMockDataSize.SMALL}
          selectFn={setMockDataSize}
          activeSize={mockDataSize}
        />
        <MockDataSelectorButton
          size={MockData.EMockDataSize.MEDIUM}
          selectFn={setMockDataSize}
          activeSize={mockDataSize}
        />
        <MockDataSelectorButton
          size={MockData.EMockDataSize.LARGE}
          selectFn={setMockDataSize}
          activeSize={mockDataSize}
        />
      </div>
    </>
  );
};

export default VerticalBar;
