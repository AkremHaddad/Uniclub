Tunisian Republic

Ministry of Higher Education and Scientific Research

University Of Monastir

Faculty of Sciences Of Monastir

Project Report :

”Club Events Management Platform”

Realized By
Ghassen Achour, Akram Haddad, Saber Berriche, Islem Ben Khalifa

Academic Year 2023/2024

1

Acknowledgments

We would like to take the chance we’ve got to say thank you to Ms.Moumina cheikh ahmed baba for guiding us on
this journey to learn how to build this project in a short period of time, she fueled our motivation to learn new
technologies and explore beyond our boundaries. So thank you for your effort and dedication.

2

Contents

General Introduction

1 Project Overview

1.1
Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.2 Problem Statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.3 Existing Solutions
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.4 Envisioned Solution . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.5 Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.5.1 Functional Requirements
1.5.2 None-Functional Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.6 Conclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

2 Project Conception

Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.1
2.2
Identification of Actors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.3 Use Case Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.4 Class Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.5 Sequence Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Sequence Diagram User Login . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Sequence Diagram Event Management . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . .
Sequence Diagram Joining a Club or an Event
2.6 Conclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

2.5.1
2.5.2
2.5.3

3 Project Development

3.1
Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.2 Hardware and Software Environment . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Software Environment . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3 User Interface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.4 Conclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

3.2.1 Hardware Environment
3.2.2

4 General Conclusion

5 Bibliography

4

4
4
4
4
5
5
5
5
5

6
6
6
7
8
9
9
10
10
10

11
11
11
11
11
12
14

14

14

3

General Introduction

The Faculty of Sciences of Monastir is a host for a diverse and rich club scene, these student-led clubs put in a

tremendous effort each year to organize an array of events and activities. The primary goal of these initiatives is
to attract students to the world of associative life, providing them with opportunities to grow their personalities
and develop a diverse set of skills.

Despite the incredible benefits[1] these events offer and their widespread availability, the rate of student

interest and participation appears to be relatively low. This phenomenon can be attributed to several factors, but
the main culprit seems to be the lack of exposure. One of the key reasons for the low interest is the limited
awareness among students about the existence and benefits of these clubs and their activities. Many students may
not even be aware of the diverse range of clubs and the enriching experiences they offer. This lack of exposure can
be due to several factors, such as inadequate promotion, poor communication, or a disconnect between the club
organizers and the student body.
Furthermore, the accessibility and visibility of these clubs and their events may also play a role. If the information
about the clubs and their activities is not easily accessible or prominently displayed, it can discourage students
from getting involved. Additionally, the timing and scheduling of these events may not align with the students’
academic and personal commitments, making it challenging for them to participate.

To address these difficulties, it is important to find a better approach to help students be more aware of the
events taking place at their college and help clubs consistently reach a wider audience of students while trying to
promote their events and activities.
This solution should be able to make club activities available for consultation under a digital platform open to all
students.

That is what gave birth to the idea of our project, a web platform that makes associative life more accessible.

This report will discuss the General Overview of the project, the Project Conception, and finally the Project
Development, wrapping it up with a general conclusion.

1 Project Overview

1.1

Introduction

This chapter aims to introduce the project idea and objectives. Our starting point will be identifying the

problem then discussing existing solutions and presenting ours.

1.2 Problem Statement

Due to the low attendance rates of events in the college scene clubs are growing less and less motivated to put

in effort in organizing activities that students could highly benefit from.
Sadly this leads to students getting fewer chances to develop their technical skills and their soft skills, which will
leave them unprepared for professional life.

1.3 Existing Solutions

At the current time, students are exposed to club activity mainly in two ways. First, social media, each club

has accounts on social media platforms where they try to promote their activities to the highest amount of
students they can reach. The main issue with this approach is that students would have to follow these club pages
and trust social media algorithms to consistently show them all the activities of said clubs, which means students
would either have to discover the existence of said club by accident or through other means before they will be
able to follow the social media page.
Second, the college’s website section that is dedicated to club activities[2]. Sadly said page only provides basic
information about the clubs and events, which haven’t been updated in a few years, this solution can’t be trusted
to consistently and reliably provide students with real-time updated information that introduces students to
future events.

