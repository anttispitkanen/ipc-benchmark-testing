import React from 'react';
import { Column, Row, useTable } from 'react-table';
import { EIPCMethod } from 'ipc-benchmark-testing-types';
import { TDataRenderingProps } from '../App';

type TTableData = {
  ipcMethod: EIPCMethod;
  durationMs: number;
  durationToBenchmarkMs: number;
  durationToBenchmarkPct: number;
  TheOperationDurationMs: number;
  TheOperationDurationToBenchmarkMs: number;
  TheOperationDurationToBenchmarkPct: number;
  overheadDurationMs: number;
  overheadDurationToBenchmarkMs: number;
  overheadDurationToBenchmarkPct: number;
  overheadPercentage: number;
};

const tableDataByMockDataSize = ({
  dataProp,
  mockDataSizeProp,
}: TDataRenderingProps): TTableData[] =>
  dataProp.map(d => {
    const { averages, comparisonToBenchmark } = d.statisticsByMockDataSize.find(
      s => s.mockDataSize === mockDataSizeProp,
    )!;

    return {
      ipcMethod: d.ipcMethod,
      ...averages,
      ...comparisonToBenchmark,
    };
  });

const cellMapper = ({
  row,
  value,
  msTarget,
  pctTarget,
}: {
  row: Row<TTableData>;
  value: number;
  msTarget: keyof TTableData;
  pctTarget: keyof TTableData;
}) => {
  const isZero = row.original[msTarget] === 0;
  const isPositive = row.original[msTarget] > 0;
  return (
    <span>
      {Number(value).toFixed(0)} ms
      <br />
      {!isZero && (
        <span style={{ color: isPositive ? 'red' : 'green' }}>
          ({isPositive ? '▲' : '▼'} {Number(row.original[msTarget]).toFixed(0)}{' '}
          ms / {Number(row.original[pctTarget]).toFixed(0)} %)
        </span>
      )}
    </span>
  );
};

export default function ComparisonsTable({
  dataProp,
  mockDataSizeProp,
}: TDataRenderingProps) {
  const columns: Column<TTableData>[] = [
    {
      Header: 'IPC method',
      accessor: 'ipcMethod',
    },
    {
      Header: 'Full duration (compared to benchmark)',
      accessor: 'durationMs',
      Cell: ({ row, value }) =>
        cellMapper({
          row,
          value,
          msTarget: 'durationToBenchmarkMs',
          pctTarget: 'durationToBenchmarkPct',
        }),
    },
    {
      Header: 'TheOperation duration (compared to benchmark)',
      accessor: 'TheOperationDurationMs',
      Cell: ({ row, value }) =>
        cellMapper({
          row,
          value,
          msTarget: 'TheOperationDurationToBenchmarkMs',
          pctTarget: 'TheOperationDurationToBenchmarkPct',
        }),
    },
    {
      Header: 'Overhead duration (compared to benchmark)',
      accessor: 'overheadDurationMs',
      Cell: ({ row, value }) =>
        cellMapper({
          row,
          value,
          msTarget: 'overheadDurationToBenchmarkMs',
          pctTarget: 'overheadDurationToBenchmarkPct',
        }),
    },
    {
      Header: 'Overhead %',
      accessor: 'overheadPercentage',
      Cell: ({ value }) => <span>{Number(value).toFixed(0)}</span>,
    },
  ];

  return (
    <div>
      <h3>Durations compared</h3>
      <h4>
        Averages over {dataProp[0].statisticsByMockDataSize[0].numberOfRuns}{' '}
        concurrent runs
      </h4>
      <Table
        columns={columns}
        data={tableDataByMockDataSize({ dataProp, mockDataSizeProp })}
      />
    </div>
  );
}

function Table({
  columns,
  data,
}: {
  columns: Column<TTableData>[];
  data: TTableData[];
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<TTableData>({
      columns,
      data,
    });

  return (
    <div id="comparisons-table-wrapper">
      <table id="comparisons-table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
