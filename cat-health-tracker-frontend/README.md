# Cat Health Tracker Frontend

Frontend-модуль содержит пользовательский интерфейс портала.
Текущий модуль является контейнерным placeholder до выбора UI-стека.

## Контракт модуля

1. Предоставляет web-интерфейс продукта.
2. Работает как отдельный Docker-сервис.
3. Не хранит серверные бизнес-правила.

## Локальный запуск

```bash
docker build -t cat-health-tracker-frontend .
docker run --rm -p 3000:80 cat-health-tracker-frontend
```

После запуска модуль доступен по адресу `http://localhost:3000`.
