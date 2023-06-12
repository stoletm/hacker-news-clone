import { Card, Space } from 'antd';
import { UserOutlined, FieldTimeOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import { useState, useEffect, createRef } from 'react';
import useUnixToDate from '../../utils/unix-time-to-date';
import HackerNewsAPI from '../../services/HackerNewsAPI';

const CommentsListItem = (props) => {
    const {author, time, text, kids, deleted} = props.data;
    const style = props.style;
    const kidsIds = kids
    
    const [date, setDate] = useState(useUnixToDate(time));
    const [hidden, setHidden] = useState(false);
    const [kidsData, setKidsData] = useState([]);
    
    const {getAllComments, setLoading, loading} = HackerNewsAPI();

    const textFilter = (text) => {
        if (text) {
            let filtered = text
                        .replace(/&#x27;/mg, `'`)
                        .replace(/&#x2F;/mg, `/`)
                        .replace(/&gt;/mg, `>`)
                        .replace(/&quot;/mg, `"`)
            return filtered
        }
    }

    const filteredText = textFilter(text);
    
    useEffect(() => {
        setLoading(true);
    },[])
    
    useEffect(() => {
        if (loading) onRequest(kidsIds);
    },[loading])
    
    const onRequest = (ids) => {
        getAllComments(ids)
            .then(onKidsLoaded)
            .then(setLoading(false));
    }

    const onKidsLoaded = (newCommentsList) => {
        setKidsData(kidsData => newCommentsList);
    }

    const renderKids = (arr) => {
        let items;
        if (arr) {
            items = arr.map((item) => {
                return (
                    <CommentsListItem
                        data={item}
                        key={item.id}
                        kids={item.kids}
                        style={{
                            borderLeft: '1px solid black',
                            borderRadius: 0,
                        }}
                    />        
                )
            });
        }
        return (
            <>
                {items}
            </>
        )
    }

    return (
        <Card
            style={{
                ...style,
                background: '#eee',
                overflow: 'hidden',
                wordWrap: 'break-word',
                maxWidth: '100%',
                marginBottom: '10px',
            }}
            bordered='true'
            size='small'
            >
            <Space direction='vertical'>
                {<Space   style={{cursor: 'pointer', width: '100%'}}>
                    <UserOutlined />
                    by {author}
                    {hidden 
                        ? <DownOutlined onClick={() => setHidden(!hidden)}/> 
                        : <UpOutlined onClick={() => setHidden(!hidden)}/>}
                    <Space size={5} style={{marginLeft: 10}}>
                        <FieldTimeOutlined />
                        {date}
                    </Space>
                </Space>}
                {!hidden
                    ? !deleted 
                        ? <div dangerouslySetInnerHTML={{__html: filteredText} || text }></div>
                        : '[Comment removed]'
                    : null}
            </Space>
            {!hidden
                ? kidsIds
                    ? renderKids(kidsData)
                    : null
                : null}
        </Card>
    )
};

export default CommentsListItem;