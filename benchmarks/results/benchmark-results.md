Running wrk for Node.js API...
Running 10s test @ http://localhost:3000/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    16.77ms   20.74ms 410.65ms   97.05%
    Req/Sec   554.50     98.41   690.00     90.13%
  66155 requests in 10.03s, 16.66MB read
Requests/sec:   6598.76
Transfer/sec:      1.66MB
Running wrk for Bun API...
Running 10s test @ http://localhost:3001/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.01ms    3.94ms  82.01ms   97.94%
    Req/Sec     2.97k     1.09k   20.82k    75.94%
  354939 requests in 10.10s, 39.60MB read
Requests/sec:  35142.69
Transfer/sec:      3.92MB
Benchmarks completed successfully.
