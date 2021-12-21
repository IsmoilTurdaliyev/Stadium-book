# 🎈 **Backend**

After cloning this repository you should create virtual environment for this project:

```bash
$ python -m venv env
```

Next, activate it by using this command:

```bash
$ source env/Scripts/activate # for windows (git-bash)
$ source env/bin/activate # for unix based OS
```

Install all required packages, frameworks and etc. by using `pip` command from `requirements.txt`:

```bash
$ pip install -r requirements.txt
```

Run development server from `manage.py`:

```bash
$ python manage.py runserver
```

Testing:

```bash
$ python manage.py test tests/ --pattern="*_test.py"
```