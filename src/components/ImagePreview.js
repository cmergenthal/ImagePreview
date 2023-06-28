import { useEffect, useState } from "react"
import axios from 'axios'

const ImagePreview = (props) => {

    const [medialUrl,setMediaUrl] = useState('')
    const [body,setBody] = useState('')

    useEffect(() => {
        console.log("props",props)

      
        if(props.message.source.state.medias != null){

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


    return(
        <div>
            {medialUrl ? <><div>{body}</div><a href={medialUrl} target="_blank"><img style={{width: 300 , height: 225, marginTop: 5  }} src={medialUrl}></img></a></> : <div>{body}</div>}
        </div>
    )
}

export default ImagePreview