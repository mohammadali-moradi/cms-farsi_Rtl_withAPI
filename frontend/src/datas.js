let xAxisData = [
    {
        "name": 'فروردین',
        "Sale": 112_000
    },
    {
        "name": 'اردیبهشت',
        "Sale": 99_000
    },
    {
        "name": 'خرداد',
        "Sale": 12_090
    },
    {
        "name": 'تیر',
        "Sale": 99_000
    },
    {
        "name": 'مرداد',
        "Sale": 54_000
    },
    {
        "name": 'شهریور',
        "Sale": 85_000
    },
    {
        "name": 'مهر',
        "Sale": 34_000
    },
    {
        "name": 'آبان',
        "Sale": 18_598
    },
    {
        "name": 'آذر',
        "Sale": 0
    },
    {
        "name": 'دی',
        "Sale": 73_078
    },
    {
        "name": 'بهمن',
        "Sale": 12_900
    },
    {
        "name": 'اسفند',
        "Sale": 97_000
    },
]

const newMembers = [
    {
        id: 1,
        username: 'محمدرضا سارانی',
        title: 'عضو معمولی',
    },
    {
        id: 2,
        username: 'ساسان عبادی',
        title: 'عضو ویژه',
    },
    {
        id: 3,
        username: 'فاطمه حسینی',
        title: 'عضو ویژه',
    },
    {
        id: 4,
        username: 'شادمهر خلیلی',
        title: 'عضو معمولی',
    },
]

const transactions = [
    {
        id: 1,
        customer: 'شادمهر خلیلی',
        date: '۲۲ اسفند',
        amount: 12,
        status: 'Pending',
    },
    {
        id: 2,
        customer: 'سعید خزایی',
        date: '۱۸ اسفند',
        amount: 10,
        status: 'Declined',
    },
    {
        id: 3,
        customer: 'محمد غلامی',
        date: '۱۰ اسفند',
        amount: 45,
        status: 'Approved',
    },
    {
        id: 4,
        customer: 'سامان مرادی',
        date: '۳۰ بهمن',
        amount: 79,
        status: 'Approved',
    },
]

export {
    xAxisData,
    newMembers,
    transactions,
}