# Pet Health Tracker

Pet Health Tracker - модульный каркас портала для учета здоровья питомца.
Репозиторий разделен на независимые модули с отдельными границами
ответственности.

## Модули

1. `pet-health-tracker-frontend` - пользовательский интерфейс.
2. `pet-health-tracker-backend` - HTTP API и серверная граница продукта.
3. `pet-health-tracker-docs` - продуктовая документация и MVP-объем.

## Версия

Глобальная версия проекта хранится в `version.txt`.
Все модули используют версию проекта и не имеют независимых версий.

В контейнерах значение доступно как `PET_HEALTH_TRACKER_VERSION`.
Compose использует значение версии как tag локальных Docker-образов.

```bash
cat version.txt
```

Получить только значение версии:

```bash
cut -d= -f2 version.txt
```

## Запуск

Для локального запуска нужен Docker с поддержкой Docker Compose.
Переменные локального окружения хранятся в `.env`.
Контракт переменных зафиксирован в `.env.example`.

```bash
cp .env.example .env
./scripts/compose up --build
```

После запуска доступны следующие точки входа:

1. Frontend: `http://localhost:${PET_HEALTH_TRACKER_FRONTEND_PORT}`.
2. Backend healthcheck:
   `http://localhost:${PET_HEALTH_TRACKER_BACKEND_PORT}/health`.
3. Backend version:
   `http://localhost:${PET_HEALTH_TRACKER_BACKEND_PORT}/version`.
4. Frontend version:
   `http://localhost:${PET_HEALTH_TRACKER_FRONTEND_PORT}/version`.

## Команды Compose

Локальные команды запуска должны идти через `scripts/compose`.
Прямой `docker compose` требует заранее задать `PET_HEALTH_TRACKER_VERSION`.

Подготовить локальный `.env`:

```bash
cp .env.example .env
```

Запустить все сервисы с пересборкой образов:

```bash
./scripts/compose up --build
```

Запустить все сервисы в фоне:

```bash
./scripts/compose up --build -d
```

Запустить только backend:

```bash
./scripts/compose up --build pet-health-tracker-backend
```

Запустить frontend вместе с его зависимостями:

```bash
./scripts/compose up --build pet-health-tracker-frontend
```

Показать состояние сервисов:

```bash
./scripts/compose ps
```

Показать логи всех сервисов:

```bash
./scripts/compose logs -f
```

Остановить и удалить контейнеры проекта:

```bash
./scripts/compose down
```

## Docker Images

Compose собирает локальные образы с tag из `version.txt`.
Для текущей версии используются следующие имена:

1. `pet-health-tracker-backend:0.0.0-SNAPSHOT`.
2. `pet-health-tracker-frontend:0.0.0-SNAPSHOT`.

## Переменные

Compose использует переменные с префиксом `PET_HEALTH_TRACKER_`.
Переменные задают только параметры публикации сервисов на хосте.
Внутренние порты контейнеров зафиксированы в модулях.
Healthcheck выполняется внутри контейнера через его loopback-адрес.

1. `PET_HEALTH_TRACKER_HOST_BIND_ADDRESS` задает адрес публикации на хосте.
2. `PET_HEALTH_TRACKER_FRONTEND_PORT` задает внешний порт frontend.
3. `PET_HEALTH_TRACKER_BACKEND_PORT` задает внешний порт backend.
4. `PET_HEALTH_TRACKER_VERSION` задается скриптом `scripts/compose`.

## Текущий объем

Продуктовые требования находятся в `pet-health-tracker-docs/MVP.md`.
