import { useEffect, useState } from "react";
import { Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import CommentsListItem from "../CommentsListItem/CommentsListItem";
import HackerNewsAPI from "../../services/HackerNewsAPI";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet";


const CommentsList = (props) => {
    const style = {display: 'block', fontSize: 24, textAlign: 'center', background: '#eee', borderRadius: '5px', width: '100%'};
    const [commentsList, setCommentsList] = useState([]);
    const [reload, setReload] = useState(false);

    const {selectedCommentIds, selectedPostTitle} = props;

    const {getAllComments, setLoading} = HackerNewsAPI();

    useEffect(() => {
        onRequest(selectedCommentIds);
    },[])

    useEffect(() => {
        setReload(false);
        onRequest(selectedCommentIds);
    },[reload])
        
    const onRequest = (ids) => {
        getAllComments(ids)
            .then(onCommentsListLoaded)
            .then(setLoading(false))
    }

    const handleReload = () => {
        setReload(true);
    }

    const onCommentsListLoaded = (newCommentsList) => {
        setCommentsList(commentsList => newCommentsList);
    }

    const renderItems = (arr) => {

        const items = arr.map((item) => {
                return (
                    <li key={item.id}>
                        <CommentsListItem data={item} kids={item.kids}/>
                    </li>
                )
            })

        return (
                <InfiniteScroll
                dataLength={items.length}
                hasMore={false}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                refreshFunction={handleReload}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
            >
                <ul style={{listStyle: 'none'}}>
                    {items}
                </ul>
            </InfiniteScroll>
        )
    }

    if (reload) return <redirect to={{pathname: '/'}}/>

    return (
        <>
            <Helmet>
                <meta
                    name="comments"
                    content={`${selectedPostTitle} - HackerNews`}/>
                <title>{selectedPostTitle}</title>
            </Helmet>
            <NavLink to='/' style={{...style, padding: '5px'}}>
                <Space direction={"horizontal"} size={10}>
                    <LeftOutlined style={{color:'black'}}/>    
                    Go back
                </Space>
            </NavLink>
            <ul style={{listStyle: 'none'}}>
                <h1 style={{...style, padding: 10}}>{selectedPostTitle}</h1>
                {renderItems(commentsList)}
            </ul>
        </>
    )
}

export default CommentsList;