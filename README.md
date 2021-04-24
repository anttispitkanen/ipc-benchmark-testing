# ipc-benchmark-testing

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

> This project tries out the different methods to see what kind of actual latencies appear.

To add to those, there are some completely different approaches, such as child processes and C++ addons, that are left outside the scope of this project, but something to consider if you find yourself in a similar situation.

## How this works?

Everything is written in TypeScript and run in Nodejs, as the part we are interested in is the data transfer.

This test doesn't aim to be highly generalizable, but rather very specific. Basically there is simple JSON mock data ("comments" as provided by https://jsonplaceholder.typicode.com/comments) in three different sizes:

- [`small` = 1.5K](/shared/mockData.small.json)
- [`medium` = 154K](/shared/mockData.medium.json)
- [`large` = 770K](/shared/mockData.large.json)

To simulate whatever the computationally intensive operation would be, there's ["TheOperation"](/shared/TheOperation.ts). It takes the mock data and runs some arbitrary synchronous blocking operations on it: finding out the shortest and longest comment names, and finding the top 5 most commonly used words in the comment bodies. It responds with this data, along with the time it took to process the data.

The actual test runs a "main process" script, that loads the mock data into memory, passes it to ["TheOperationInterface"](/shared/TheOperationInterface.ts), which chooses the desired data transport method based on the given environment variable. All the different methods run the same TheOperation script, the difference is in how the data is passed to TheOperation (i.e. over HTTP).

"Main process" and takes time of the whole thing. It calculates the results:

- The whole process duration including data transfer latency _and_ running TheOperation
- The duration of TheOperation
- Overhead duration = whole duration - TheOperation duration
- Overhead percentage, i.e. how many percent of the whole duration was in the overhead

"Main process" also writes the results into a file per data transport method and mock data size for further analysis and comparison.

`npm run full-test-suite` runs all the mock data size & data transport method permutations 5 times. Averages are calculated.

All the different processes are run as Nodejs Docker containers and orchestrated using `docker-compose`. At the time of writing I'm using Docker Desktop for Mac at 1 CPU and 4GB RAM.

### Benchmark

The [benchmark](/benchmark) just runs main process and TheOperation in the same process, handling all the data in memory without need to (de)serialize it. There is no real overhead in transporting the data, but whatever "overhead" is spent is the baseline that the other methods are compared to.

### Tested data transport methods

All the tested methods are run as two Nodejs containers: one for the main process and one for TheOperation. The containers are run using `docker-compose` in the default network mode (bridge). The main process container references TheOperation container by service name, when the data transport method calls for IP.

#### `ipc-http` – HTTP (Nodejs `http` library)

[`ipc-http`](/ipc-http) uses "raw" HTTP, meaning the Nodejs built-in `http` library, to transport the data between a client (main process) and a server (TheOperation). The data is serialized using JSON.

#### TODO: Implementing other data transport methods

- "Nicer HTTP", using e.g. express and axios, as one often would in Nodejs development
- Raw TCP
- UDP
- gRPC
- Unix socket

## Results and conclusions

TODO: nothing to report yet

## How to run this locally

Requirements:

- Nodejs (I'm using Nodejs 14) and npm
- Bash (only used in the loop running the whole test suite)
- Docker and docker-compose

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