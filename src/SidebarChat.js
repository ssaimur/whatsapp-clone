import React, {useState, useEffect} from 'react'
import './sidebarChat.css';
import { Avatar } from "@material-ui/core";
import db from './Firebase'
import {Link} from 'react-router-dom';

function SidebarChat({addNewChat, id, name}) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        if (id) {
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())));
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 120540))
    }, []);

    const createChat = () => {
        const roomName = prompt("please enter a room name for the chat")

        if (roomName){
            db.collection("rooms").add({
                name: roomName
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebar-chat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebar-chat-info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ): (
        <div className="sidebar-chat" onClick={createChat}>
            <h2>add new chat</h2>
        </div>
    ) ;
}

export default SidebarChat
