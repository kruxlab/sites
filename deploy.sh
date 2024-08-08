#!/bin/bash

deploy_site() {
    echo "Deploying $site..."

    site=$1
    cd websites/$site
    docker-compose up -d --build

    echo "$site deployed successfully."
}

echo "Deploying all sites..."
for site in websites/*; do
    if [ -d "$site" ]; then
        site_name=$(basename "$site")
        deploy_site "$site_name"
    fi
done
echo "All sites deployed successfully."