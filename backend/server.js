// server.js
require('dotenv').config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("projects.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    // Create projects table
    db.run(
      `CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        detailedDescription TEXT,
        image TEXT,
        category TEXT,
        programmingLanguages TEXT,
        skills TEXT,
        projectLink TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Error creating projects table:", err.message);
        }
      }
    );

    // Create feedback table
    db.run(
      `CREATE TABLE IF NOT EXISTS feedback (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT,
         email TEXT,
         message TEXT
       )`,
      (err) => {
        if (err) {
          console.error("Error creating feedback table:", err.message);
        }
      }
    );

    // Create admin_details table
    db.run(
      `CREATE TABLE IF NOT EXISTS admin_details (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         address TEXT,
         email TEXT,
         phone TEXT
       )`,
      (err) => {
        if (err) {
          console.error("Error creating admin_details table:", err.message);
        } else {
          // Insert default admin details if table is empty
          db.get("SELECT COUNT(*) as count FROM admin_details", (err, row) => {
            if (err) {
              console.error("Error counting admin_details:", err.message);
            } else if (row.count === 0) {
              db.run(
                "INSERT INTO admin_details (address, email, phone) VALUES (?, ?, ?)",
                ["123 Main Street, Izmir, Turkey", "info@example.com", "123-456-7890"],
                (err) => {
                  if (err) {
                    console.error("Error inserting default admin details:", err.message);
                  } else {
                    console.log("Default admin details inserted.");
                  }
                }
              );
            }
          });
        }
      }
    );

    // Create admin_credentials table
    db.run(
      `CREATE TABLE IF NOT EXISTS admin_credentials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        email_password TEXT,
        password TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Error creating admin_credentials table:", err.message);
        } else {
          // Insert default admin credentials if table is empty
          db.get("SELECT COUNT(*) as count FROM admin_credentials", (err, row) => {
            if (err) {
              console.error("Error counting admin_credentials:", err.message);
            } else if (row.count === 0) {
              db.run(
                "INSERT INTO admin_credentials (email, email_password, password) VALUES (?, ?, ?)",
                ["techlearn2005@gmail.com", "lsck bvfx zutt sgfw", "admin123"],
                (err) => {
                  if (err) {
                    console.error("Error inserting default admin credentials:", err.message);
                  } else {
                    console.log("Default admin credentials inserted.");
                  }
                }
              );
            }
          });
        }
      }
    );
  }
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'techlearn2005@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'lsck bvfx zutt sgfw'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration on server start
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP configuration error:', error);
    console.log('\nTo fix this error:');
    console.log('1. Enable 2-Step Verification on your Google Account');
    console.log('2. Generate an App Password at https://myaccount.google.com/apppasswords');
    console.log('3. Update the EMAIL_PASSWORD environment variable with the new App Password\n');
  } else {
    console.log('SMTP server is ready to send messages');
  }
});

// Store verification codes with timestamps
const verificationCodes = new Map();

