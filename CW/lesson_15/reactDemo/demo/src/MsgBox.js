import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Здравствуйте!</h1>
      {unreadMessages.length > 0 &&
        <h2>У вас {unreadMessages.length} непрочитанных сообщений.</h2>
      }
    </div>
  );
}


export default Mailbox;
