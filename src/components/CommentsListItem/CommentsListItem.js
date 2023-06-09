import { Card, Space } from 'antd';
import { UserOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { React, useState } from 'react';
import useUnixToDate from '../../utils/unix-time-to-date';
import HackerNewsAPI from '../../services/HackerNewsAPI';

const CommentsListItem = (props) => {
    const {author, time, text} = props.data;
    const inner = props.inner
    const [date, setDate] = useState(useUnixToDate(time));


    return (
        <Card
            title={<Space size={8}>
                    <UserOutlined />
                    by {author}
                </Space>}
            style={{
                width: '100%',
                marginBottom: '20px',
                background: '#eee'
            }}
            bordered={false}
        >
            <Space size={15}>
                <div>
                    <p>
                        <Space size={10}>
                            {text}
                        </Space>
                    </p>
                    <p>
                        <Space size={10}>
                            <FieldTimeOutlined />
                            {date}
                        </Space>
                    </p>
                </div>
                
            </Space>
        </Card>

    )
};
export default CommentsListItem;