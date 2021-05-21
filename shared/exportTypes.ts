/**
 * This file is a hacky solution for exposing types to the visualization-ui:
 * import all types here, and export them. Then this file can be used to emit
 * the declaration file, that can then be used as a dependency in the ui.
 */
export * as Analyze from './analyze';
export * as DocumentResults from './documentResults';
export * as MainProcess from './mainProcess';
export * as MockData from './mockData';
export * as TheOperation from './TheOperation';
export * as Timestamp from './timestamp';
