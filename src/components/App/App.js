import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NewsList from '../../components/NewsList/NewsList'
import CommentsList from '../CommentsList/CommentsList';
import Header from '../Header/Header';
import Page404 from '../404/404';

function App() {
    const [selectedCommentIds, setSelectedCommentIds] = useState([]);
    const [selectedPostTitle, setSelectedPostTitle] = useState('');


    return (
        <Router>
            <div className="app">
                <Header/>
                <main>
                    <Routes>
                        <Route path='/' element={<NewsList setSelectedCommentIds={setSelectedCommentIds} setSelectedPostTitle={setSelectedPostTitle}/>} />
                        <Route path='/comments/:selectedCommentIds' element={<CommentsList selectedCommentIds={selectedCommentIds} selectedPostTitle={selectedPostTitle}/>} />
                        <Route path='*' element={<Page404/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
