#!/bin/bash
site=$1
cd websites/$site
docker-compose up -d --build