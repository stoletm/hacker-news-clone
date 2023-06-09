import { useEffect, useState } from "react";
import { Divider, List, Typography } from 'antd';
import CommentsListItem from "../CommentsListItem/CommentsListItem";
import HackerNewsAPI from "../../services/HackerNewsAPI";


const CommentsList = (props) => {
    const style = {fontSize: 24, textAlign: 'center', background: 'white', borderRadius: '5px', padding: 50 }
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
            return <h1 style={style}>No comments found</h1>
        }
        return (
            <>
                <h1 style={{...style, padding: '25px'}}>Comments</h1>
                <ul style={{listStyle: 'none'}}>
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