# Pet Health Tracker Backend Storage

Backend работает с файлами через S3-compatible хранилище.
Первая версия использует MinIO.

## Контракт

1. Исходные документы анализов хранятся в bucket `lab-documents`.
2. Bucket должен быть приватным.
3. Backend загружает файлы в bucket.
4. Backend сохраняет metadata файла в Postgres.
5. Metadata содержит владельца, bucket, object key и тип файла.
6. Backend выдает доступ к файлам только после проверки прав.
7. Путь объекта должен включать идентификатор владельца.
8. Публичный доступ к медицинским документам запрещен.

## Модель хранения

1. Бинарное содержимое хранится только в S3-compatible хранилище.
2. Postgres хранит только metadata и связи с анализом.
3. Backend является единственной точкой загрузки файлов.
4. Backend является единственной точкой выдачи доступа к файлам.
5. Frontend не получает прямой постоянный доступ к bucket.
6. Для скачивания backend выдает короткоживущую подписанную ссылку.
7. Для просмотра backend может проксировать файл после проверки прав.

## Поддерживаемые форматы первой версии

1. `image/jpeg`.
2. `image/png`.
3. `image/webp`.
4. `application/pdf`.

## Локальная разработка

1. MinIO запускается через root `docker-compose.yml`.
2. Bucket `lab-documents` создается сервисом `pet-health-tracker-minio-init`.
3. Console MinIO доступна через порт из `.env`.
4. Backend использует внутренний endpoint MinIO внутри Docker-сети.

## Production

1. MinIO входит в production compose-контур первой версии.
2. MinIO должен использовать persistent volume.
3. Доступ к MinIO API не должен быть публичным без необходимости.
4. MinIO console не должна быть публичной без дополнительной защиты.
5. Access key и secret key должны отличаться от локальных значений.
6. Bucket `lab-documents` должен оставаться приватным.
7. Backup bucket-данных является обязательной операционной задачей.
