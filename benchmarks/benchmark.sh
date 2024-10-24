#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Configuration
NODE_API="http://localhost:3000/tasks"
BUN_API="http://localhost:3001/tasks"
LOG_DIR="./benchmarks/results"

# Create results directory if it doesn't exist
mkdir -p $LOG_DIR

# Run benchmark with wrk and log results for Node.js API
echo "Running wrk for Node.js API..." | tee $LOG_DIR/benchmark-results.md
wrk -t12 -c100 -d10s $NODE_API | tee -a $LOG_DIR/benchmark-results.md

# Run benchmark with wrk and log results for Bun API
echo "Running wrk for Bun API..." | tee -a $LOG_DIR/benchmark-results.md
wrk -t12 -c100 -d10s $BUN_API | tee -a $LOG_DIR/benchmark-results.md

# Indicate completion
echo "Benchmarks completed successfully." | tee -a $LOG_DIR/benchmark-results.md
