# Pet Health Tracker Backend

Backend-модуль содержит серверную границу портала.
Backend владеет авторизацией, бизнес-правилами, схемой данных и доступом к
файлам.

## Контракт модуля

1. Предоставляет HTTP API для frontend-модуля.
2. Отвечает за серверные бизнес-правила.
3. Содержит точку проверки доступности `/health`.
4. Работает как отдельный Docker-сервис.
5. Владеет миграциями базы данных.
6. Владеет парольной авторизацией пользователей.
7. Работает с файлами через S3-compatible хранилище.

## Инфраструктура

Backend использует инфраструктурные сервисы из root `docker-compose.yml`.

1. Postgres хранит данные продукта.
2. MinIO хранит исходные документы анализов.
3. Mailpit принимает локальные письма подтверждения и сброса пароля.

## Данные

1. `migrations` содержит миграции базы данных.
2. `seeds` содержит локальные seed-данные.
3. `storage` содержит контракт файлового хранилища.

## Переменные

1. `PET_HEALTH_TRACKER_SESSION_SECRET` задает секрет сессий.
2. `PET_HEALTH_TRACKER_DATABASE_URL` задает подключение к Postgres.
3. `PET_HEALTH_TRACKER_FILE_STORAGE_ENDPOINT` задает endpoint хранилища.
4. `PET_HEALTH_TRACKER_FILE_STORAGE_BUCKET` задает bucket документов.
5. `PET_HEALTH_TRACKER_FILE_STORAGE_ACCESS_KEY` задает access key.
6. `PET_HEALTH_TRACKER_FILE_STORAGE_SECRET_KEY` задает secret key.
7. `PET_HEALTH_TRACKER_FILE_STORAGE_REGION` задает регион хранилища.
8. `PET_HEALTH_TRACKER_SMTP_HOST` задает SMTP host.
9. `PET_HEALTH_TRACKER_SMTP_PORT` задает SMTP port.
10. `PET_HEALTH_TRACKER_EMAIL_FROM` задает отправителя писем.

## Локальный запуск

Полный локальный контур запускается из корня репозитория через Compose.
Standalone-запуск backend подходит только для проверки `/health` и `/version`.

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
