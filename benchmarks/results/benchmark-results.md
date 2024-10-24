Running wrk for Node.js API...
Running 10s test @ http://localhost:3000/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    14.90ms   15.78ms 348.05ms   98.75%
    Req/Sec   592.92     93.08   810.00     75.54%
  70630 requests in 10.03s, 15.83MB read
Requests/sec:   7044.60
Transfer/sec:      1.58MB
Running wrk for Bun API...
Running 10s test @ http://localhost:3001/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.18ms    1.69ms  40.36ms   94.05%
    Req/Sec     3.89k     1.09k   17.10k    78.95%
  465017 requests in 10.10s, 51.89MB read
Requests/sec:  46042.44
Transfer/sec:      5.14MB
Benchmarks completed successfully.