4

1.4 Envisioned Solution

All that is mentioned above leads us to a solution we envisioned to solve this issue, in a reliable way, a Web

Platform, a haven for clubs and students alike to engage with.

This platform will provide a space for clubs to post their events and promote their activities to students,
allowing them at the same time to introduce their club to a targeted audience, recruit new members, and keep
their audience updated with relevant changes to their event schedules, etc.
For students, this platform will allow them to keep track of events in the college space and relevant updates, join
clubs, show interest in events, and register their own clubs, while interacting with an AI system that helps them
discover events and clubs through recommendations.

1.5 Requirements

1.5.1 Functional Requirements

Functional Requirements consist of realizable actions by the actors that can engage with the platform.

- Admin can manage users from a dashboard
- Admin can manage clubs from a dashboard
- Club Owner can manage posts through the club page
- Club Owner can manage events through the club page
- Club Owner can manage members through the club page
- Students can follow clubs and events
- Students can consult newsfeed and calendar
- Students can request to join a club
- Students can request to register a club

1.5.2 None-Functional Requirements

Non-functional requirements describe the constraints that must be respected by the platform. They define
criteria that can be used to evaluate the project. They are the qualities that the system must have. In the context
of our project, the following non-functional requirements have been identified:

- Performance: The platform has to be able to support a high number of users and traffic consistently.
- Availability: The platform has to be available online at all times with real-time data updates.
- Security: The data and the user account information have to be stored in a secure and stable database

management system.

- Usability: The platform UI has to be none complicated and easy for new users to adapt to and

understand.

1.6 Conclusion

This section discussed the basic idea of the solution we have envisioned for the problem of lack of exposure to
the clubs’ activities. evaluated the already available solutions for the said problem, and what makes our solution
different. We can now move on to a more practical analysis and talk about the conception.

5

2 Project Conception

2.1

Introduction

After explaining the theoretical idea of our project, we can go forward with the conception, this step guides
the development of our solution and it also allows us to identify the way in which our users will be able to interact
with it.

2.2

Identification of Actors

An actor is an entity that interacts with our solution, in this context, we can identify three actors:

- Admin: User responsible for managing the clubs and student accounts

- Club Owner: User that manages their own club, whether it is information and details about the club or

activities and events, manifested as posts or events on the calendar page

- Student: User that interacts with the newsfeed, events through the calendar, The AI recommendation

system, and club pages.

6

2.3 Use Case Diagram

Wikipedia explains that the use case diagram is a type of UML (Unified Modeling Language) diagram. This
diagram is used to model the functionality of a system from the perspective of the system’s users or ”actors.” The
use case diagram allows you to identify and visualize the different use cases, which represent the specific tasks or
goals that the actors can accomplish using the system.

7

2.4 Class Diagram

In the context of object-oriented software engineering, Wikipedia describes the class diagram as a type of
UML (Unified Modeling Language) diagram. This diagram serves to represent the classes within a system and the
relationships between them. The class diagram enables the visualization of the system’s classes, including their
attributes, methods, and how they are interconnected.

8

2.5 Sequence Diagram

This particular diagram is employed to model the dynamic interactions that occur between objects within a

system over time. The sequence diagram according to Wikipedia, focuses on capturing the order in which
messages are passed between different objects, illustrating the sequence of method calls and the data exchanged
during these interactions. This allows for the visualization of the control flow and the collaborative behaviors
exhibited by the system’s components as they execute a specific use case or scenario.

2.5.1 Sequence Diagram User Login

This diagram represents the login process, explaining how the data requires verification from the database.

9

2.5.2 Sequence Diagram Event Management

This diagram goes through event management which is functionality associated with the club owner.

2.5.3 Sequence Diagram Joining a Club or an Event

This diagram addresses the process of a user joining a club or an event set up by a club.

