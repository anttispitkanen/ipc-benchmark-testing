import React, { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import type {
  TStatisticsForIPCMethodWithComparisons,
  EMockDataSize,
  EIPCMethod,
} from 'ipc-benchmark-testing-types';

// FIXME: read values from enum once typing is fixed
const ipcMethodsForLabels = [
  'benchmark',
  'http',
  'http-express-axios',
] as EIPCMethod[];

// FIXME: read values from enum once typing is fixed
const mockDataSizes = ['small', 'medium', 'large'] as EMockDataSize[];

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

const propDataToChartData = (
  propData: TStatisticsForIPCMethodWithComparisons[],
  mockDataSize: EMockDataSize,
): { TheOperationDurationMs: number[]; overheadDurationMs: number[] } => ({
  TheOperationDurationMs: propData.map(
    d =>
      d.statisticsByMockDataSize.find(s => s.mockDataSize === mockDataSize)
        ?.averages.TheOperationDurationMs || 0,
  ),
  overheadDurationMs: propData.map(
    d =>
      d.statisticsByMockDataSize.find(s => s.mockDataSize === mockDataSize)
        ?.averages.overheadDurationMs || 0,
  ),
});

const datasetsBase: {
  label: string;
  dataProperty: 'TheOperationDurationMs' | 'overheadDurationMs';
}[] = [
  {
    label: 'TheOperation duration (ms)',
    dataProperty: 'TheOperationDurationMs',
  },
  {
    label: 'Overhead duration (ms)',
    dataProperty: 'overheadDurationMs',
  },
];

const chartCompatibleData = (
  data: TStatisticsForIPCMethodWithComparisons[],
  mockDataSize: EMockDataSize,
) => {
  const chartData = propDataToChartData(data, mockDataSize);

  return {
    labels: ipcMethodsForLabels, // FIXME: read values from enum once typing is fixed
    datasets: datasetsBase.map((d, i) => ({
      label: d.label,
      data: chartData[d.dataProperty],
      backgroundColor: colors[i].background,
      borderColor: colors[i].border,
      borderWidth: 1,
    })),
  };
};

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

  const chartData = useMemo(
    () => chartCompatibleData(dataProp, mockDataSize),
    [mockDataSize],
  );

  return (
    <>
      <div className="header">
        <h1 className="title">Durations by IPC method</h1>
      </div>
      <Bar
        type="bar"
        width={800}
        height={500}
        data={chartData}
        options={options}
      />
      <div>
        <p>
          Viewing mock data size: <b>{mockDataSize}</b>
        </p>

        {mockDataSizes.map(mds => (
          <MockDataSelectorButton
            size={mds}
            selectFn={setMockDataSize}
            activeSize={mockDataSize}
          />
        ))}
      </div>
    </>
  );
};

export default VerticalBar;