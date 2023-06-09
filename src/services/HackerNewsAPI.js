import axios from "axios";
import { useState } from "react";
const _apiURL = 'https://hacker-news.firebaseio.com/v0/';

const HackerNewsAPI = () => {
    const [loading, setLoading] = useState(false)
    // const [storiesThreshold, setStoriesThreshold] = useState(0)

    const getStory = async (id) => {
        try {
            const story = await axios.get(`${_apiURL}/item/${id}.json`);
            return _transformNews(story.data)
        
        } catch (e) {
            setLoading(false);
            console.log('Fetch error');
        }
    }

    const getStories = async (from = 0, to = 5) => {
        try {
            const {data: storyIds} = await axios.get(`${_apiURL}/topstories.json`)
            
            const stories = await Promise.all(storyIds.slice(from, to).map(getStory));
            return stories;
        } catch (e) {
            setLoading(false);
            console.log('Fetch error');
        }
    }

    const getAllComments = async (ids) => {
        try {
            const comments = await Promise.all(ids.map(getComment));
            return comments;
        } catch (e) {
            setLoading(false);
            console.log('Fetch error');
        }
    }

    const getComment = async (id) => {
        try {
            const comment = await axios.get(`${_apiURL}/item/${id}.json`);
            return _transformComment(comment.data)
        
        } catch (e) {
            setLoading(false);
            console.log('Fetch error');
        }
    }
    

    const _transformNews = (data) => {
        setLoading(false);
        return {
            id: data.id,
            author: data.by,
            time: data.time,
            title: data.title,
            url: data.url || 'Question',
            score: data.score,
            commentCount: data.descendants,
            kids: data.kids
            
        }
    }
    const _transformComment = (data) => {
        setLoading(false);
        return {
            id: data.id,
            author: data.by,
            time: data.time,
            text: data.text,
            kids: data.kids,
            parents: data.parents
        }
    }
    return {getStories, getStory, getAllComments, getComment, loading, setLoading}
};


export default HackerNewsAPI;