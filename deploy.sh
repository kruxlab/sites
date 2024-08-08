#!/bin/bash

deploy_site() {
    local site=$1
    echo "Starting deployment of $site..."
    (
        cd "websites/$site" || exit
        docker-compose up -d --build
        echo "$site deployed successfully."
    ) &
}

echo "Initiating parallel deployment of all sites..."

# Array to store background process IDs
pids=()

for site in websites/*; do
    if [ -d "$site" ]; then
        site_name=$(basename "$site")
        deploy_site "$site_name"
        pids+=($!)
    fi
done

# Wait for all background processes to complete
for pid in "${pids[@]}"; do
    wait $pid
done

echo "All sites have been deployed successfully."