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
docker build -t pet-health-tracker-backend .
docker run --rm -p 8080:8080 pet-health-tracker-backend
```

После запуска healthcheck доступен по адресу `http://localhost:8080/health`.
