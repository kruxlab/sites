#!/bin/bash
for site in websites/*/; do
  site=${site%*/}
  ./deploy_site.sh ${site##*/}
done