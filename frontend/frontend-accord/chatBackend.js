import firebase from 'firebase';

class chatBackend {
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    // console.log('AUGUSTUS WAS NOT HERE');
  }

  generateMessageId(myUserId, matchedUserId){
    return (myUserId < matchedUserId) ? (`${myUserId}${matchedUserId}`) : (`${matchedUserId}${myUserId}`);
  }
  setUpFriendPending(myUserId, matchedUserId) {
    var pendingObject = {};
    pendingObject[myUserId] = 'WAITING';
    pendingObject[matchedUserId] = 'WAITING';
    firebase.database().ref(`/FriendPending/${this.generateMessageId(myUserId, matchedUserId)}`)
    .set(pendingObject);
  }

  onLeaveOrConnect(myUserId, matchedUserId, action, navigation) {
    if(action === 'LEAVE') {
      firebase.database().ref(`/FriendPending/${this.generateMessageId(myUserId, matchedUserId)}/${myUserId}`)
      .set('LEAVE')
      .then(() => {
        this.sendExitMessage(matchedUserId, myUserId);
        return firebase.database().ref(`/Message/${this.generateMessageId(myUserId, matchedUserId)}`).set(null);
      })
      .catch(() => {
        console.log('error leaving the chat...');
      });


    } else {
      firebase.database().ref(`/FriendPending/${this.generateMessageId(myUserId, matchedUserId)}/${myUserId}`)
      .set('CONNECT')
    }
    navigation.navigate('AllScreen');
  }
  // retrieve the messages from the Backend
  // userID IS email (ex: bob@gmail)
  // friends nickname
  loadMessages(callback, myUserId, matchedUserId, myNickname, friendNickname) {
    this.messagesRef = firebase.database().ref(`/Message/${this.generateMessageId(myUserId, matchedUserId)}`);
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.from,
          name: (message.from === myUserId) ? myNickname : friendNickname,
        },
      });
    };
    //LISTENS FOR MESSAGES: either order by child or order by key
    this.messagesRef.orderByChild('createdAt').on('child_added', onReceive)
  }

  sendBlurbMessage(message, matchedUserId, myUserId){
    this.messagesRef = firebase.database().ref(`/Message/${this.generateMessageId(myUserId, matchedUserId)}`);
    var newMessage = {
      to: matchedUserId,
      from: myUserId,
      text: "What's on My Mind: " + message,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    }
    this.messagesRef.push(newMessage);
  }

  sendExitMessage(matchedUserId, myUserId){
    this.messagesRef = firebase.database().ref(`/Message/${this.generateMessageId(myUserId, matchedUserId)}`);
    var newMessage = {
      to: matchedUserId,
      from: myUserId,
      text: 'via Accord: It was a pleasure talking to you. I have left the room.',
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    }
    this.messagesRef.push(newMessage);
  }

  // send the message to the Backend
  sendMessage(message, matchedUserId, myUserId) {
    for (let i = 0; i < message.length; i++) {
      var newMessage = {
        to: matchedUserId,
        from: myUserId,
        text: message[i].text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      }
      this.messagesRef.push(newMessage);
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new chatBackend();
