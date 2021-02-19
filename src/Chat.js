import React, {useState, useEffect} from 'react'
import './chat.css'
import { Avatar, IconButton } from "@material-ui/core";
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom';
import db from './Firebase';
import firebase from 'firebase'
import { useStateValue } from "./StateProvider";


function Chat() {
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())));
        }
    })

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 120540))
    }, [roomName]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput('')
    }

    return (
        <div className='chat'>
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat-header-info">
                    <h3>{roomName}</h3>
                    <p>
                        last Seen {' '}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat-header-right">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat-body">
                {
                    messages.map(item => {
                        return (
                            <p className={`chat-message ${item.name === user.displayName && "chat-reciever"}`}>
                                <span className='chat-name'>{item.name}</span>
                                {item.message}
                                <span className='time-stamp'>{new Date(item.timestamp?.toDate()).toUTCString()}</span>
                            </p>
                        )
                    })
                }
            </div>
            <div className="chat-footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                        type="text" 
                        placeholder='Type a message' 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                    />
                    <button type='submit' onClick={sendMessage} >send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
