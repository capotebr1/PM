import { Route, BrowserRouter, Routes, Navigate}   from 'react-router-dom';
import { Provider } from "react-redux";
import App from './pages/home/App';
import { combineReducers, createStore, } from "redux";
import Register from './pages/RegisterPage/Register';
import { ProjectReducer } from './reducers/ProjectReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import LoginPage from './pages/login/LoginPage';
import Project from './pages/project-info/Project';
import ProjectEdit from './pages/project-edit/ProjectEdit';
import Cookies from 'js-cookie';
import ProjectAdd from './pages/add-project/ProjectAdd';
import User from './pages/user/User';
import { UsersReducer } from './reducers/UsersReducer';
import MemberReducer from './reducers/MemberReducer';
import { Cookie } from '@mui/icons-material';
import { TasksReducer } from './reducers/TasksReducer';
const rootReducer = combineReducers({
    projects: ProjectReducer, 
    tasks: TasksReducer, 
    users: UsersReducer,
    members: MemberReducer
});
const store = createStore(rootReducer, composeWithDevTools());

function RouterAPP() { 

    const cookies = Cookies.get();
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={(cookies && <App/>) || <Navigate to="/login" replace={true}/>}/>
                    <Route path="/project/info/:id" element={ <Project/> }/>
                    <Route path="/project/edit/:id" element={ <ProjectEdit/> }/>
                    <Route path="/project/add" element={ <ProjectAdd/> }/>
                    <Route path="/user/:id" element={ <User/> }/>
                    <Route path='/login' element={<LoginPage navbar={false}/>}/>
                    <Route path='/register' element={<Register navbar={false}/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default RouterAPP;