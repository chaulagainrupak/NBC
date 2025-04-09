#!/bin/bash

ENVIRONMENT=${1:-development}
VENV_DIR="./venv"

if [ ! -d "$VENV_DIR" ]; then
  python3 -m venv $VENV_DIR
  source $VENV_DIR/bin/activate
  pip install --upgrade pip
  pip install -r requirements.txt
else
  source $VENV_DIR/bin/activate
fi

echo "Installing frontend dependencies..."
cd client 
npm install
cd ..

echo "Starting the backend..."
cd server
if [ "$ENVIRONMENT" == "development" ]; then
  nohup uvicorn app:app --reload --host 0.0.0.0 --port 8000 &
else
  nohup uvicorn app:app --host 0.0.0.0 --port 8000 &
fi
cd ..

echo "Starting the frontend..."
cd client

if [ "$ENVIRONMENT" == "development" ]; then
  nohup npm run dev -- --port 8001 &
else
  npm run build
  nohup serve -s build -l 8001 &
fi
cd ..

echo "Application started successfully!"
