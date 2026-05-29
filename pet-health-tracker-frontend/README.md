# Pet Health Tracker Frontend

Frontend-модуль содержит пользовательский интерфейс портала.
Текущий модуль является контейнерным placeholder до выбора UI-стека.

## Контракт модуля

1. Предоставляет web-интерфейс продукта.
2. Работает как отдельный Docker-сервис.
3. Не хранит серверные бизнес-правила.

## Локальный запуск

```bash
PET_HEALTH_TRACKER_VERSION="$(cut -d= -f2 ../version.txt)"
docker build \
  --build-arg PET_HEALTH_TRACKER_VERSION="$PET_HEALTH_TRACKER_VERSION" \
  -t "pet-health-tracker-frontend:$PET_HEALTH_TRACKER_VERSION" .
docker run --rm \
  -e PET_HEALTH_TRACKER_VERSION="$PET_HEALTH_TRACKER_VERSION" \
  -p 3000:80 \
  "pet-health-tracker-frontend:$PET_HEALTH_TRACKER_VERSION"
```

После запуска модуль доступен по адресу `http://localhost:3000`.
Версия модуля доступна по адресу `http://localhost:3000/version`.
