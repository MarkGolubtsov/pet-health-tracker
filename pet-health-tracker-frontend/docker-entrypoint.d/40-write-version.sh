#!/usr/bin/env sh
set -eu

printf "%s\n" "${PET_HEALTH_TRACKER_VERSION:-unknown}" \
  > /usr/share/nginx/html/version
