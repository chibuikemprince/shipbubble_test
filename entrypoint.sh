#!/bin/bash
chmod +x entrypoint.sh

# Wait for the database container to be ready
until nc -z db 3306; do
  echo "Waiting for the database container to be ready..."
  sleep 1
done

# Run the app command
npm run migrate
npm start