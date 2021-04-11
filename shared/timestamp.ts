/**
 * Use process.hrtime() to create timestamps that can be used
 * for logging operation times, such as monitoring how long a
 * network call takes. Returns the value in seconds.
 *
 * Note that we are by no means actually interested in nanosecond
 * level accuracy, but simply a ballpark.
 */
export const timestamp = () => {
  const [seconds, nanoseconds] = process.hrtime();
  // divide nanoseconds by a billion => conversion to seconds
  return seconds + nanoseconds / 1000000000;
};
