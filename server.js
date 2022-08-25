const app = require("./app");
require("dotenv").config();

const server = require("http").createServer(app);

const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("new client connected!");
  // socket.on("contact update", (updatedContact) => {
  //   console.log("emit", emit);
  //   io.emit("contact update", updatedContact);
  // });

  socket.on("MESSAGE", ({ message }) => {
    console.log("message", message);
    // io.emit("CHAT_UPDATE", { message, username });
  });
});
app.io = io;

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
