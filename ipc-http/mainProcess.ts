/**
 * This is the version where the data is sent for TheOperation to process
 * in a different container using HTTP.
 */
import * as http from "http";
import { mockDataCreator } from "../shared/mockData";
import { timestamp } from "../shared/timestamp";

const {
  THE_OPERATION_ENDPOINT_HOSTNAME,
  THE_OPERATION_ENDPOINT_PORT,
} = process.env;

console.log(`Starting HTTP run.`);

const options: http.RequestOptions = {
  hostname: THE_OPERATION_ENDPOINT_HOSTNAME,
  port: THE_OPERATION_ENDPOINT_PORT,
  path: "/",
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

const mockData = mockDataCreator();

/**
 * Do a dumb wait so that the server has some time to start before
 * being invoked.
 */
setTimeout(() => {
  const start = timestamp();

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const response = JSON.parse(data);

      console.log(response);

      const end = timestamp();

      const duration = end - start;

      console.log(`Took ${duration} seconds in total`);
      console.log(
        `Took ${
          duration - response.result.duration
        } seconds excluding TheOperation in another process`
      );
    });
  });

  req.on("error", (err) => {
    console.error(err);
  });

  req.write(JSON.stringify(mockData));

  req.end();
}, 5000);
