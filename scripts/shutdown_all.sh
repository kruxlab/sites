#!/bin/bash
for site in websites/*/; do
  site=${site%*/}
  ./shutdown_site.sh ${site##*/}
done