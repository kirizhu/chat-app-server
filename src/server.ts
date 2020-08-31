const io = require('socket.io')();

const userlist: { username: string }[] = [];

interface message {
  timestamp: string;
  sender: string;
  message: string;
}

function updateUserlist(action: string, sender: string) {
  // add to userlist
  if (action === 'join') {
    console.log(userlist);
    userlist.push({
      username: sender,
    });
  }
  // remove from userlist
  else if (action === 'leave') {
    userlist.map((user, index) => {
      if (user.username === sender) {
        userlist.splice(index, 1);
      }
    });
  }
}

// socket.io connection
io.on('connection', function (socket: any) {
  // join
  socket.on('chat join', function (msg: message) {
    //add user to userlist
    updateUserlist('join', msg.sender);
    //send userlist
    io.emit('chat users', userlist);
    // send join message
    io.emit('chat join', msg);
  });

  // leave
  socket.on('chat leave', function (msg: message) {
    //remove user from userlist
    updateUserlist('leave', msg.sender);
    //send userlist
    io.emit('chat users', userlist);
    // send leave message
    io.emit('chat leave', msg);
  });

  // message
  socket.on('chat message', function (msg: message) {
    // send message
    io.emit('chat message', msg);
  });
});

io.listen(3001, () => console.log('Socket.io server running on port 3001'));
