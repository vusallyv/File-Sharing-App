# Generated by Django 4.0.5 on 2022-07-02 20:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_user_uuid_userinfo'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserInfo',
        ),
    ]