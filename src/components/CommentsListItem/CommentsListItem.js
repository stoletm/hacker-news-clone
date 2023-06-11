import { Card, Space } from 'antd';
import { UserOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react';
import useUnixToDate from '../../utils/unix-time-to-date';
import HackerNewsAPI from '../../services/HackerNewsAPI';

const CommentsListItem = (props) => {
    const {author, time, text, kids, deleted} = props.data;
    const inner = props.inner;
    const [date, setDate] = useState(useUnixToDate(time, 'toDateTime'));

    const kidsIds = kids
    const [kidsData, setKidsData] = useState([]);

    const {getAllComments, setLoading, loading} = HackerNewsAPI();

    const textFilter = (text) => {
        if (text) {
            let filtered = text
                        .replace(/&#x27;/mg, `'`)
                        .replace(/&#x2F;/mg, `/`)
                        .replace(/&gt;/mg, `>`)
                        .replace(/&quot;/mg, `"`)
                        .replace(/<p>/mg, `\n`)
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
        console.log(kidsData + ' data')
        let items;
        if (arr) {
            items = arr.map((item) => {
                console.log(item.by + ' kids');
                return (
                    <CommentsListItem data={item} key={item.id} kids={item.kids}/>        
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
            title={<Space>
                    <UserOutlined />
                    by {author}
                </Space>}
            style={{
                marginBottom: '20px',
                background: '#eee',
                overflow: 'hidden',
                wordWrap: 'revert-layer',
                maxWidth: '100%'

            }}
            bordered={false}
            inner={inner}
        >
            <Space direction='vertical'>
                <p>
                    <Space size={15} direction='vertical'>
                        <p>
                            <Space size={10} style={{maxWidth: '96%'}}>
                                {!deleted ? filteredText || text : '[Comment removed]'}
                            </Space>
                        </p>
                        <p>
                            <Space size={10}>
                                <FieldTimeOutlined />
                                {date}
                            </Space>
                        </p>
                    </Space>
                </p>
                {kidsIds ? renderKids(kidsData) : null}
            </Space>
        </Card>

    )
};

export default CommentsListItem;