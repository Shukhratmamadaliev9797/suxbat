const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const socketUrl = process.env.SERVER_SOCKET || `http://localhost:${PORT}`;
const io = require("socket.io")(http.createServer(app), {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  },
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/suxbat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

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
  console.log("a user connected.");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUserid(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
