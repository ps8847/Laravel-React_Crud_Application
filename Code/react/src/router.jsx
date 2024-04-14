import {createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Signup from './views/Signup';
import User from './views/User';
import UserForm from './views/UserForm';

const router = createBrowserRouter([
{
	path: '/',
	element: <DefaultLayout />,
	children: [
		{
			path: '/',
			element: <Navigate to="/users" />
		},
		{
			path: '/users',
			element: <User />
		},
		{
			path: '/users/:id',
			element: <UserForm key="userUpdate"/>
		},
		{
			path: '/users/new',
			element: <UserForm key="userCreate"/>
		},
		{
			path: '/dashboard',
			element: <Dashboard />
		},
	]
},
{
	path: '/',
	element: <GuestLayout />,
	children: [
		
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/Signup',
				element: <Signup />
			},
		
	]
},
{
	path: '*',
	element: <NotFound />
}
])

export default router;