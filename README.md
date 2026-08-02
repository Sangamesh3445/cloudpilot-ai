# 🚛 CloudPilot AI – Enterprise Fleet Management Backend

A production-ready Fleet Management REST API built with **Django REST Framework** and **PostgreSQL**.

## 🚀 Features

- JWT Authentication
- User Registration & Login
- Driver Management
- Vehicle Management
- Fleet Management
- Trip Management
- Dashboard APIs
- Filtering & Pagination
- Swagger/OpenAPI Documentation
- Production-ready Gunicorn & Nginx configuration

---

## 🛠️ Tech Stack

### Backend
- Python 3
- Django
- Django REST Framework

### Database
- PostgreSQL

### Authentication
- JWT (JSON Web Token)

### Deployment
- Gunicorn
- Nginx

### Tools
- Git
- GitHub
- Swagger

---

## 📁 Project Structure

```text
backend/
├── accounts/
├── drivers/
├── vehicles/
├── fleets/
├── trips/
├── dashboard/
├── services/
└── manage.py
```

---

## ⚙️ Installation

```bash
git clone <repository-url>
cd eld-project/backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## 📖 API Documentation

After running the server:

```
http://127.0.0.1:8000/swagger/
```

---

## 🎯 Future Enhancements

- React Frontend
- Docker & Docker Compose
- CI/CD Pipeline
- AWS Deployment
- AI Route Optimization
- Analytics Dashboard
- Real-time Notifications

---

## 👨‍💻 Author

**Sangamesh R**

Electronics & Computer Engineering Graduate

Backend | Cloud | DevOps Enthusiast