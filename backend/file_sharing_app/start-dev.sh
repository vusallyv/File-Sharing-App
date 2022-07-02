export SECRET_KEY=django-insecure--l*4evyqrz@32_-)6=n&%1eqxx@h440sfjl4n@7*c0wc)vicff
docker-compose up -d
docker run -p 6379:6379 -d redis:5
celery -A file_sharing_app worker -l info
python manage.py runserver
