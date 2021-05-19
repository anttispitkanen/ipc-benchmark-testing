import { performance } from "perf_hooks";
/**
 * Use performance.now() to create timestamps that can be used
 * for logging operation times. Returns the value in milliseconds.
 *
 * Note that we are by no means actually interested in nanosecond
 * level accuracy, but simply a ballpark.
 */
export const timestamp = () => {
  return performance.now();
};
