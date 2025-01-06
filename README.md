# 🔍 User Behaviour Analysis Using Machine Learning

Welcome to the **User Behaviour Analysis Using Machine Learning** project repository by **Hack Slayers**!

## 👨‍💻 Team Members
- **Devadharshini S**
- **Kanishka Varshni K**    
- **Satheesh Kumar K**

## 🌟 Project Overview
- A secure web application designed to monitor and analyze user behavior using machine learning.
- Detects SQL injection attacks in real-time and provides actionable insights via a user-friendly dashboard.
- Sends automated SMS alerts to the admin for immediate security action.

## 🌐 **Live Demo:** Experience the project in action [here](https://cyber-drab.vercel.app/).

---

## 🎯 Aim and Objectives

### **Aim**  
- Enhance network security by effectively detecting and mitigating SQL injection attacks using machine learning.

### **Objectives**
- 🔒 Build a real-time monitoring system to track user activity and provide attack statistics.  
- 🤖 Use machine learning algorithms to identify SQL injection patterns.  
- 📲 Implement automated SMS alerts via Twilio API.  
- 🧾 Maintain detailed login activity logs for accountability and auditing.  

---

## 🛠 Key Features

### **Dashboard Highlights**
- 📊 **Attack Metrics**: Real-time updates on detected attacks.  
- 🌍 **Unique IP Tracking**: Displays the number of unique IP addresses accessing the system.  
- 🔍 **Common Attack Types**: Provides insights into frequently occurring attack patterns.  
- ✉ **SMS Notifications**: Tracks the number of alerts sent to the admin.  

### **Visualizations**
- 📈 Interactive charts showcasing monthly attack trends.  
- 📝 Tabular logs of user activities, including login time, IP address, and session duration.  

---

## 🖥 Technology Stack

### **Frontend**
- ⚛ React with TypeScript for interactive and user-friendly interfaces.  
- 🎨 CSS for visually appealing styling.  

### **Backend**
- 🟢 Node.js for backend logic and machine learning integration.  
- 🛠 Prisma ORM for seamless database communication.  

### **Machine Learning**
- 🌲 Isolation Forest algorithm implemented in Node.js for real-time anomaly detection.  

### **Database**
- 🐘 PostgreSQL for secure and efficient data storage.  

### **Visualization**
- 📊 Chart.js and D3.js for dynamic graphs and charts.  

### **Alerts**
- 📲 Twilio API for SMS notifications to the admin.

---

## 🤖 Machine Learning Integration

- **Algorithm**: Isolation Forest to detect anomalies in SQL query patterns.  
- **Model Training**: Trained on labeled datasets to distinguish between normal and malicious requests.  
- **Deployment**: Integrated with the Node.js backend for real-time analysis.  

---

## 📚 Use Cases

- **Enterprise Security**: Detects unauthorized access and alerts admins in real-time.  
- **E-Commerce**: Prevents data breaches by identifying malicious query patterns.  
- **Educational Platforms**: Secures sensitive student and faculty data.  
- **Financial Systems**: Detects anomalies in transaction patterns to prevent fraud.  

---

## 🚀 Deployment and Future Scope

### **Deployment Strategy**
- 🌩 Hosted on Google Firebase for scalability and low latency.  
- 🔄 Real-time processing of user requests and automated alerts.  

### **Future Enhancements**
- 🛡 Expand detection to other attacks like XSS, DDoS, and brute force.  
- 🧠 Incorporate deep learning for enhanced threat detection.  
- 🔄 Continuous retraining of machine learning models for improved accuracy.  

---

## 📜 How to Run the Project

### **Prerequisites**
- Install [Node.js](https://nodejs.org/).  
- Install PostgreSQL.  
- Sign up for Twilio for SMS alerts.  

### **Steps**
1. Clone the repository:
   bash
   git clone https://github.com/your-repository-link.git
   
2. Navigate to the project directory:
   bash
   cd project-directory
   
3. Install dependencies:
   bash
   npm install
   
4. Configure environment variables:
   - Create a `.env` file and add the following:
     env
     DATABASE_URL=your-postgresql-database-url
     TWILIO_ACCOUNT_SID=your-twilio-account-sid
     TWILIO_AUTH_TOKEN=your-twilio-auth-token
     TWILIO_PHONE_NUMBER=your-twilio-phone-number
     
5. Start the application:
   bash
   npm start
   
6. Access the app at `http://localhost:3000`.

---

## 🌐 **Live Demo**

Click the link below to experience the project in action:  
[**https://cyber-drab.vercel.app/**](https://cyber-drab.vercel.app/)

