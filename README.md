# ipc-benchmark-testing

[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)

**See the results visualized at https://anttispitkanen.github.io/ipc-benchmark-testing/**

## tl;dr:

This is a project that compares the latency cost of different methods of transferring data between two containers in the same loopback network interface, i.e. without having to worry about network latency. [See Wikipedia on inter-process communication (IPC).](https://en.wikipedia.org/wiki/Inter-process_communication)

## Background

The idea came from a random thought at work one day. We have lots of microservices written in Nodejs (running in containers), which is highly performant under lots of incoming connections (non-blocking I/O), but suffers when blocking CPU-intensive operations take place – think heavy parsing or data processing for example. In such cases the event loop gets blocked and throughput suffers. See good and bad use cases for Nodejs in https://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js.

So let's say that we can identify a performance bottleneck in a blocking synchronous operation in our service. My original question was about if it would make sense to offload that work onto another (sidecar) container – written in a more performant data processing language – within the same Kubernetes pod, ECS task or similar container grouping, transporting the data over HTTP REST between the two containers? In these examples the two containers share the same loopback network interface, so the data doesn't travel over the network, but it would have to traverse the Linux network stack. This is obviously slower than handling the data in RAM, but **_how much slower?_**

## Hints and tips shared

I started asking around inside my company (https://github.com/futurice) and an open Finnish developer community (https://github.com/koodiklinikka) for insights. Several important insights came up:

- Traversing the network stack is a non-trivial latency cost
- Data serialization and deserialization are things to take into account
- Instead of REST, JSON and HTTP/1.1, one could consider e.g. **gRPC**, protobuffs and HTTP/2
- Instead of HTTP one could consider raw **TCP**, or perhaps even more performant, **UDP**
- Instead of those, one could consider using **Unix sockets**
- Instead of those, one could consider using **shared memory**

**This project tries out the different methods to see what kind of actual latencies appear.**

To add to those, there are some completely different approaches, such as child processes and C++ addons, that are left outside the scope of this project, but something to consider if you find yourself in a similar situation.

## How this works?

Everything is written in TypeScript and run in Nodejs, as the part we are interested in is the data transfer.

This test doesn't aim to be highly generalizable, but rather very specific. Basically there is simple JSON mock data ("comments" as provided by https://jsonplaceholder.typicode.com/comments) in three different sizes:

- [`small` = 1.5K](/shared/mockData.small.json)
- [`medium` = 154K](/shared/mockData.medium.json)
- [`large` = 770K](/shared/mockData.large.json)

To simulate whatever the computationally intensive operation would be, there's ["TheOperation"](/shared/TheOperation.ts). It takes the mock data and runs some arbitrary synchronous blocking operations on it: finding out the shortest and longest comment names, and finding the top 5 most commonly used words in the comment bodies. It responds with this data, along with the time it took to process the data.

The actual test runs a "main process" script, that loads the mock data into memory and passes it to "TheOperation" with the desired data transport method given as a dependency injection. All the different methods run the same TheOperation script, the difference is in how the data is passed to TheOperation (i.e. over HTTP).

"Main process" runs and takes time of the whole thing. It calculates the results:

- The whole process duration including data transfer latency _and_ running TheOperation
- The duration of TheOperation
- Overhead duration = whole duration - TheOperation duration
- Overhead percentage, i.e. how many percent of the whole duration was in the overhead

"Main process" also writes the results into a file per data transport method and mock data size for further analysis and comparison.

`npm run full-test-suite` runs all the mock data size & data transport method permutations 5 times. Averages are calculated. Results are saved in a file named `<date>.raw.json`.

There's a separate [analysis script](/shared/analyze.ts) that takes the raw data file as input, and adds the analysis, i.e. comparing the results to the benchmark. Analyzed results are saved in a file named `<date>.analyzed.json`.

By default the results are .gitignored, with the exception of naming them explicitly as `<something>.publish.json`. See example of raw results and analyzed results in [results directory](/results).

All the different processes are run as Nodejs Docker containers and orchestrated using `docker compose`. At the time of writing I'm using a **MacBook Air M1 2020 16 GB**, Docker Desktop for Mac, and Docker engine `v20.10.7`, at **4 CPU**, **2 GB RAM** and **1 GB Swap**.

### Benchmark

The [benchmark](/ipc-methods/benchmark) just runs main process and TheOperation in the same process, handling all the data in memory without need to (de)serialize it. There is no real overhead in transporting the data, but whatever "overhead" is spent is the baseline that the other methods are compared to.

### Tested data transport methods

All the tested methods are run as two Nodejs containers: one for the main process and one for TheOperation. The containers are run using `docker compose` in the default network mode (bridge). The main process container references TheOperation container by service name, when the data transport method calls for IP.

#### `tcp` – Nodejs `net` library

[`tcp`](/ipc-methods/tcp) uses TCP with the Nodejs built-in `net` library, to transport the data between a client and a server running TheOperation. The data is serialized using JSON, with a custom delimiter character set.

#### `http` – Nodejs `http` library

[`http`](/ipc-methods/http) uses "raw" HTTP, meaning the Nodejs built-in `http` library, to transport the data between a client and a server running TheOperation. The data is serialized using JSON.

#### `http-express-axios` – HTTP using Express and Axios

[`http-express-axios`](/ipc-methods/http-express-axios) uses the commonly used Nodejs HTTP server [Express](https://github.com/expressjs/express) and the commonly used Nodejs HTTP client [Axios](https://github.com/axios/axios). Data is serialized as JSON, and the parsing and serializing is handled by the libraries under the hood.

#### Implementing data transport methods and such

See https://github.com/anttispitkanen/ipc-benchmark-testing/projects/1 for ideas and their status.

- [x] "Raw HTTP" ([`http`](/ipc-methods/http)) using the Nodejs native `http` module
- [x] "Nicer HTTP" using express and axios ([`http-express-axios`](/ipc-methods/http-express-axios)), as one often would in Nodejs development
- [x] TCP
- [ ] UDP
- [ ] gRPC
- [ ] Unix socket
- [ ] Build a web UI for viewing and comparing results

## Results and conclusions

See the visualized results at https://anttispitkanen.github.io/ipc-benchmark-testing/

## How to run this locally

Requirements:

- Nodejs (I'm using Nodejs 14) and npm
- Bash (only used in the loop running the whole test suite)
- Docker (engine version `v20.10.6` is what I'm using) and docker compose, so Docker Desktop version `>= 3.2.1`

1. Clone this repo and change into it

```
git clone git@github.com:anttispitkanen/ipc-benchmark-testing.git
cd ipc-benchmark-testing
```

2. Install the dependencies

```
npm install
```

3. Run the test suite (includes transpiling TypeScript to JavaScript first)

```
npm run full-test-suite
```
