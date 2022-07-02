from django.test import TestCase
from django.conf import settings

# Create your tests here.

from user.models import User


class UserTestCase(TestCase):
    def setUp(self) -> None:
        return super().setUp()

    def test_user_model(self):
        user = User(
            username='test_user',
            email='test@gmail.com'
        )
        user.set_password('test_password')
        user.save()
        self.assertEqual(user.username, 'test_user')
        self.assertEqual(user.email, 'test@gmail.com')
        self.assertTrue(user.check_password('test_password'))

    def tearDown(self) -> None:
        return super().tearDown()
