const io = require('socket.io')();

const listOfUsers: { username: string }[] = [];

interface message {
  timestamp: string;
  sender: string;
  message: string;
}

function updateListOfUsers(action: string, sender: string) {
  // add to listOfUsers
  if (action === 'join') {
    listOfUsers.push({
      username: sender,
    });
  }
  // remove from listOfUsers
  else if (action === 'leave') {
    listOfUsers.map((user, index) => {
      if (user.username === sender) {
        listOfUsers.splice(index, 1);
      }
    });
  }
}

// socket.io connection
io.on('connection', function (socket: any) {
  // join
  socket.on('chat join', function (msg: message) {
    //add user to listOfUsers
    updateListOfUsers('join', msg.sender);
    //send listOfUsers
    io.emit('chat users', listOfUsers);
    // send join message
    io.emit('chat join', msg);
  });

  // leave
  socket.on('chat leave', function (msg: message) {
    //remove user from listOfUsers
    updateListOfUsers('leave', msg.sender);
    //send listOfUsers
    io.emit('chat users', listOfUsers);
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
