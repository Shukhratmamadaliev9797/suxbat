const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Env config
dotenv.config();

// Initialize express
const app = express();

// Convert data to JSON
app.use(express.json());

// Access control allow origin
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// File upload
app.use(fileUpload({ useTempFiles: true }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

// Dynamically load routes
const routesDir = path.join(__dirname, "routes");
const routeFiles = readdirSync(routesDir);

routeFiles.forEach((routeFile) => {
  if (routeFile.endsWith(".js")) {
    const routePath = path.join(routesDir, routeFile);
    const route = require(routePath);
    app.use("/", route);
    console.log(`Route ${routeFile} mounted`);
  }
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUserid = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUserid(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Port setup
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
