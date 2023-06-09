import { useEffect, useState, useCallback } from "react";
import NewsListItem from "../NewsListItem/NewsListItem";
import HackerNewsAPI from "../../services/HackerNewsAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import { redirect } from "react-router-dom";

const NewsList = (props) => {
    const [newsList, setNewsList] = useState([]);

    const storiesToShow = 5;
    const [showStoriesFrom, setShowStoriesFrom] = useState(0);
    const [showStoriesTo, setShowStoriesTo] = useState(showStoriesFrom + storiesToShow);

    const setCommentIds = props.setCommentIds;

    const [reload, setReload] = useState(false);

    const {getStories, setLoading} = HackerNewsAPI();

    useEffect(() => {
        onRequest(showStoriesFrom, showStoriesTo)
    },[])

    useEffect(() => {
        setReload(false);
        setShowStoriesFrom(0);
        setShowStoriesTo(storiesToShow)
        onRequest(setShowStoriesFrom, setShowStoriesTo)
    },[reload])

    const onRequest = (from, to) => {
        getStories(from, to)
            .then(onNewsListLoaded)
            .then(setLoading(false))
            .then(setShowStoriesFrom(showStoriesTo))
            .then(setShowStoriesTo(showStoriesTo + storiesToShow))
    }

    const onNewsListLoaded = (newNewsList) => {
        setNewsList(newsList => [...newsList, ...newNewsList]);
    }

    const handleReload = () => {
        setReload(true);
    }

    const renderItems = (arr) => {
        const items = arr.map((item) => {
            return (
                <li key={item.id}>
                    <NewsListItem setCommentIds={setCommentIds} data={item}/>
                </li>
            )
        })

        return (

            <InfiniteScroll
                dataLength={items.length}
                next={() => {
                    onRequest(showStoriesFrom, showStoriesTo)
                }}
                hasMore={true}
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
            {renderItems(newsList)}
        </>
    )
}

export default NewsList;