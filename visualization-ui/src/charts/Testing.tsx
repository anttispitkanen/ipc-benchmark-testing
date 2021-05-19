import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { TStatisticsForDataTransportMethodWithComparisons } from '../../../shared/analyze';

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

type TSize = 'small' | 'medium' | 'large';

const chartCompatibleDatasets = (
  data: TStatisticsForDataTransportMethodWithComparisons[],
  mockDataSize: TSize,
) =>
  data.map((d, i) => {
    const averages = d.statisticsByMockDataSize.find(
      s => s.mockDataSize === mockDataSize,
    )?.averages;

    return {
      label: d.dataTransportMethod,
      data: [
        averages?.durationMs,
        averages?.TheOperationDurationMs,
        averages?.overheadDurationMs,
      ],
      backgroundColor: colors[i % colors.length].background,
      borderColor: colors[i % colors.length].border,
      borderWidth: 1,
    };
  });

const chartCompatibleData = (
  data: TStatisticsForDataTransportMethodWithComparisons[],
  mockDataSize: TSize,
) => ({
  labels: ['Total duration', 'TheOperation duration', 'Overhead duration'],
  datasets: chartCompatibleDatasets(data, mockDataSize),
});

const options = {
  scales: {
    y: {
      title: {
        display: true,
        text: 'Milliseconds',
      },
    },
  },
};

const MockDataSelectorButton = ({
  size,
  selectFn,
  activeSize,
}: {
  size: TSize;
  selectFn: (size: TSize) => void;
  activeSize: TSize;
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
  dataProp: TStatisticsForDataTransportMethodWithComparisons[];
}) => {
  const [mockDataSize, setMockDataSize] = useState<TSize>('medium');
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
          size={'small'}
          selectFn={setMockDataSize}
          activeSize={mockDataSize}
        />
        <MockDataSelectorButton
          size={'medium'}
          selectFn={setMockDataSize}
          activeSize={mockDataSize}
        />
        <MockDataSelectorButton
          size={'large'}
          selectFn={setMockDataSize}
          activeSize={mockDataSize}
        />
      </div>
    </>
  );
};

export default VerticalBar;
