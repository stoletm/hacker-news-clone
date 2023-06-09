import { useEffect, useState, useCallback } from "react";
import NewsListItem from "../NewsListItem/NewsListItem";
import HackerNewsAPI from "../../services/HackerNewsAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import useForceUpdate from "use-force-update";

const NewsList = (props) => {
    const [newsList, setNewsList] = useState([]);

    const storiesToShow = 5;
    const [showStoriesFrom, setShowStoriesFrom] = useState(0);
    const [showStoriesTo, setShowStoriesTo] = useState(showStoriesFrom + storiesToShow);

    const setCommentIds = props.setCommentIds;

    const {getStories, setLoading, loading} = HackerNewsAPI();

    useEffect(() => {
        onRequest(showStoriesFrom, showStoriesTo)
    },[])

    const forceUpdate = useForceUpdate()

    useEffect(() => {
        console.log("effect on 0");
        onRequest(setShowStoriesFrom, setShowStoriesTo)

    },[])

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
                refreshFunction={forceUpdate}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
            >
                <button onClick={() => forceUpdate}>click</button>
                <ul style={{listStyle: 'none'}}>
                    {items}
                </ul>
            </InfiniteScroll>
        )
    }
    // if (reload) return <Redirect to={{pathname: '/'}}/>
    return (
        <>
            {renderItems(newsList)}
        </>
    )
}

export default NewsList;