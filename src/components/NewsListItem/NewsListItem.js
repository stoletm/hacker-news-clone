import { Card, Space } from 'antd';
import { UserOutlined, StarOutlined, CommentOutlined, LinkOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { useState } from 'react';
import useUnixToDate from '../../utils/unix-time-to-date';
import { NavLink } from 'react-router-dom';

const NewsListItem = (props) => {
    const {author, commentCount, time, score, title, url, kids, id} = props.data;
    const setCommentIds = props.setCommentIds
    const [date, setDate] = useState(useUnixToDate(time));

    return (
        <Card
            title={title}
            style={{
                background: '#eee',
                width: '100%',
                marginBottom: '20px'
            }}
            extra={<Space size={5}>
                    <UserOutlined />
                    by <a href='#'>{author}</a>
                </Space>}
            type={'inner'}
            hoverable
            bordered={false}
        >
            <p>
                <Space size={10}>
                    <LinkOutlined />
                    <a href={url}>{url}</a> 
                </Space>
            </p>
            <p>
                <Space size={10}>
                    <FieldTimeOutlined />
                    {date}
                </Space>
            </p>
            <p>
                <Space direction='horizontal' size={30}>
                    <Space size={10}>
                        <StarOutlined />
                        {score}
                    </Space>
                        <NavLink
                            style={{color: 'inherit'}}
                            to={`/comments/:${id}`}>
                            <Space size={10} onClick={() => setCommentIds(kids)}>
                                <CommentOutlined />
                                {commentCount}
                            </Space>
                        </NavLink>
                </Space>
            </p>
        </Card>

    )
};
export default NewsListItem;