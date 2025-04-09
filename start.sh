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
  uvicorn app:app --reload --host 0.0.0.0 --port 8000
else

  uvicorn app:app --host 0.0.0.0 --port 8000
fi
cd ..

echo "Starting the frontend..."
cd client

if [ "$ENVIRONMENT" == "development" ]; then
  npm start
else
  npm run build
  serve -s build
fi

echo "Application started successfully!"
