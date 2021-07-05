import React, { useState } from "react";
import db, { storage } from "./firebase";
import "./ChatInput.css";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import AttachFileIcon from '@material-ui/icons/AttachFile';

function ChatInput({ channelName, channelId }){
    const [input,setInput] = useState('');
    const [fileList, setFileList] = useState(null);
    const [fileCount, setFileCount] = useState(0);

    //check file type?

    //ALSO CHECK LOGGING OUT AUTOMATICALLY
    //PERHAPS STH TO DO WITH BEING SET TO 'USER: NULL' EVERYTIME AFTER CHANGE OR SOME UPDATE

    const [{ user }] = useStateValue();
    
    const handleChange = (e) => {
        const files = e.target.files;
        if (files === '' || files===undefined){
            alert("not a valid file attachment");
            return;
        }
        setFileList(files);
        setFileCount(files.length);
    }

    const sendMessage= (e) => {
        e.preventDefault();

        if (!input && !fileList) {
            return false;
        }

		if (channelId) {
            if ((fileList && Object.keys(fileList).length !== 0 && typeof(fileList)==="object")){
                var fileURLs = [];
                var count=0;
                
                for (const f in fileList){
                    if (!fileList[f] || f==='item' || f==='length' || f==='' || f===undefined){
                        break;
                    }

                    const upload=storage
                                    .ref(`files/${fileList[f].name}`)
                                    .put(fileList[f]);
                    
                    upload.on('state_changed',
                        snapshot =>{
                            const progress = 
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        
                            console.log(`Progress: ${progress}%`);
                            if (snapshot.state === 'RUNNING'){
                                console.log(`Progress: ${progress}%`);
                            }
                        }, 
                        error => console.log(error.code),
                        async () =>{
                            const fileURL = await upload.snapshot.ref.getDownloadURL();
                            const fObj={
                                    fname:fileList[f].name,
                                    url: fileURL
                                }
                            fileURLs.push(fObj);
                            count+=1;
                            if(count===Object.keys(fileList).length){
                                db.collection("rooms").doc(channelId).collection("messages").add({
                                    message: input,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    user: user.displayName,
                                    userImage: user.photoURL,
                                    attachedFiles: fileURLs,
                                });
                                setFileList(null);
                                fileURLs=[];
                            }
                        });
                }
                setFileCount(0);                
                
            }
            else{                
                db.collection("rooms").doc(channelId).collection("messages").add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    userImage: user.photoURL,
                    attachedFiles: [],
                });
            }

		}
		setInput("");
    }

    return (
        <div className="chatInput">
            <form>
                <input
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    placeholder={`Message #${channelName}`}    
                />
                <input type="file"
                    id="file"
                    accept="image/*,audio/*,video/*,.doc,.docx,application/msword,application/pdf"
                    style={{display:"none"}}
                    onChange={handleChange}
                    multiple
                />
                <p>
                    <label htmlFor="file">
                        <AttachFileIcon id="attachFileIcon" />
                    </label>
                    {(fileCount!==0) && (<span id="fileCount">{fileCount}</span>)}
                </p>
                <button type="submit" onClick={sendMessage}>SEND</button>
            </form>
        </div>
    );
}

export default ChatInput;