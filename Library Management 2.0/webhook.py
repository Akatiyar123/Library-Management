from celery import Celery
import redis
import json
from celery.schedules import crontab
import requests

# Initialize Celery app
reminder_app = Celery('send_reminder', broker='redis://localhost:6379/0')

# Connect to Redis
redis_connection = redis.Redis(host='localhost', port=6379, db=0)

# Define the webhook URL
WEBHOOK_URL = "https://chat.googleapis.com/v1/spaces/AAAAqOhcd78/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=_veMVce7aWsssUtnpXz9W8aswTX92CQYZOMl3h4JvlA"

# Define the task to send a reminder message
@reminder_app.task
def send_reminder_message():
    message_content = {
        "text": "This is a reminder message. Visit http://example.com for more information.",
    }
    response = requests.post(WEBHOOK_URL, json=message_content)

    if not response.ok:
        raise Exception(f"Failed to send reminder message: {response.status_code}")
    else:
        return "Reminder message sent successfully."

# Schedule the task to run every minute
reminder_app.conf.beat_schedule = {
    "send-reminder": {
        "task": "send_reminder.send_reminder_message",
        "schedule": crontab(minute="*"),
    }
}


# from celery import Celery
# import redis
# import json
# from celery.schedules import crontab
# import requests

# app = Celery('send_reminder', broker='redis://localhost:6379/0')

# r = redis.Redis(host='localhost', port=6379, db=0)

# WEBHOOK_URL = "https://chat.googleapis.com/v1/spaces/AAAAqOhcd78/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=_veMVce7aWsssUtnpXz9W8aswTX92CQYZOMl3h4JvlA"

# @app.task
# def send_message():
#     message = {
#         "text": "This message is from REDIS and CELERY! Please visit http://localhost:8080/feed",
#     }
#     response = requests.post(WEBHOOK_URL, json=message)

#     if not response.ok:
#         raise Exception(f"Failed to send message: {response.status_code}")
#     else:
#         return "Reminder message sent successfully."

# # Schedule the task to run every minute
# app.conf.beat_schedule = {
#     "send-reminder": {
#         "task": "send_reminder.send_message",
#         "schedule": crontab(minute="*"),
#     }
# }
