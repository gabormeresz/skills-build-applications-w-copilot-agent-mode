from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class UserModelTest(TestCase):
    def test_create_user(self):
        team = Team.objects.create(name="Test Team")
        user = User.objects.create(name="Test User", email="test@example.com", team=team)
        self.assertEqual(user.name, "Test User")
        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.team, team)

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Team A")
        self.assertEqual(team.name, "Team A")

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        team = Team.objects.create(name="Team B")
        user = User.objects.create(name="User B", email="userb@example.com", team=team)
        activity = Activity.objects.create(user=user, type="Run", duration=30, date="2025-11-08")
        self.assertEqual(activity.type, "Run")
        self.assertEqual(activity.duration, 30)
        self.assertEqual(activity.user, user)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Pushups", description="Do 20 pushups", difficulty="Easy")
        self.assertEqual(workout.name, "Pushups")
        self.assertEqual(workout.difficulty, "Easy")

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name="Team C")
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(leaderboard.team, team)
        self.assertEqual(leaderboard.points, 100)
