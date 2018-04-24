# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='schedule_time',
            field=models.DateTimeField(default=datetime.datetime(2018, 4, 24, 4, 45, 1, 501000, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='item',
            name='status',
            field=models.BooleanField(default=1),
            preserve_default=False,
        ),
    ]
