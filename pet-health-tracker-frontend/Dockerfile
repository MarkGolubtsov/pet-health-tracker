FROM nginx:alpine

ARG PET_HEALTH_TRACKER_VERSION

LABEL org.opencontainers.image.title="Pet Health Tracker Frontend"
LABEL org.opencontainers.image.version="${PET_HEALTH_TRACKER_VERSION}"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.d /docker-entrypoint.d
COPY public /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.d/write-version.sh

EXPOSE 80
