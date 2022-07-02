from django.test import TestCase

# Create your tests here.

from user.models import User
from file.models import File

class FileTestCase(TestCase):
    def setUp(self) -> None:
        return super().setUp()

    def test_create_file(self):
        user = User(
            username='test_user',
            email='test@gmail.com'
        )
        user.set_password('test_password')
        user.save()
        file = File(
            name='test_file',
            description='test_description',
            file='test_file.txt',
            user=user
        ) 
        file.save()
        self.assertEqual(file.name, 'test_file')
        self.assertEqual(file.description, 'test_description')
        self.assertEqual(file.file, 'test_file.txt')
        self.assertEqual(file.user, user)

    def tearDown(self) -> None:
        return super().tearDown()

