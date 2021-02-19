import React, { useState, useEffect } from 'react'
import './sidebar.css'
import SidebarChat from "./SidebarChat";
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import db from './Firebase'
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
    
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => setRooms(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
        }))));
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar-header-right">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-search-container">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="search or start a new chat" />
                </div>
            </div>
            <div className="sidebar-chats">
                <SidebarChat addNewChat />
                {
                    rooms.map(item => {
                        return (
                            <SidebarChat key={item.id} id={item.id} name={item.data.name} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar
