docker-compose up -d
docker run -p 6379:6379 -d redis:5
celery -A file_sharing_app worker -l info
python file_sharing_app/manage.py runserver
