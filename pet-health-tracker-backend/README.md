# Pet Health Tracker Backend

Backend-модуль содержит серверную границу портала.
Текущий модуль является контейнерным placeholder до выбора API-стека.

## Контракт модуля

1. Предоставляет HTTP API для frontend-модуля.
2. Отвечает за серверные бизнес-правила.
3. Содержит точку проверки доступности `/health`.
4. Работает как отдельный Docker-сервис.

## Локальный запуск

```bash
PET_HEALTH_TRACKER_VERSION="$(cut -d= -f2 ../version.txt)"
docker build \
  --build-arg PET_HEALTH_TRACKER_VERSION="$PET_HEALTH_TRACKER_VERSION" \
  -t "pet-health-tracker-backend:$PET_HEALTH_TRACKER_VERSION" .
docker run --rm \
  -e PET_HEALTH_TRACKER_VERSION="$PET_HEALTH_TRACKER_VERSION" \
  -p 8080:8080 \
  "pet-health-tracker-backend:$PET_HEALTH_TRACKER_VERSION"
```

После запуска healthcheck доступен по адресу `http://localhost:8080/health`.
Версия модуля доступна по адресу `http://localhost:8080/version`.
