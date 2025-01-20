#!/bin/bash

mongodb_directory="/etc/yum.repos.d/"
# Check that the MongoDB repo exists
mongodb_repo="${mongodb_directory}mongodb-org-7.0.repo"

# If the MongoDB repo file does not exist, create it
if [[ ! -f "$mongodb_repo" ]]; then
    echo "[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc" | sudo tee $mongodb_repo > /dev/null
fi

# Install MongoDB packages
sudo yum install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
