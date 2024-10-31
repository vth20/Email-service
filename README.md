# Email Service

**Email Service** is a powerful application built with Deno, providing features such as sending emails, scheduling email sends, and managing message queues using RabbitMQ. This project also integrates MongoDB for data storage and allows users to edit email templates flexibly.

## Features

- **Send Emails**: Send emails to one or multiple recipients with custom content.
- **Schedule Email Sends**: Allow users to schedule emails to be sent at specific times.
- **Message Queue with RabbitMQ**: Utilize RabbitMQ to manage the email sending queue, enhancing processing capabilities and reliability.
- **MongoDB**: Store user data, email sending history, and other related information in a MongoDB database.
- **Edit Email Templates**: Users can create and edit email templates easily, saving time when sending multiple similar emails.
- **Trigger Email Sends with a Button**: Integrate triggers to send emails with just a button click, making it convenient for users.

## Technologies Used

- **Deno**: A modern JavaScript and TypeScript runtime that provides a secure and fast environment for running code.
- **RabbitMQ**: A robust message broker for handling asynchronous tasks.
- **MongoDB**: A NoSQL database for flexible and scalable data storage.
- **Libraries**: Utilizing Deno libraries for email processing, RabbitMQ, and MongoDB connectivity.

## Installation

### Requirements

- Deno (^v2.x)
- RabbitMQ
- MongoDB

### Installation Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/vth20/Email-service.git
   cd email-service
