import React, { useState, useEffect } from 'react';
import "./Chat.css";
import {useParams} from 'react-router-dom';
import StarBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import db from "./firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Chat(){
    const {roomId} = useParams();
    const [roomDetails, setRoomDetails]=useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(()=>{
        if (roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot)=>{
                setRoomDetails(snapshot.data());
            })
        }

        db.collection('rooms').doc(roomId)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot( (snapshot) => {setRoomMessages(
                snapshot.docs.map((doc)=>doc.data())
            )

            const chatBox = document.getElementById('chat');

            function scrollToBottom (node) {
                node.scrollTop = node.scrollHeight;
            }

            scrollToBottom(chatBox);

        });
    },[roomId]);

    return (
        <div className="chat" id="chat">
            <div className="chat_header">
                <div className="chat_headerLeft">
                    <h4 className="chat_channelName">
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderOutlineIcon />
                    </h4>
                </div>
                <div className="chat_headerRight">
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>
            </div>

            <div className="chatBody">
                <div className="chat_messages" id="chat-msgs">
                    {roomMessages?.map(({message, timestamp, user, userImage, attachedFiles})=>(
                        <Message 
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage}
                            attachedFiles={attachedFiles}
                        />
                    ))}
                    
                </div>

                <ChatInput channelName={roomDetails?.name} channelId={roomId}/>
            </div>  
        </div>
    );
}

export default Chat;