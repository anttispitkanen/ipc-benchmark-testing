/**
 * This is the version where the data is sent for TheOperation to process
 * in a different container using HTTP.
 */
import * as http from "http";
import mockData from "../shared/mockData";
import { timestamp } from "../shared/timestamp";

console.log(`Starting HTTP run.`);

const options: http.RequestOptions = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

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
