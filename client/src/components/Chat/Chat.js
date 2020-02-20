import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import logoIcon from '../../icons/logdna.svg';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Main.css';
import '../InfoBar/InfoBar.css';
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
 const ENDPOINT = 'http://localhost:5001'; 

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
<div class="main">
	<div id="left" class="column">
		<div class="top-left"><img src={logoIcon} className="logodna"/></div>
		<div class="side-bar custom-style">
			{(() => {
			const rows = [];
			for (let i = 0; i < 11; i++) {
			rows.push(<div class="center"><div class="square"><div class="content"></div> </div>one</div>);
			}
			return rows;
			})()}
		</div>
	</div>
	<div id="right" class="column">
		<div class="top-right infoBar">
		<div className="leftInnerContainer">
			Title
		</div>	
		<div className="rightInnerContainer">
			<a href="/">Log out</a>
		</div>
		</div>
		<div class="row">
		
			<div class="feeds">
				<div class="padding borderBottom">
					<p>test</p>
					<div class="block-ellipsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quam massa, ornare at turpis quis, varius pulvinar lorem. Morbi eleifend nisi eget viverra fermentum. Vivamus interdum dui quis orci placerat semper. Morbi lobortis ex sit amet risus cursus pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam luctus leo augue, non facilisis nunc aliquam sed. Aliquam erat volutpat. Nam laoreet cursus nunc, id tincidunt justo. Nullam elit magna, finibus at aliquam ut, blandit vel magna. Phasellus ullamcorper urna a leo luctus vestibulum. Duis posuere leo ac lectus auctor, convallis aliquam odio gravida.</div>
				</div>

			</div>
			<div class="feeds">	
				<div className="padding outerContainer">
					<div className="container">
						<InfoBar room={room} />
						<Messages messages={messages} name={name} />
						<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
					</div>
					{/*  <TextContainer users={users}/> */}
				</div>
			</div>
		</div>
	</div>
</div>

  );
}

export default Chat;