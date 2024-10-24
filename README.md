# **API Performance Benchmark: Node.js vs. Bun**

## **Overview**
This project compares the performance of two JavaScript runtimes, **Node.js** and **Bun**, to assess their strengths and weaknesses across multiple workloads. The focus is on CRUD operations, concurrency handling, cold start times, and throughput. By benchmarking these two runtimes, the project aims to identify the optimal runtime for specific API workloads.

---

## **Project Structure**

```
benchmark-node-bun/
├── bun-api/                # Bun API implementation
│   ├── server.js
│   ├── Dockerfile
│   └── tasks.db
├── node-api/               # Node.js API implementation
│   ├── server.js
│   ├── Dockerfile
│   └── tasks.db
├── benchmarks/             # Benchmark scripts and results
│   ├── benchmark.sh
│   └── results/
│       └── benchmark-results.md
├── .github/                # CI/CD configuration
│   └── workflows/          # Workflows
│       └── benchmark.yml
└── README.md               # Main documentation (this file)
```

---

## **Requirements**

### **Functional Requirements**
- **Basic CRUD Operations:**
  - `POST /tasks`: Create a task.
  - `GET /tasks`: Retrieve tasks.
  - `PUT /tasks/:id`: Update a task.
  - `DELETE /tasks/:id`: Delete a task.

- **Cold Start Time Measurement:**
  - Measure how quickly each runtime starts and handles the first request.

- **Concurrent Load Testing:**
  - Use tools like `wrk` and `ab` to measure throughput and latency under concurrent requests.

- **Automated CI/CD Benchmarking:**
  - Automate benchmarks using **GitHub Actions** to run on every code push.

- **Consistent Environments with Docker:**
  - Ensure reproducible results by running both APIs in Docker containers.

### **Non-Functional Requirements**
- **Performance:** Handle at least 500 concurrent requests with minimal latency.
- **Scalability:** Support multi-core operations through clustering or workers.
- **Reliability:** Handle traffic spikes without downtime.
- **Reproducibility:** Ensure consistent results across multiple runs.
- **Portability:** Use Docker to maintain consistent performance across environments.

---

## **Installation and Setup**

### **Prerequisites**
- **Docker** installed on your machine.
- **Node.js** and **Bun** installed locally for development.
- **wrk** and **hyperfine** installed for benchmarking.

### **Setup Steps**

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd benchmark-node-bun
   ```

2. **Run the APIs with Docker:**
   - **Node.js API:**
     ```bash
     docker build -t node-api ./node-api
     docker run -p 3000:3000 node-api
     ```
   - **Bun API:**
     ```bash
     docker build -t bun-api ./bun-api
     docker run -p 3001:3001 bun-api
     ```

3. **Verify APIs are running:**
   - **Node.js API:**
   ```bash
   curl http://localhost:3000/tasks
   ```
   - **Bun API:**
   ```bash
   curl http://localhost:3001/tasks
   ```

---

## **Running Benchmarks**

### **Concurrent Load Testing with wrk**
```bash
wrk -t12 -c100 -d30s http://localhost:3000/tasks  # Node.js
wrk -t12 -c100 -d30s http://localhost:3001/tasks  # Bun
```

### **Throughput Testing with ab**
```bash
ab -n 10000 -c100 http://localhost:3000/tasks  # Node.js
ab -n 10000 -c100 http://localhost:3001/tasks  # Bun
```

### **Cold Start Benchmarking with hyperfine**
```bash
hyperfine "bun run ./bun-api/server.js" "node ./node-api/server.js"
```

---

## **Automated Benchmarking with CI/CD**

The project uses **GitHub Actions** to automate benchmark tests on every push.

### **GitHub Actions Workflow**

1. Benchmarks run via the `.github/workflows/benchmark.yml` file:
2. **Results are stored** in `benchmark-results.md` for tracking.

---

## **Stretch Features**

- **CPU-Intensive Task Benchmarking:** Test with `/fibonacci/:n` to measure runtime performance for CPU-bound operations.
- **Binary File Upload Benchmarking:** Measure performance under large file uploads.
- **Monitoring with Prometheus/Grafana:** Track resource usage trends.
- **Gradual Load Testing with k6:** Identify runtime bottlenecks by increasing load gradually.
- **Chaos Testing:** Test resilience under network disruptions and simulated crashes.


---

## **License**

This project is licensed under the **MIT License**. See [`LICENSE`]('LICENSE') for details.

