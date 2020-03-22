import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage} from '../_actions/message_actions';
import { List, Icon, Avatar } from 'antd';
import Message from './Sections/Message';


function Chatbot() {
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)

    useEffect(() => {
        eventQuery('welcomeToSegaBot')
    }, [])

    const textQuery = async(text) => {

        //let conversations = []

        //First need take care of the message sent
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }
        dispatch(saveMessage(conversation))
        //console.log('text i sent',conversation)
    
        //Handle response from dialogflow
        const textQueryVariables = {
            text
        }
        try {
            // send request to the textQuery route
            const response = await Axios.post('http://localhost:4000/api/dialogflow/textQuery', textQueryVariables)
            const content =  response.data.fulfillmentMessages[0] 
            for ( let content of response.data.fulfillmentMessages){
                conversation = {
                    who: 'chatbot',
                    content: content
                }  
                dispatch(saveMessage(conversation))
            }
           

        } catch (error){
            let conversation = {
                who: 'chatbot',
                content: {
                    text: {
                        text: "Error just occured, please check the issues"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        
        }  
    }


    //EVENT QUERY
    const eventQuery = async (event) => {

        //Handle response from dialogflow
        const eventQueryVariables = {
            event
        }
        try {
            // send request to the textQuery route
            const response = await Axios.post('http://localhost:4000/api/dialogflow/eventQuery', eventQueryVariables)
            const content =  response.data.fulfillmentMessages[0] 

            let conversation = {
            who: 'chatbot',
            content: content
        }  
        dispatch(saveMessage(conversation))

        } catch (error){
            let conversation = {
                who: 'chatbot',
                content: {
                    text: {
                        text: "Error just occured, please check the issues"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }  
    }

    const keyPressHandler = (e) => {
        if(e.key === "Enter") {
            if(!e.target.value) {
                return alert('you need to type something first')
            }

            //We will send request to text query route
            textQuery(e.target.value);
            e.target.value = ""
        }
    }

    const renderOneMessage = (message, i) =>{
        console.log('message', message)
        return <Message key={i} who={message.who} text={message.content.text.text}/>
    }

    const renderMessage = (returnedMessages) => {
        if(returnedMessages){
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i)
            })
        }else {
            return null;
        }
    }

    return(
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}> 
        <div style={{ height: 644, width: '100%', overflow: 'auto'}}>

        {renderMessage(messagesFromRedux)}
        </div>
        <input 
            style={{
                margin: 0, width: '100%', height: 50,
                borderRadius: '4px', padding: '5px', fontsize: '1rem'
            }}
            placeholder="Send a message..."
            onKeyPress={keyPressHandler}
            type="text"
        />
        </div>
    )
}

export default Chatbot;