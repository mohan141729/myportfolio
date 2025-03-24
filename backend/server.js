// server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

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
  }
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
