#!/bin/bash


echo 'DATABASE_URL = "mongodb://localhost:27017/"' | sudo tee -a .env
# Start the server
npm start
