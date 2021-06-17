import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  TStatisticsForIPCMethodWithComparisons,
  EMockDataSize,
  EIPCMethod,
} from 'ipc-benchmark-testing-types';
import { TDataRenderingProps } from '../App';

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
  /**
   * Not all methods that exist have data. This is because the methods are
   * implemented one at a time, and when new EIPCMethods are added to the type,
   * they aren't added to the old datasets.
   */
  const IPC_METHODS_WITH_DATA: EIPCMethod[] = Object.values(EIPCMethod).filter(
    method => data.some(d => d.ipcMethod === method),
  );

  const chartData = propDataToChartData(data, mockDataSize);

  return {
    labels: IPC_METHODS_WITH_DATA,
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

const VerticalBar = ({ dataProp, mockDataSizeProp }: TDataRenderingProps) => {
  const chartData = chartCompatibleData(dataProp, mockDataSizeProp);

  return (
    <div id="durations-chart">
      <h3>Durations by IPC method</h3>

      <Bar
        type="bar"
        width={800}
        height={500}
        data={chartData}
        options={options}
      />

      <p>
        <i>
          <b>Tip:</b> click dataset name to hide it from the chart, and hover
          for tooltips.
        </i>
      </p>

      <p>
        <b>TheOperation duration</b> describes how many milliseconds it took to
        run{' '}
        <a href="https://github.com/anttispitkanen/ipc-benchmark-testing/blob/main/shared/TheOperation.ts">
          TheOperation
        </a>{' '}
        for the given mock data size. The timing starts only when inside the
        function, so the IPC method doesn't affect its running time.
      </p>

      <p>
        <b>Overhead duration</b> describes how many milliseconds it took to pass
        the data from{' '}
        <a href="https://github.com/anttispitkanen/ipc-benchmark-testing/blob/main/shared/mainProcess.ts">
          mainProcess
        </a>{' '}
        to TheOperation and back, excluding the time that running TheOperation
        took. So basically it shows the cost of serializing the data and passing
        it back and forth between the containers (or just between the two
        functions in benchmark's case).
      </p>
    </div>
  );
};

export default VerticalBar;
