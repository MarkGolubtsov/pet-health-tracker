FROM node:22-alpine

ARG PET_HEALTH_TRACKER_VERSION

LABEL org.opencontainers.image.title="Pet Health Tracker Backend"
LABEL org.opencontainers.image.version="${PET_HEALTH_TRACKER_VERSION}"

WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./
COPY src ./src

EXPOSE 8080

CMD ["npm", "start"]
