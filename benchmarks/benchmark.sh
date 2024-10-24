#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Configuration
NODE_API="http://localhost:3000/tasks"
BUN_API="http://localhost:3001/tasks"
LOG_DIR="./benchmarks/results"

# Create results directory if it doesn't exist
mkdir -p $LOG_DIR

# Function to log results with wrk
run_benchmark() {
  local API_URL=$1
  local METHOD=$2

  echo "Running $METHOD benchmark for $API_URL..." | tee -a $LOG_DIR/benchmark-results.md
  curl -X POST -H "Content-Type: application/json" -d '{"name": "Benchmark Task"}' $API_URL | tee -a $LOG_DIR/benchmark-results.md

  # Use wrk to simulate high traffic for GET requests
  wrk -t12 -c100 -d10s $API_URL | tee -a $LOG_DIR/benchmark-results.md

  # Send PATCH request to update task 1
  curl -X PATCH -H "Content-Type: application/json" -d '{"name": "Updated Task"}' "$API_URL/1" | tee -a $LOG_DIR/benchmark-results.md

  # Send DELETE request to delete task 1
  curl -X DELETE "$API_URL/1" | tee -a $LOG_DIR/benchmark-results.md

  echo "Completed $METHOD benchmark for $API_URL." | tee -a $LOG_DIR/benchmark-results.md
}

# Run benchmarks for Node.js API
run_benchmark $NODE_API "Node.js"

# Run benchmarks for Bun API
run_benchmark $BUN_API "Bun"

echo "Benchmarks completed successfully." | tee -a $LOG_DIR/benchmark-results.md
