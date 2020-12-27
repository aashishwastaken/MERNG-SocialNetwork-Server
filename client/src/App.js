import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AuthRoute from './utils/AuthRoute';
import './App.css';
import MenuBar from './components/MenuBar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import {AuthProvider} from './context/auth';
import SinglePost from './pages/SinglePost';
import GoogleAuth from './utils/googleAuth';

function App() {
  return (
    
    
    <AuthProvider>
    <Router>
    <div class="ui container">
      <MenuBar />
      <Route exact path="/" component={Home} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      <Route exact path="/posts/:postId" component={SinglePost} />
      <Route exact path="/authenticate/google" component={GoogleAuth} />

      </div>
    </Router>
    </AuthProvider>
    
  );
}

export default App;
