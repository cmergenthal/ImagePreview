import react, { useEffect, useState } from "react"

import axios from 'axios'

const ImagePreview = (props) => {

    const [medialUrl, setMediaUrl] = useState('')
    const [body, setBody] = useState('')
    const [contentType, setContentType] = useState('')

    useEffect(() => {
        console.log("props",props)
      
        if(props.message.source.state.medias != null){
        
            setContentType(props.message.source.state.medias[0].state.contentType);

            let getUrl = (props.message.source.state.medias[0].services.mcsClient.config.mediaUrl) + "/" + (props.message.source.state.medias[0].state.sid)
            let token = (props.message.source.state.medias[0].services.mcsClient.config.token)            

            let config = {
                headers: {
                    'X-Twilio-Token' : token
                }
            }

            axios.get(getUrl, config).then(resp => {
                let respData = resp.data;
                setMediaUrl(respData.links.content_direct_temporary)
            });

        }else if(props.message.source.state.body != ''){
            setBody(props.message.source.state.body)
        }else{
            console.log('!!!ERROR!!!')
        }

    },[])


    const DisplayBubble = () => {
        //Function not component ... Bug?
        if(medialUrl){
            if(contentType == "application/pdf"){
                return(
                    <div>
                        <div><a href={medialUrl} target="_blank">Open PDF</a></div>
                        <object data={medialUrl} width="300" height="200"></object> 
                    </div>
                )
            }else if(contentType == "video/mp4"){
                return(
                    <div>
                        <div><a href={medialUrl} target="_blank">Open MP4</a></div>
                        <object data={medialUrl} width="300" height="200"></object> 
                    </div>
                )
            }else{
                return(
                    <><div>{body}</div><a href={medialUrl} target="_blank"><img style={{width: 300 , height: 225, marginTop: 5  }} src={medialUrl}></img></a></> 
                )
            }
        }else{
            return(
                <div>{body}</div>
            )
        }
    }

    return(
        <div>
            {DisplayBubble()}
        </div>
    )
}

export default ImagePreview