// Generate a random 6-digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Admin login with verification endpoint
app.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // First check if the email exists in admin_credentials
    db.get("SELECT * FROM admin_credentials WHERE email = ?", [email], async (err, row) => {
      if (err) {
        console.error("Error checking admin credentials:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!row) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate and send verification code
      const code = generateVerificationCode();
      const timestamp = Date.now();
      
      // Store the code with timestamp
      verificationCodes.set(email, { code, timestamp, password });

      // Send verification email
      const mailOptions = {
        from: process.env.EMAIL_USER || 'techlearn2005@gmail.com',
        to: email,
        subject: 'Admin Login Verification Code',
        html: `
          <h2>Admin Login Verification</h2>
          <p>Your verification code is: <strong>${code}</strong></p>
          <p>This code will expire in 5 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending verification email:", error);
          return res.status(500).json({ error: "Failed to send verification code" });
        }
        res.json({ message: "Verification code sent successfully" });
      });
    });
  } catch (error) {
    console.error('Error in admin login:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Verify code and complete login endpoint
app.post('/verify-admin-login', (req, res) => {
  try {
    const { email, code } = req.body;
    
    const storedData = verificationCodes.get(email);
    if (!storedData) {
      return res.status(400).json({ error: 'No verification code found for this email' });
    }

    const { code: storedCode, timestamp, password } = storedData;
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    if (now - timestamp > fiveMinutes) {
      verificationCodes.delete(email);
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    if (code !== storedCode) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Code is valid, verify password
    db.get("SELECT * FROM admin_credentials WHERE email = ? AND password = ?", 
      [email, password], (err, row) => {
        if (err) {
          console.error("Error verifying admin credentials:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (!row) {
          return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
          { email: row.email, id: row.id },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );

        // Remove the used verification code
        verificationCodes.delete(email);
        
        res.json({ 
          message: "Login successful",
          token,
          admin: {
            email: row.email
          }
        });
    });
  } catch (error) {
    console.error('Error verifying admin login:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a test endpoint to verify the server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// ----------------- PROJECT ENDPOINTS ----------------- //

app.get("/projects", (req, res) => {
  db.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post("/projects", (req, res) => {
  const { title, description, detailedDescription, image, category, programmingLanguages, skills, projectLink } = req.body;
  if (!title || !description || !detailedDescription || !image || !category || !programmingLanguages || !skills || !projectLink) {
    return res.status(400).json({ error: "All fields are required" });
  }
  db.run(
    "INSERT INTO projects (title, description, detailedDescription, image, category, programmingLanguages, skills, projectLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [title, description, detailedDescription, image, category, programmingLanguages, skills, projectLink],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        id: this.lastID,
        title,
        description,
        detailedDescription,
        image,
        category,
        programmingLanguages,
        skills,
        projectLink,
      });
    }
  );
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, detailedDescription, image, category, programmingLanguages, skills, projectLink } = req.body;
  db.run(
    "UPDATE projects SET title = ?, description = ?, detailedDescription = ?, image = ?, category = ?, programmingLanguages = ?, skills = ?, projectLink = ? WHERE id = ?",
    [title, description, detailedDescription, image, category, programmingLanguages, skills, projectLink, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ message: "Project updated successfully" });
    }
  );
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM projects WHERE id = ?", id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  });
});

// ----------------- FEEDBACK ENDPOINTS ----------------- //

app.get("/feedback", (req, res) => {
  db.all("SELECT * FROM feedback", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post("/feedback", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  db.run(
    "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        id: this.lastID,
        name,
        email,
        message,
      });
    }
  );
});

app.delete("/feedback/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM feedback WHERE id = ?", id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  });
});

// ----------------- ADMIN DETAILS ENDPOINTS ----------------- //

// GET admin details
app.get("/admin-details", (req, res) => {
  db.get("SELECT * FROM admin_details LIMIT 1", (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Admin details not found" });
    }
    res.json(row);
  });
});

// PUT (update) admin details
app.put("/admin-details", (req, res) => {
  const { address, email, phone } = req.body;
  if (!address || !email || !phone) {
    return res.status(400).json({ error: "All admin details fields are required" });
  }
  db.run(
    "UPDATE admin_details SET address = ?, email = ?, phone = ? WHERE id = (SELECT id FROM admin_details LIMIT 1)",
    [address, email, phone],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        // If no row was updated, insert a new row
        db.run(
          "INSERT INTO admin_details (address, email, phone) VALUES (?, ?, ?)",
          [address, email, phone],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, address, email, phone });
          }
        );
      } else {
        res.json({ message: "Admin details updated successfully" });
      }
    }
  );
});

// Add an endpoint to check admin email
app.get('/admin-email', (req, res) => {
  db.get("SELECT email FROM admin_details WHERE id = 1", (err, row) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    if (!row) {
      return res.status(404).json({ error: "Admin email not found" });
    }
    res.json({ email: row.email });
  });
});

// Send verification code for credential update
app.post('/send-update-verification', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if the email exists in admin_credentials
    db.get("SELECT * FROM admin_credentials WHERE email = ?", [email], (err, row) => {
      if (err) {
        console.error("Error checking admin credentials:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!row) {
        return res.status(401).json({ error: "Invalid email address" });
      }

      // Generate and send verification code
      const code = generateVerificationCode();
      const timestamp = Date.now();
      
      // Store the code with timestamp
      verificationCodes.set(email, { code, timestamp });

      // Send verification email
      const mailOptions = {
        from: process.env.EMAIL_USER || 'techlearn2005@gmail.com',
        to: email,
        subject: 'Admin Credentials Update Verification',
        html: `
          <h2>Admin Credentials Update Verification</h2>
          <p>You have requested to update your admin credentials.</p>
          <p>Your verification code is: <strong>${code}</strong></p>
          <p>This code will expire in 5 minutes.</p>
          <p>If you didn't request this update, please ignore this email and contact support immediately.</p>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending verification email:", error);
          return res.status(500).json({ error: "Failed to send verification code" });
        }
        res.json({ message: "Verification code sent successfully" });
      });
    });
  } catch (error) {
    console.error('Error in send-update-verification:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update admin credentials endpoint
app.post('/update-admin-credentials', async (req, res) => {
  try {
    const { email, verificationCode, newEmail, newEmailPassword, newPassword } = req.body;

    // First verify the code
    const storedData = verificationCodes.get(email);
    if (!storedData) {
      return res.status(400).json({ error: 'No verification code found for this email' });
    }

    const { code: storedCode, timestamp } = storedData;
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    if (now - timestamp > fiveMinutes) {
      verificationCodes.delete(email);
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    if (verificationCode !== storedCode) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Validate new credentials
    if (!newEmail || !newEmailPassword || !newPassword) {
      return res.status(400).json({ error: 'All new credentials are required' });
    }

    // Check if new email is already in use
    db.get("SELECT * FROM admin_credentials WHERE email = ? AND id != 1", [newEmail], (err, row) => {
      if (err) {
        console.error("Error checking email availability:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (row) {
        return res.status(400).json({ error: "New email is already in use" });
      }

      // Update credentials
      db.run(
        `UPDATE admin_credentials 
         SET email = ?, email_password = ?, password = ?
         WHERE id = 1`,
        [newEmail, newEmailPassword, newPassword],
        function(err) {
          if (err) {
            console.error("Error updating admin credentials:", err);
            return res.status(500).json({ error: "Failed to update admin credentials" });
          }

          // Update admin_details table email as well
          db.run(
            "UPDATE admin_details SET email = ? WHERE id = 1",
            [newEmail],
            (err) => {
              if (err) {
                console.error("Error updating admin_details:", err);
                return res.status(500).json({ error: "Failed to update admin details" });
              }

              // Update email configuration
              transporter.set("auth", {
                user: newEmail,
                pass: newEmailPassword
              });

              // Remove the used verification code
              verificationCodes.delete(email);
              
              res.json({ message: "Admin credentials updated successfully" });
            }
          );
        }
      );
    });
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    res.status(500).json({ error: 'Failed to update admin credentials' });
  }
});

// Get admin credentials endpoint
app.get('/admin-credentials', (req, res) => {
  db.get("SELECT email, password FROM admin_credentials WHERE id = 1", (err, row) => {
    if (err) {
      console.error("Error fetching admin credentials:", err);
      return res.status(500).json({ error: "Failed to fetch admin credentials" });
    }
    if (!row) {
      return res.status(404).json({ error: "Admin credentials not found" });
    }
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
