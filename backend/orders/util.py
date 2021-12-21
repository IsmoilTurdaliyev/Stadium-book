from datetime import timedelta
from datetime import datetime

from django.utils import timezone

from orders.models import Order
from stadiums.models import Stadium


def is_occupied(stadium: Stadium, starts_at: datetime, ends_at: datetime) -> bool:
    orders = Order.objects.filter(
        stadium=stadium,
        is_verified=True
    ).all()

    intervals: list = [
        {
            "starts_at": timezone.localtime(order.starts_at),
            "ends_at": timezone.localtime(order.ends_at)
        }
        for order in orders
    ]

    for interval in intervals:
        if any((
            interval["starts_at"] <= starts_at <= interval["ends_at"],
            interval["starts_at"] <= ends_at <= interval["ends_at"],
            starts_at <= interval["starts_at"] <= ends_at,
            starts_at <= interval["ends_at"] <= ends_at
        )) != False:
            return True
    return False
