Running Node.js CRUD benchmark for http://localhost:3000/tasks...
{"id":1}Running 10s test @ http://localhost:3000/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     4.16ms    6.83ms 129.21ms   96.40%
    Req/Sec     2.50k   494.64     4.25k    84.83%
  298679 requests in 10.05s, 59.25MB read
Requests/sec:  29731.10
Transfer/sec:      5.90MB
{"id":1}{"message":"Task 1 deleted successfully"}Completed Node.js CRUD benchmark for http://localhost:3000/tasks.
Running Bun CRUD benchmark for http://localhost:3001/tasks...
{"id":1}Running 10s test @ http://localhost:3001/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.61ms    8.84ms 150.48ms   94.87%
    Req/Sec     4.20k     1.36k    5.32k    85.42%
  502480 requests in 10.14s, 64.21MB read
Requests/sec:  49560.57
Transfer/sec:      6.33MB
{"id":1}{"message":"Task 1 deleted successfully"}Completed Bun CRUD benchmark for http://localhost:3001/tasks.
Running Node.js Fibonacci benchmark for http://localhost:3000/fibonacci/20...
Running 10s test @ http://localhost:3000/fibonacci/20
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    52.23ms  186.83ms   1.76s    95.56%
    Req/Sec   761.78    306.68     2.64k    79.28%
  84534 requests in 10.09s, 15.16MB read
Requests/sec:   8377.02
Transfer/sec:      1.50MB
Completed Node.js Fibonacci benchmark for http://localhost:3000/fibonacci/20.
Running Bun Fibonacci benchmark for http://localhost:3001/fibonacci/20...
Running 10s test @ http://localhost:3001/fibonacci/20
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.04ms    6.63ms 100.19ms   93.54%
    Req/Sec     1.34k   344.98     2.19k    83.25%
  160347 requests in 10.07s, 18.81MB read
Requests/sec:  15922.50
Transfer/sec:      1.87MB
Completed Bun Fibonacci benchmark for http://localhost:3001/fibonacci/20.
All benchmarks completed successfully.
Running Node.js CRUD benchmark for http://localhost:3000/tasks...
{"id":1}Running 10s test @ http://localhost:3000/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     4.86ms   12.24ms 349.60ms   94.93%
    Req/Sec     2.99k     0.87k    9.23k    86.45%
  356391 requests in 10.06s, 70.70MB read
Requests/sec:  35430.43
Transfer/sec:      7.03MB
{"id":1}{"message":"Task 1 deleted successfully"}Completed Node.js CRUD benchmark for http://localhost:3000/tasks.
Running Bun CRUD benchmark for http://localhost:3001/tasks...
{"id":1}Running 10s test @ http://localhost:3001/tasks
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.83ms    2.79ms  47.30ms   97.64%
    Req/Sec     5.32k   631.30     5.80k    90.75%
  635860 requests in 10.02s, 81.26MB read
Requests/sec:  63478.06
Transfer/sec:      8.11MB
{"id":1}{"message":"Task 1 deleted successfully"}Completed Bun CRUD benchmark for http://localhost:3001/tasks.
Running Node.js Fibonacci benchmark for http://localhost:3000/fibonacci/20...
Running 10s test @ http://localhost:3000/fibonacci/20
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    10.09ms   21.67ms 444.07ms   98.23%
    Req/Sec     1.02k   128.81     2.30k    92.86%
  121919 requests in 10.05s, 21.86MB read
Requests/sec:  12130.98
Transfer/sec:      2.17MB
Completed Node.js Fibonacci benchmark for http://localhost:3000/fibonacci/20.
Running Bun Fibonacci benchmark for http://localhost:3001/fibonacci/20...
Running 10s test @ http://localhost:3001/fibonacci/20
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     4.65ms    1.55ms  47.60ms   98.03%
    Req/Sec     1.75k   118.89     2.45k    92.00%
  209814 requests in 10.02s, 24.61MB read
Requests/sec:  20934.35
Transfer/sec:      2.46MB
Completed Bun Fibonacci benchmark for http://localhost:3001/fibonacci/20.
All benchmarks completed successfully.
