import { Card, Space } from 'antd';
import { UserOutlined, StarOutlined, CommentOutlined, LinkOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import useUnixToDate from '../../utils/unix-time-to-date';
import { NavLink } from 'react-router-dom';
import Link from 'antd/es/typography/Link';

const NewsListItem = (props) => {
    const {author, commentCount, time, score, title, url, kids, id} = props.data;
    const setSelectedCommentIds = props.setSelectedCommentIds;
    const setSelectedPostTitle = props.setSelectedPostTitle;
    const [date, setDate] = useState(useUnixToDate(time));

    return (
        <Card
            title={title}
            style={{
                background: '#eee',
                width: '100%',
                marginBottom: '20px',
                padding: '10px'
            }}
            extra={<Space size={5} style={{marginLeft: '20px'}}>
                    <UserOutlined />
                    by <a href='#'>{author}</a>
                </Space>}
            size={'small'}
            type={'inner'}
            hoverable
            bordered={false}
        >
            <div>
                <Space size={10}>
                    <LinkOutlined />
                    <Link style={{}} href={url}>{url}</Link> 
                </Space>
            </div>
            <Space size={10}>
                <FieldTimeOutlined />
                {date}
            </Space>
            <div>
                <Space direction='horizontal' size={30}>
                    <Space size={10}>
                        <StarOutlined />
                        {score}
                    </Space>
                        <NavLink
                            style={{color: 'inherit'}}
                            to={`/comments/${id}`}>
                            <Space 
                                size={10} 
                                onClick={() => {
                                    setSelectedCommentIds(kids);
                                    setSelectedPostTitle(title);   
                                }}>
                                <CommentOutlined />
                                {commentCount}
                            </Space>
                        </NavLink>
                </Space>
            </div>
        </Card>
    )
};

export default NewsListItem;