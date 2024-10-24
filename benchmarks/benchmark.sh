#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Configuration
NODE_API="http://localhost:3000"
BUN_API="http://localhost:3001"
LOG_DIR="./benchmarks/results"

# Create results directory if it doesn't exist
mkdir -p $LOG_DIR

# Function to log results with wrk and curl
run_benchmark() {
  local API_URL=$1
  local METHOD=$2

  echo "Running $METHOD CRUD benchmark for $API_URL/tasks..." | tee -a $LOG_DIR/benchmark-results.md

  # POST: Create a new task
  curl -X POST -H "Content-Type: application/json" -d '{"name": "Benchmark Task"}' "$API_URL/tasks" | tee -a $LOG_DIR/benchmark-results.md

  # Use wrk to simulate high traffic for GET /tasks
  wrk -t12 -c100 -d10s "$API_URL/tasks" | tee -a $LOG_DIR/benchmark-results.md

  # PATCH: Update task with id 1
  curl -X PATCH -H "Content-Type: application/json" -d '{"name": "Updated Task"}' "$API_URL/tasks/1" | tee -a $LOG_DIR/benchmark-results.md

  # DELETE: Delete task with id 1
  curl -X DELETE "$API_URL/tasks/1" | tee -a $LOG_DIR/benchmark-results.md

  echo "Completed $METHOD CRUD benchmark for $API_URL/tasks." | tee -a $LOG_DIR/benchmark-results.md
}

# Function to benchmark the Fibonacci endpoint
run_fibonacci_benchmark() {
  local API_URL=$1
  local METHOD=$2

  echo "Running $METHOD Fibonacci benchmark for $API_URL/fibonacci/20..." | tee -a $LOG_DIR/benchmark-results.md

  # Use wrk to test Fibonacci endpoint (n=20)
  wrk -t12 -c100 -d10s "$API_URL/fibonacci/20" | tee -a $LOG_DIR/benchmark-results.md

  echo "Completed $METHOD Fibonacci benchmark for $API_URL/fibonacci/20." | tee -a $LOG_DIR/benchmark-results.md
}

# Run CRUD benchmarks for Node.js and Bun APIs
run_benchmark "$NODE_API" "Node.js"
run_benchmark "$BUN_API" "Bun"

# Run Fibonacci benchmarks for Node.js and Bun APIs
run_fibonacci_benchmark "$NODE_API" "Node.js"
run_fibonacci_benchmark "$BUN_API" "Bun"

echo "All benchmarks completed successfully." | tee -a $LOG_DIR/benchmark-results.md
