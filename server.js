const io = require('socket.io')();

// generate userlist displayed on the right in browser
let userlist = [];

// socket.io connection open
io.on('connection', function (socket) {
  // join
  socket.on('chat join', function (msg) {
    //TODO: add user to userlist

    //TODO: send userlist

    // send join message
    io.emit('chat join', msg);
  });

  // leave
  socket.on('chat leave', function (msg) {
    //TODO: remove user from userlist

    //TODO: send userlist

    // send leave message
    io.emit('chat leave', msg);
  });

  // message
  socket.on('chat message', function (msg) {
    // send message
    io.emit('chat message', msg);
  });
});

io.listen(3001);
