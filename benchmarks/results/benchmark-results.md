Running wrk for Node.js API...
Running 10s test @ http://localhost:3000/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.34ms   18.83ms 403.38ms   98.33%
    Req/Sec     1.48k   187.80     2.54k    92.62%
  176039 requests in 10.02s, 39.45MB read
Requests/sec:  17561.94
Transfer/sec:      3.94MB
Running wrk for Bun API...
Running 10s test @ http://localhost:3001/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.19ms  369.12us  14.98ms   96.72%
    Req/Sec     6.79k     1.05k   31.01k    98.00%
  813317 requests in 10.10s, 90.75MB read
Requests/sec:  80525.22
Transfer/sec:      8.98MB
Benchmarks completed successfully.
Running Node.js benchmark for http://localhost:3000/tasks...
{"id":1}Running 10s test @ http://localhost:3000/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.65ms   11.96ms 308.47ms   99.10%
    Req/Sec     1.40k   116.59     2.77k    96.07%
  167174 requests in 10.02s, 42.89MB read
Requests/sec:  16677.83
Transfer/sec:      4.28MB
{"id":1}Completed Node.js benchmark for http://localhost:3000/tasks.
Running Bun benchmark for http://localhost:3001/tasks...
{"id":1}Running 10s test @ http://localhost:3001/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.19ms  206.68us   7.84ms   92.30%
    Req/Sec     6.72k   775.12    21.66k    98.01%
  804598 requests in 10.10s, 108.96MB read
Requests/sec:  79662.62
Transfer/sec:     10.79MB
Not foundNot foundCompleted Bun benchmark for http://localhost:3001/tasks.
Benchmarks completed successfully.
Running Node.js benchmark for http://localhost:3000/tasks...
{"id":1}Running 10s test @ http://localhost:3000/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.69ms   12.28ms 315.10ms   99.06%
    Req/Sec     1.40k   125.81     2.47k    97.16%
  167035 requests in 10.02s, 42.85MB read
Requests/sec:  16671.05
Transfer/sec:      4.28MB
{"id":1}Completed Node.js benchmark for http://localhost:3000/tasks.
Running Bun benchmark for http://localhost:3001/tasks...
{"id":2}Running 10s test @ http://localhost:3001/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.24ms  755.07us  29.04ms   97.70%
    Req/Sec     6.65k   600.49    14.11k    93.03%
  798563 requests in 10.10s, 127.18MB read
Requests/sec:  79030.06
Transfer/sec:     12.59MB
Not foundNot foundCompleted Bun benchmark for http://localhost:3001/tasks.
Benchmarks completed successfully.
