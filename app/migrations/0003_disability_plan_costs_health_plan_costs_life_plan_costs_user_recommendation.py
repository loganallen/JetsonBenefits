# Generated by Django 2.0.2 on 2018-03-13 18:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0002_auto_20180313_1752'),
    ]

    operations = [
        migrations.CreateModel(
            name='disability_plan_costs',
            fields=[
                ('disability_plan_id', models.IntegerField(primary_key=True, serialize=False)),
                ('benefit_amount', models.IntegerField()),
                ('age', models.CharField(choices=[('25', '25 year old office worker'), ('35', '35 year old office worker'), ('45', '35 year old office worker ')], max_length=20)),
                ('gender', models.CharField(choices=[('m', 'male'), ('f', 'female')], max_length=30)),
                ('monthly', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='health_plan_costs',
            fields=[
                ('health_plan_id', models.IntegerField(primary_key=True, serialize=False)),
                ('carrier', models.CharField(max_length=250)),
                ('plan_name', models.CharField(max_length=250)),
                ('medal', models.CharField(choices=[('Gold', 'Gold'), ('Silver', 'Silver'), ('Bronze', 'Bronze')], max_length=8)),
                ('plan_type', models.CharField(choices=[('HMO', 'HMO'), ('PPO', 'PPO')], max_length=8)),
                ('monthly_premium', models.IntegerField()),
                ('deductible', models.IntegerField()),
                ('deductible_level', models.CharField(choices=[('High', 'High'), ('Low', 'Low')], max_length=8)),
                ('is_just_me', models.BooleanField(default=True)),
                ('is_me_spouse', models.BooleanField(default=False)),
                ('is_me_spouse_kid', models.BooleanField(default=False)),
                ('is_me_spouse_two_kids', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='life_plan_costs',
            fields=[
                ('life_plan_id', models.IntegerField(primary_key=True, serialize=False)),
                ('carrier', models.CharField(max_length=250)),
                ('policy_term', models.IntegerField()),
                ('policy_amount', models.IntegerField()),
                ('gender', models.CharField(choices=[('m', 'male'), ('f', 'female')], max_length=8)),
                ('age', models.CharField(choices=[('25', '25 year old healthy'), ('35', '35 year old healthy')], max_length=20)),
                ('monthly', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='user_recommendation',
            fields=[
                ('recommendation_id', models.IntegerField(primary_key=True, serialize=False)),
                ('disability_plan_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='app.disability_plan_costs')),
                ('health_plan_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='app.health_plan_costs')),
                ('life_plan_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='app.life_plan_costs')),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
