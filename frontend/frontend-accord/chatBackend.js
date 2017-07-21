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
    //this.generateMessageId(myUserId, matchedUserId);
    firebase.database().ref(`/FriendPending`)
    .push()
    .set(
      {
        myUserId: 'waiting',
        matchedUserId: 'waiting'
      }
    );
  }
  // retrieve the messages from the Backend
  // userID IS email (ex: bob@gmail)
  loadMessages(callback, myUserId, matchedUserId, nickname) {
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
          name: nickname,
        },
      });
    };
    //either order by child or order by key
    this.messagesRef.orderByChild('createdAt').on('child_added', onReceive)
  }

  // send the message to the Backend
  sendMessage(message, matchedUserId, myUserId) {
    console.log('Message to be send to firebase is: ', message);
    for (let i = 0; i < message.length; i++) {
      var newMessage = {
        to: matchedUserId,
        from: myUserId,
        text: message[i].text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      }
      console.log('new message is ....', newMessage);
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
