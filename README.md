# Overview

As a software developer, I am continuously improving my skills in full-stack web development by building applications that solve real-world problems. This project allowed me to gain hands-on experience with frontend development, backend APIs, database integration, and software architecture patterns.

The Security Incident Reporting System is a web application that enables users to submit security incidents and view previously reported incidents. The application stores incident data in a SQLite database and retrieves it dynamically through REST API endpoints built with Node.js and Express.

To run the application locally:

1. Open a terminal in the project folder.
2. Install dependencies using:

```bash
npm install
```

3. Start the server using:

```bash
node server.js
```

4. Open a web browser and navigate to:

```txt
http://localhost:3000
```

The application home page will load and provide navigation to report incidents or view reported incidents.

The purpose of writing this software was to strengthen my understanding of web application development by creating a complete full-stack solution that integrates a user interface, backend services, and a database. Through this project, I learned how data flows between the frontend and backend, how to persist data using SQLite, and how to organize code using the MVC architectural pattern.

Software Demo Video:

[Software Demo Video](https://byupw.zoom.us/rec/share/_btEWCB9CL4QQibvO8UfSAFDDp2mFvc-f-d2vif5GjET0qpYFgB6pl-DRdry5UOL.HKRRKt58vbFl4kM5 

Passcode: DFC10x&@)

# Web Pages

### Home Page (index.html)

The home page serves as the landing page of the application. It displays the Nigeria Coat of Arms, Nigerian flag, a motivational security quote, and a live date and time display. Users can navigate to either the Report Incident page or the View Reports page using the available buttons.

### Report Incident Page (reports.html)

This page contains a form that allows users to submit security incidents. Users enter the incident title, location, and description. When the form is submitted, JavaScript sends the data to the backend API, which stores it in the SQLite database.

### View Reports Page (view.html)

This page dynamically retrieves incident reports from the backend API and displays them as styled cards. Each card shows the incident title, location, description, and date reported. The content displayed on this page is generated dynamically from records stored in the database.

### Navigation Flow

The application starts on the Home Page. Users can navigate to:

* Report Incident Page to create a new incident report.
* View Reports Page to view all reported incidents.

After submitting a report, users can navigate to the View Reports page to see the newly added incident displayed dynamically.

# Development Environment

### Tools Used

* Visual Studio Code
* Node.js
* SQLite
* Git and GitHub
* Google Chrome Developer Tools

### Programming Languages and Libraries

Languages:

* HTML
* CSS
* JavaScript

Backend Technologies:

* Node.js
* Express.js

Database:

* SQLite3

Libraries and Packages:

* express
* sqlite3
* cors
* path

Architecture Pattern:

* MVC (Model-View-Controller)

# Useful Websites

* https://developer.mozilla.org/
* https://expressjs.com/
* https://www.sqlite.org/docs.html
* https://nodejs.org/en/docs
* https://stackoverflow.com/
* https://www.w3schools.com/

# Future Work

* Add user authentication and authorization.
* Create an admin dashboard for managing incident reports.
* Add severity levels (Low, Medium, High, Critical) to incidents.
* Implement automatic archiving or deletion of incidents after a specified period.
* Improve mobile responsiveness and user experience.
* Add search and filtering functionality for incident reports.
* Implement image upload capability for incident evidence.
* Deploy the application to a cloud hosting platform.
