# Cat Health Tracker

Cat Health Tracker - модульный каркас портала для учета состояния кота.
Репозиторий разделен на независимые модули с отдельными границами
ответственности.

## Модули

1. `cat-health-tracker-frontend` - пользовательский интерфейс.
2. `cat-health-tracker-backend` - HTTP API и серверная граница продукта.
3. `cat-health-tracker-docs` - продуктовая документация и MVP-объем.

## Запуск

Для локального запуска нужен Docker с поддержкой Docker Compose.
Переменные локального окружения хранятся в `.env`.
Контракт переменных зафиксирован в `.env.example`.

```bash
cp .env.example .env
docker compose up --build
```

После запуска доступны следующие точки входа:

1. Frontend: `http://localhost:${CAT_HEALTH_TRACKER_FRONTEND_PORT}`.
2. Backend healthcheck:
   `http://localhost:${CAT_HEALTH_TRACKER_BACKEND_PORT}/health`.

## Переменные

Compose использует переменные с префиксом `CAT_HEALTH_TRACKER_`.
Переменные задают только параметры публикации сервисов на хосте.
Внутренние порты контейнеров зафиксированы в модулях.
Healthcheck выполняется внутри контейнера через его loopback-адрес.

1. `CAT_HEALTH_TRACKER_HOST_BIND_ADDRESS` задает адрес публикации на хосте.
2. `CAT_HEALTH_TRACKER_FRONTEND_PORT` задает внешний порт frontend.
3. `CAT_HEALTH_TRACKER_BACKEND_PORT` задает внешний порт backend.

## Сеть

Compose создает bridge-сеть `cat-health-tracker-app`.
Сервисы обращаются друг к другу по именам сервисов внутри этой сети.
Порты из `.env` нужны только для доступа с хост-машины.

## Границы модулей

Frontend отвечает за пользовательские сценарии, формы, таблицы и графики.
Backend отвечает за API, обработку документов, хранение и бизнес-правила.
Docs фиксирует продуктовый контракт, MVP-сценарии и ограничения терминологии.

## Текущий объем

Каркас не фиксирует финальный стек реализации.
Frontend и backend содержат только минимальные файлы для контейнерного запуска.
Продуктовые требования перенесены в `cat-health-tracker-docs/README.md`.
