import React from "react";
import "./Message.css";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

function Message({ noMessages, message, timestamp, user, userImage, attachedFiles }) {
	if (noMessages) return <div className="message">No messages...</div>

	return (
		<div className="messageWrapper">
            <div className="message">
                <img src={userImage} alt="user" />
                <div className="message_info">
                    <h4>
                        {user}
                        <span className="message_timestamp">
                            {new Date(timestamp?.toDate()).toLocaleDateString()}
                            &nbsp;
                            {new Date(timestamp?.toDate()).toLocaleTimeString()}
                        </span>
                    </h4>
                    <p>{message}</p>
        
                </div>
            </div>
            <div className="filesWrapper">
                {attachedFiles?.map((aFile) => (
                    <div className="attachedFiles">
                        {/* <p>{brand}</p> */}
                        <a href={aFile?.url} className="fIcon" target="blank"><InsertDriveFileIcon /></a>
                        <a href={aFile?.url} className="fName" target="blank">{aFile?.fname}</a>
                    </div>
                ))}
                
            </div>
        </div>
	)
}

export default Message