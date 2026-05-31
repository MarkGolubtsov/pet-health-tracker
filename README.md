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
./scripts/compose --profile dev up --build
```

После запуска доступны следующие точки входа:

1. Frontend: `http://localhost:${PET_HEALTH_TRACKER_FRONTEND_PORT}`.
2. Backend healthcheck:
   `http://localhost:${PET_HEALTH_TRACKER_BACKEND_PORT}/health`.
3. Backend version:
   `http://localhost:${PET_HEALTH_TRACKER_BACKEND_PORT}/version`.
4. Frontend version:
   `http://localhost:${PET_HEALTH_TRACKER_FRONTEND_PORT}/version`.
5. MinIO API: `http://localhost:${PET_HEALTH_TRACKER_FILE_STORAGE_API_PORT}`.
6. MinIO console:
   `http://localhost:${PET_HEALTH_TRACKER_FILE_STORAGE_CONSOLE_PORT}`.
7. Mailpit: `http://localhost:${PET_HEALTH_TRACKER_MAILPIT_WEB_PORT}`.

Mailpit доступен только при запуске с профилем `dev`.

## Команды Compose

Локальные команды запуска должны идти через `scripts/compose`.
Прямой `docker compose` требует заранее задать `PET_HEALTH_TRACKER_VERSION`.
Compose запускает runtime-модули и инфраструктуру локального окружения.

Подготовить локальный `.env`:

```bash
cp .env.example .env
```

Запустить все сервисы с пересборкой образов:

```bash
./scripts/compose --profile dev up --build
```

Запустить все сервисы в фоне:

```bash
./scripts/compose --profile dev up --build -d
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

Запустить production-like контур без Mailpit:

```bash
./scripts/compose up --build
```

В production MinIO остается частью compose-контура.
Mailpit в production не запускается.
SMTP-провайдер для production задается через `.env`.

## Docker Images

Compose собирает локальные образы с tag из `version.txt`.
Для текущей версии используются следующие имена:

1. `pet-health-tracker-backend:0.0.0-SNAPSHOT`.
2. `pet-health-tracker-frontend:0.0.0-SNAPSHOT`.

Compose также использует внешние инфраструктурные образы:

1. `postgres:16-alpine`.
2. `quay.io/minio/minio:latest`.
3. `quay.io/minio/mc:latest`.
4. `axllent/mailpit:latest` используется только с профилем `dev`.

## Переменные

Compose использует переменные с префиксом `PET_HEALTH_TRACKER_`.
Переменные задают только параметры публикации сервисов на хосте.
Внутренние порты контейнеров зафиксированы в модулях.
Healthcheck выполняется внутри контейнера через его loopback-адрес.

1. `PET_HEALTH_TRACKER_FRONTEND_BIND_ADDRESS` задает bind frontend.
2. `PET_HEALTH_TRACKER_FRONTEND_PORT` задает внешний порт frontend.
3. `PET_HEALTH_TRACKER_BACKEND_BIND_ADDRESS` задает bind backend.
4. `PET_HEALTH_TRACKER_BACKEND_PORT` задает внешний порт backend.
5. `PET_HEALTH_TRACKER_SESSION_SECRET` задает секрет сессий.
6. `PET_HEALTH_TRACKER_POSTGRES_BIND_ADDRESS` задает bind Postgres.
7. `PET_HEALTH_TRACKER_POSTGRES_PORT` задает внешний порт Postgres.
8. `PET_HEALTH_TRACKER_POSTGRES_DB` задает имя локальной базы данных.
9. `PET_HEALTH_TRACKER_POSTGRES_USER` задает пользователя локальной базы.
10. `PET_HEALTH_TRACKER_POSTGRES_PASSWORD` задает пароль локальной базы.
11. `PET_HEALTH_TRACKER_FILE_STORAGE_API_BIND_ADDRESS` задает bind MinIO API.
12. `PET_HEALTH_TRACKER_FILE_STORAGE_API_PORT` задает внешний порт MinIO API.
13. `PET_HEALTH_TRACKER_FILE_STORAGE_CONSOLE_BIND_ADDRESS` задает bind console.
14. `PET_HEALTH_TRACKER_FILE_STORAGE_CONSOLE_PORT` задает порт MinIO console.
15. `PET_HEALTH_TRACKER_FILE_STORAGE_ENDPOINT` задает endpoint хранилища.
16. `PET_HEALTH_TRACKER_FILE_STORAGE_BUCKET` задает bucket документов.
17. `PET_HEALTH_TRACKER_FILE_STORAGE_ACCESS_KEY` задает access key MinIO.
18. `PET_HEALTH_TRACKER_FILE_STORAGE_SECRET_KEY` задает secret key MinIO.
19. `PET_HEALTH_TRACKER_FILE_STORAGE_REGION` задает регион хранилища.
20. `PET_HEALTH_TRACKER_MAILPIT_BIND_ADDRESS` задает bind Mailpit.
21. `PET_HEALTH_TRACKER_MAILPIT_SMTP_PORT` задает SMTP-порт Mailpit.
22. `PET_HEALTH_TRACKER_MAILPIT_WEB_PORT` задает web-порт Mailpit.
23. `PET_HEALTH_TRACKER_SMTP_HOST` задает SMTP host для backend.
24. `PET_HEALTH_TRACKER_SMTP_PORT` задает SMTP port для backend.
25. `PET_HEALTH_TRACKER_EMAIL_FROM` задает отправителя писем.
26. `PET_HEALTH_TRACKER_VERSION` задается скриптом `scripts/compose`.

## Адреса Публикации

В production инфраструктурные сервисы должны быть привязаны к loopback.
Так Postgres, MinIO API и MinIO console не будут доступны из публичной сети.

1. `PET_HEALTH_TRACKER_POSTGRES_BIND_ADDRESS=127.0.0.1`.
2. `PET_HEALTH_TRACKER_FILE_STORAGE_API_BIND_ADDRESS=127.0.0.1`.
3. `PET_HEALTH_TRACKER_FILE_STORAGE_CONSOLE_BIND_ADDRESS=127.0.0.1`.

Frontend и backend можно публиковать напрямую или через reverse proxy.
Если reverse proxy работает на том же хосте, оставьте их bind address на
loopback.

## Текущий объем

Продуктовые требования находятся в `pet-health-tracker-docs/MVP.md`.
Технологический стек находится в `pet-health-tracker-docs/STACK.md`.
