import { useEffect, useState } from "react";
import { Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import CommentsListItem from "../CommentsListItem/CommentsListItem";
import HackerNewsAPI from "../../services/HackerNewsAPI";
import { NavLink } from "react-router-dom";


const CommentsList = (props) => {
    const style = {fontSize: 24, textAlign: 'center', background: '#eee', borderRadius: '5px', width: '100%'}
    const [commentsList, setCommentsList] = useState([]);
    const commentIds = props.commentIds

    const {getAllComments, setLoading} = HackerNewsAPI();

    useEffect(() => {
        onRequest()
    },[])


    const onRequest = () => {
        getAllComments(commentIds)
            .then(onCommentsListLoaded)
            .then(setLoading(false))
        
    }

    const onCommentsListLoaded = (newCommentsList) => {
        setCommentsList(commentsList => newCommentsList);
    }

    const renderItems = (arr) => {
        let items;
        if (arr) {
            items = arr.map((item) => {
                return (
                    <li key={item.id}>
                        <CommentsListItem data={item}/>
                    </li>
                )
            })
        } else {
            return (
                <NavLink to='/' style={{...style, padding: '25px'}}>
                    <Space direction={'horizontal'} size={10}>
                        <h1 style={style}>No comments found</h1>
                        Go back
                    </Space>
                </NavLink>
            )
            
        }
        return (
            <>
                <NavLink to='/' style={{...style, padding: '5px'}}>
                    <Space direction={"horizontal"} size={10}>
                        <LeftOutlined style={{color:'black'}}/>    
                        Go back
                    </Space>
                </NavLink>
                <ul style={{listStyle: 'none'}}>
                    <h1 style={{...style, padding: {xs: '10px', s: '25px'}}}>Comments</h1>
                    {items}
                </ul>
            </>
        )
    }

    
    return (
        <>
            {renderItems(commentsList)}
        </>
    )
}

export default CommentsList;