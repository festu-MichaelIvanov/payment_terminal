# Generated by Django 2.1.3 on 2018-12-02 05:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CellOperator',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Cell operator')),
            ],
            options={
                'verbose_name': 'Cell operator',
                'verbose_name_plural': 'Cell operators',
            },
        ),
        migrations.CreateModel(
            name='UserBalance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=12, verbose_name='Phone')),
                ('balance', models.PositiveIntegerField(verbose_name='Balance')),
                ('cell_operator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_balances', to='core.CellOperator', verbose_name='Cell operator')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_balances', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'User balance',
                'verbose_name_plural': 'User balances',
            },
        ),
    ]