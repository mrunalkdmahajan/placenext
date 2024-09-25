import express from "express";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

interface INotification {
  type: string;
  message: string;
  id: number;
}

// Array to hold all notifications
let notifications: INotification[] = [];
let notificationId = 0; // To generate unique IDs for notifications

// Endpoint to send a notification
app.post("/send-notification", (req, res) => {
  const { type, message } = req.body;

  if (!type || !message) {
    return res.status(400).json({ error: "Type and message are required." });
  }

  // Create a new notification
  const newNotification: INotification = {
    type,
    message,
    id: ++notificationId, // Increment and assign a new ID
  };

  notifications.push(newNotification); // Store the notification
  console.log("Notification sent:", newNotification); // Log for demonstration

  // Immediate response
  res.status(200).json(newNotification);
});

// Endpoint to send an email (mock implementation)
app.post("/send-email", (req, res) => {
  const { recipient, subject, body } = req.body;

  if (!recipient || !subject || !body) {
    return res
      .status(400)
      .json({ error: "Recipient, subject, and body are required." });
  }

  // Here you would implement the email sending logic (e.g., using nodemailer)

  console.log("Email sent to:", recipient, "with subject:", subject); // Log for demonstration

  // Immediate response
  res.status(200).json({ message: "Email sent successfully." });
});

// Endpoint to retrieve all notifications
app.get("/notifications", (req, res) => {
  res.status(200).json(notifications);
});

// Basic home route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