2.6 Conclusion

We’ve discussed the conceptual phase of our project in this chapter, starting by identifying the actors and then
presenting the necessary diagrams, which leads us to the final phase, the development phase.

10

3 Project Development

3.1

Introduction

The purpose of this chapter is to showcase the product that has resulted from this project. It covers the
development and implementation phase, which utilizes specific technologies and software.

3.2 Hardware and Software Environment

3.2.1 Hardware Environment

Laptop 1:

Processor
Ram
OS
Hard Drive

Ryzen 7 4800H
16GB
Windows 11
512GB

Laptop 2:

Processor
Ram
OS
Hard Drive

Intel i7-7700HQ
16GB
Windows 10
1TB

Laptop 3:

Processor
Ram
OS
Hard Drive

Intel i5-1235U
8GB
Windows 10
512GB

Laptop 4:

Processor
Ram
OS
Hard Drive

Intel i5-1135G7
16GB
Windows 11
512GB

3.2.2 Software Environment

HTML: standard markup language used to create and structure web
pages.[3]

CSS: style sheet language used to describe the presentation and ap-
pearance of a web page.[4]

JQUERY: JavaScript library that simplifies and abstracts away many
of the complex tasks involved in client-side web development.[5]

NODE JS: a JavaScript runtime environment that allows developers
to run JavaScript code outside of a web browser.[6]

11

EXPRESS JS: web application framework for Node.js. It provides a
robust set of features for building web and mobile applications using
Node.js.[7]

MONGOOSE: Object Document Mapping (ODM) library for Mon-
goDB and Node.js. It provides a higher-level abstraction on top of the
MongoDB driver.[8]

MONGODB: open-source, document-oriented NoSQL database sys-
tem. It is designed to be scalable, flexible, and well-suited for modern
web applications.[9]

PYTHON: high-level, general-purpose programming language that is
widely used for a variety of applications, including web development,
data analysis, machine learning, and artificial intelligence.[10]

3.3 User Interface

This is the home page which consists of a newsfeed filled with posts made by club owners accessible to all visitors
of the platform.

12

This is the login popup that the user can access from the navigation bar to log in to their account whether they
are a student or a club owner.

This is the club page where the club owner can consult different tabs to access different functionalities like editing
details about the club or creating posts and events.

13

This is the calendar where events get posted, users can consult this calendar to check out the events schedule.

3.4 Conclusion

We’ve listed the technologies and tools that helped us develop this solution and we’ve talked about the user

interface, all that is left to do now is to present our general conclusion.

4 General Conclusion

Throughout this report, we’ve highlighted the need for this project while critiquing the already existing solutions,
we’ve discussed UML diagrams that enabled us to envision this project in a more clear and precise way, and we’ve
analyzed the steps that needed to be taken to make it a reality.
If implemented correctly, this project could revive the associative life on our college campus and help students
take advantage of the activities provided by clubs, which will lead to more and more of them graduating with a
high skill set, ready to face the complexities of professional life.
Despite the simplicity of this project, it is capable of playing an important role in building a better experience for
the average student on college campus. This project is also scalable and adaptable to any college, which is
important to note.

5 Bibliography

[1] U.S.A National Library of Medicine URL:https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7345550/
[2] Facult´e des Sciences de Monastir https://fsm.rnu.tn/fra/articles/categorie/p/1/29/activites-des-clubs
[3] Wikipedia https://en.wikipedia.org/wiki/HTML
[4] Wikipedia https://en.wikipedia.org/wiki/CSS
[5] Wikipedia https://en.wikipedia.org/wiki/JQuery
[6] Wikipedia https://en.wikipedia.org/wiki/Node.js
[7] Wikipedia https://en.wikipedia.org/wiki/Express.js
[8] Wikipedia https://en.wikipedia.org/wiki/Mongoose(M ongoDB)
[9] Wikipedia https://en.wikipedia.org/wiki/MongoDB
[10] Wikipedia https://en.wikipedia.org/wiki/Python(programminglanguage)

14

