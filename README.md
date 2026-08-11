# 🤖 AI-Powered Supply Chain Management System

An **AI-powered, full-stack Supply Chain Management System** designed to manage products, suppliers, inventory, orders, users, and reports while using Artificial Intelligence to provide intelligent business insights and decision support.

The system follows a **microservices-oriented architecture** and combines multiple technologies including **React, Node.js, Java Spring Boot, .NET, Python AI services, and MongoDB**.

## 🔗 Repository

[GitHub Repository](https://github.com/Anit06/AI-Supply-Chain-Management-System?utm_source=chatgpt.com)

---

## 📌 Project Overview

Traditional supply chain systems mainly depend on manually maintained data and rule-based decision making. This project aims to improve supply chain operations by combining:

* 📦 Inventory Management
* 🏭 Supplier Management
* 🛒 Product & Order Management
* 👥 User & Role Management
* 🤖 AI-based Analysis
* 📊 Report Generation
* 🔐 Authentication & Authorization
* 🔄 Microservice-based Backend
* 🗄️ MongoDB Database

The system provides a centralized platform where administrators and supply-chain users can monitor and manage different stages of the supply chain.

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      React UI        │
                         │    Frontend Client    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Node.js Backend    │
                         │   REST API Gateway   │
                         └───────┬──────┬───────┘
                                 │      │
                ┌────────────────┘      └────────────────┐
                ▼                                       ▼
       ┌──────────────────┐                    ┌──────────────────┐
       │ Java Inventory   │                    │ .NET Report      │
       │     Service      │                    │     Service      │
       └────────┬─────────┘                    └────────┬─────────┘
                │                                       │
                └────────────────┬──────────────────────┘
                                 │
                                 ▼
                       ┌───────────────────┐
                       │     MongoDB       │
                       │     Database      │
                       └───────────────────┘

                                 ▲
                                 │
                       ┌───────────────────┐
                       │ Python AI Service │
                       │ AI/ML Processing  │
                       └───────────────────┘
```

---

# 🧩 Main Components

The repository is organized into several independent services:

```text
AI-Supply-Chain-Management-System/
│
├── backend-node/
│   └── Node.js Backend / REST APIs
│
├── frontend-react/
│   └── React Frontend
│
├── java-inventory-service/
│   └── Java Inventory Microservice
│
├── dotnet-report-service/
│   └── .NET Reporting Service
│
├── python-ai-service/
│   └── AI/ML Service
│
├── database/
│   └── MongoDB Database Configuration
│
└── docs/
    └── Project Documentation
```

---

# 🚀 Features

## 👤 User Management

* User registration and login
* Authentication
* Role-based access control
* User management
* Admin operations
* Secure API access

---

## 🏭 Supplier Management

The supplier module allows administrators to:

* Add suppliers
* Update supplier information
* Delete suppliers
* Search suppliers
* Manage supplier capacity
* Monitor supplier-related information

---

## 📦 Inventory Management

The inventory service manages:

* Product stock
* Inventory quantities
* Stock updates
* Inventory availability
* Inventory-related operations

Inventory functionality is separated into a dedicated **Java service**, allowing the system to scale inventory operations independently.

---

## 🛒 Product & Order Management

The system supports:

* Product management
* Product categories
* Shopping/order workflow
* Order creation
* Order history
* Order status management
* Address management
* Default address handling

---

# 🤖 AI Service

The project contains a dedicated **Python AI service** responsible for AI/ML-related processing.

The basic architecture is:

```text
Business Data
     │
     ▼
Python AI Service
     │
     ├── Data Processing
     │
     ├── Feature Analysis
     │
     ├── Prediction / Intelligence
     │
     └── Recommendation
     │
     ▼
Business Decision
```

The AI layer can be used to analyze supply-chain information and provide intelligent recommendations instead of relying only on manually defined rules.

### Possible AI use cases

* Demand forecasting
* Inventory prediction
* Stock shortage detection
* Supplier analysis
* Risk identification
* Product demand analysis
* Supply-chain recommendations

---

# 📊 Report Service

The project includes a dedicated **.NET report service**.

The report service is responsible for transforming business data into useful reports and summaries.

Example workflow:

```text
MongoDB
   │
   ▼
.NET Report Service
   │
   ├── Data Aggregation
   ├── Data Processing
   └── Report Generation
   │
   ▼
Business Report
```

This separation keeps reporting logic independent from the main Node.js application.

---

# 🔄 Order & Inventory Transaction Flow

One important aspect of the system is handling multiple users performing operations at the same time.

For example:

```text
User A ─────┐
            │
User B ─────┼──► Order API ──► Inventory Service
            │
User C ─────┘
                         │
                         ▼
                  Check Stock
                         │
                  ┌──────┴──────┐
                  │             │
                Enough        Not Enough
                  │             │
                  ▼             ▼
            Reserve/Update    Reject Order
                Stock
                  │
                  ▼
             Create Order
```

The system should ensure that inventory updates are performed safely so that simultaneous requests do not incorrectly sell more stock than is available.

MongoDB provides transactional capabilities for operations that require atomicity across multiple documents/collections when configured appropriately.

---

# 🛠️ Technology Stack

| Layer             | Technology                      |
| ----------------- | ------------------------------- |
| Frontend          | React.js                        |
| Backend           | Node.js                         |
| API               | REST APIs                       |
| Inventory Service | Java                            |
| Report Service    | .NET                            |
| AI Service        | Python                          |
| Database          | MongoDB                         |
| Authentication    | JWT / Role-based authentication |
| Version Control   | Git & GitHub                    |

---

# 🎨 Frontend

The frontend is developed using **React.js**.

Main responsibilities:

* User interface
* Authentication screens
* Dashboard
* Product management
* Supplier management
* Inventory management
* Order management
* User management
* Address management
* Reports
* API integration

Typical frontend flow:

```text
React Component
      │
      ▼
Service / API Layer
      │
      ▼
Node.js Backend
      │
      ▼
Microservices / Database
```

---

# 🔌 Backend Architecture

The backend is divided into multiple services rather than putting all business logic into one application.

### Node.js Backend

Handles the primary application APIs and business operations.

```text
React
  │
  ▼
Node.js REST API
  │
  ├── Authentication
  ├── Users
  ├── Products
  ├── Suppliers
  ├── Orders
  └── Addresses
```

### Java Inventory Service

Dedicated service for inventory-related operations.

```text
Node.js
   │
   ▼
Java Inventory Service
   │
   ▼
MongoDB
```

### .NET Report Service

Dedicated service for report generation.

```text
Node.js
   │
   ▼
.NET Report Service
   │
   ▼
MongoDB
```

### Python AI Service

Dedicated service for AI/ML processing.

```text
Node.js / Business Data
          │
          ▼
    Python AI Service
          │
          ▼
      AI Results
```

---

# 🗄️ Database

The project uses **MongoDB** as its primary database.

MongoDB is suitable for this project because supply-chain entities can have flexible and evolving structures.

Example entities include:

```text
Users
Products
Categories
Suppliers
Inventory
Orders
Addresses
```

A simplified relationship can be represented as:

```text
User
 │
 ├── Addresses
 │
 └── Orders
       │
       └── Products
              │
              └── Inventory

Supplier
    │
    └── Products
```

---

# 🔐 Security

The application implements authentication and authorization concepts.

The general authentication flow is:

```text
User Login
    │
    ▼
Node.js Backend
    │
    ▼
Validate Credentials
    │
    ▼
Generate JWT
    │
    ▼
Return Token
    │
    ▼
Frontend Stores Token
    │
    ▼
Authenticated API Requests
```

Authorization can then be used to restrict operations based on user roles.

Example:

```text
Admin
 ├── Manage Users
 ├── Manage Suppliers
 ├── Manage Products
 └── Manage Inventory

Customer/User
 ├── Browse Products
 ├── Manage Address
 └── Place Orders
```

---

# 📡 API Communication

The services communicate using APIs.

Example:

```text
React Frontend
      │
      │ HTTP Request
      ▼
Node.js Backend
      │
      ├──────────────► Java Inventory Service
      │
      ├──────────────► .NET Report Service
      │
      └──────────────► Python AI Service
```

This allows each service to have a specific responsibility.

---

# 📂 Project Structure

```text
AI-Supply-Chain-Management-System
│
├── backend-node
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── middleware
│   └── server.js
│
├── frontend-react
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── assets
│   │   └── App.jsx
│   └── package.json
│
├── java-inventory-service
│   ├── src
│   └── pom.xml
│
├── dotnet-report-service
│   ├── Controllers
│   ├── Services
│   └── *.csproj
│
├── python-ai-service
│   ├── models
│   ├── services
│   └── requirements.txt
│
├── database
│   └── mongodb
│
└── docs
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Anit06/AI-Supply-Chain-Management-System.git

cd AI-Supply-Chain-Management-System
```

---

## 2. Configure MongoDB

Create/configure your MongoDB database and provide the connection string in the backend environment configuration.

Example:

```env
MONGO_URI=mongodb://localhost:27017/supply_chain
```

For MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

**Never commit your actual MongoDB credentials to GitHub.**

---

# ▶️ Run Node.js Backend

```bash
cd backend-node
npm install
npm start
```

For development:

```bash
npm run dev
```

---

# ▶️ Run React Frontend

Open another terminal:

```bash
cd frontend-react
npm install
npm run dev
```

The frontend will normally be available through the Vite development server.

---

# ▶️ Run Java Inventory Service

Navigate to:

```bash
cd java-inventory-service
```

Then run the Spring Boot application using your configured Maven/IDE setup.

For Maven:

```bash
mvn spring-boot:run
```

---

# ▶️ Run .NET Report Service

Navigate to:

```bash
cd dotnet-report-service
```

Then:

```bash
dotnet restore
dotnet run
```

---

# ▶️ Run Python AI Service

Navigate to:

```bash
cd python-ai-service
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it.

### Windows

```bash
venv\Scripts\activate
```

### Linux/macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Then start the AI service using the project's configured entry point.

---

# 🔄 Complete Application Flow

```text
                    USER
                      │
                      ▼
              ┌──────────────┐
              │ React Client │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Node.js API  │
              └──────┬───────┘
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
   Inventory      Reports          AI
    Service       Service        Service
       │             │             │
       └─────────────┼─────────────┘
                     │
                     ▼
                ┌─────────┐
                │ MongoDB │
                └─────────┘
```

---

# 🧠 Why Microservices?

The project separates major responsibilities into independent services.

### Benefits

* Independent development
* Independent deployment
* Easier maintenance
* Better scalability
* Fault isolation
* Technology flexibility
* Easier future expansion

For example, the inventory service can be written in Java while the reporting service can use .NET and the AI service can use Python.

This demonstrates the ability to integrate **multiple technology stacks into a single application architecture**.

---

# 📈 Future Improvements

The system can be extended with:

* 🔮 Advanced demand forecasting
* 🤖 AI chatbot for supply-chain queries
* 📊 Real-time analytics dashboard
* 🚚 Delivery tracking
* 📍 Route optimization
* ⚠️ Supplier risk prediction
* 📦 Automatic inventory replenishment
* 🔔 Real-time notifications
* 🐳 Docker containerization
* ☸️ Kubernetes deployment
* 🔄 CI/CD pipelines
* 📈 Prometheus/Grafana monitoring
* 🔐 Advanced security and API gateway
* ⚡ Redis caching
* 📨 Kafka/RabbitMQ event-driven communication

---

# 🧪 Testing

Testing can be performed at multiple levels:

```text
Unit Testing
     │
     ▼
Integration Testing
     │
     ▼
API Testing
     │
     ▼
End-to-End Testing
```

APIs can be tested using tools such as Postman.

---

# 🚀 DevOps Roadmap

The project can be deployed using a modern DevOps pipeline:

```text
Developer
    │
    ▼
GitHub
    │
    ▼
CI Pipeline
    │
    ├── Build
    ├── Unit Tests
    ├── Integration Tests
    └── Security Scan
    │
    ▼
Docker Images
    │
    ▼
Container Registry
    │
    ▼
Kubernetes
    │
    ▼
Production
```

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

* Full-stack development
* React.js
* Node.js
* REST API development
* Java backend development
* .NET development
* Python AI/ML integration
* MongoDB
* Microservices architecture
* Authentication & authorization
* Database transactions
* API communication
* Git/GitHub
* Software architecture
* AI integration

---

# 👨‍💻 Author

**Anit06**

GitHub:

[@Anit06 on GitHub](https://github.com/Anit06?utm_source=chatgpt.com)

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📜 License

This project is intended for educational and development purposes.
