import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NewsList from '../../components/NewsList/NewsList'
import NewsListItem from '../NewsListItem/NewsListItem';
import CommentsList from '../CommentsList/CommentsList';
import Header from '../Header/Header';
import Page404 from '../404/404';

function App() {
    const [commentIds, setCommentIds] = useState([])


    return (
        <Router>
            <div className="app">
                <Header/>
                <main>
                    <Routes>
                        <Route path='/' element={<NewsList setCommentIds={setCommentIds}/>} />
                        <Route path='/comments/:id' element={<CommentsList commentIds={commentIds}/>} />
                        <Route path='*' element={<Page404/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
