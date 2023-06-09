import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import NewsList from '../../components/NewsList/NewsList'
import NewsListItem from '../NewsListItem/NewsListItem';
import CommentsList from '../CommentsList/CommentsList';
import Header from '../Header/Header';

function App() {
    const [commentIds, setCommentIds] = useState([])


    return (
        <Router>
            <div className="app">
                <Header/>
                <main>
                    <Switch>
                        <Route exact path='/'>
                            <NewsList setCommentIds={setCommentIds}/>
                        </Route>
                        <Route exact path={`/comments/:id`}>
                            <CommentsList commentIds={commentIds}/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;
