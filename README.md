# Pet Health Tracker

Pet Health Tracker - модульный каркас портала для учета здоровья питомца.
Репозиторий разделен на независимые модули с отдельными границами
ответственности.

## Модули

1. `pet-health-tracker-frontend` - пользовательский интерфейс.
2. `pet-health-tracker-backend` - HTTP API и серверная граница продукта.
3. `pet-health-tracker-docs` - продуктовая документация и MVP-объем.

## Запуск

Для локального запуска нужен Docker с поддержкой Docker Compose.
Переменные локального окружения хранятся в `.env`.
Контракт переменных зафиксирован в `.env.example`.

```bash
cp .env.example .env
docker compose up --build
```

После запуска доступны следующие точки входа:

1. Frontend: `http://localhost:${PET_HEALTH_TRACKER_FRONTEND_PORT}`.
2. Backend healthcheck:
   `http://localhost:${PET_HEALTH_TRACKER_BACKEND_PORT}/health`.

## Команды Compose

Подготовить локальный `.env`:

```bash
cp .env.example .env
```

Запустить все сервисы с пересборкой образов:

```bash
docker compose up --build
```

Запустить все сервисы в фоне:

```bash
docker compose up --build -d
```

Запустить только backend:

```bash
docker compose up --build pet-health-tracker-backend
```

Запустить frontend вместе с его зависимостями:

```bash
docker compose up --build pet-health-tracker-frontend
```

Показать состояние сервисов:

```bash
docker compose ps
```

Показать логи всех сервисов:

```bash
docker compose logs -f
```

Остановить и удалить контейнеры проекта:

```bash
docker compose down
```

## Переменные

Compose использует переменные с префиксом `PET_HEALTH_TRACKER_`.
Переменные задают только параметры публикации сервисов на хосте.
Внутренние порты контейнеров зафиксированы в модулях.
Healthcheck выполняется внутри контейнера через его loopback-адрес.

1. `PET_HEALTH_TRACKER_HOST_BIND_ADDRESS` задает адрес публикации на хосте.
2. `PET_HEALTH_TRACKER_FRONTEND_PORT` задает внешний порт frontend.
3. `PET_HEALTH_TRACKER_BACKEND_PORT` задает внешний порт backend.

## Сеть

Compose создает bridge-сеть `pet-health-tracker-app`.
Сервисы обращаются друг к другу по именам сервисов внутри этой сети.
Порты из `.env` нужны только для доступа с хост-машины.

## Границы модулей

Frontend отвечает за пользовательские сценарии, формы, таблицы и графики.
Backend отвечает за API, обработку документов, хранение и бизнес-правила.
Docs фиксирует продуктовый контракт, MVP-сценарии и ограничения терминологии.

## Текущий объем

Каркас не фиксирует финальный стек реализации.
Frontend и backend содержат только минимальные файлы для контейнерного запуска.
Продуктовые требования перенесены в `pet-health-tracker-docs/README.md`.
