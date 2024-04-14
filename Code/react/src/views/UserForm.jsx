import React, { useEffect, useState } from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function UserForm() {
	const {id} = useParams();
	const navigate = useNavigate();
	const [loading , setLoading] = useState(false);
	const [errors , setErrors] = useState(null);
	const {setNotification} = useStateContext();
	const [user , setuser] = useState({
		id: null,
		name: '',
		email: '',
		password: '',
		password_confirmation: ''
	});

	if(id){
		useEffect(() => {
			setLoading(true)
			axiosClient.get(`/users/${id}`).then(({data}) =>{
				setuser(data)
				setLoading(false)
			}).catch(() => {
				setLoading(false)
			})
		},[])
	}

	const onSubmit = (ev) => {
		ev.preventDefault();
		if(user.id){
			axiosClient.put(`/users/${user.id}` , user).then(() => {
				
				setNotification("User was successfully updated")
				navigate('/users')
			}).catch(err => {
				const response = err.response;
				if(response && response.status === 422){
				  console.log(response.data.errors);
				  setErrors(response.data.errors);
				}
			  })
		} else {
			axiosClient.post('/users' , user).then(() => {
				setNotification("User was successfully created")
				navigate('/users')
			}).catch(err => {
				const response = err.response;
				if(response && response.status === 422){
				  console.log(response.data.errors);
				  setErrors(response.data.errors);
				}
			  })
		}
	}
  return (
	<>
	
	{user.id && <h1>Update User: {user.name} </h1>}
	{!user.id && <h1>New User</h1>}
	<div className='card animated fadeInDown'>
		{
			loading && 
				(
					<div className="text-center">Loading...</div>
				)
		}

		{
			errors && <div className="alert">
				{
					Object.keys(errors).map(key=> (
						<p key={key}>{errors[key][0]}</p>
					))
				}
			</div>
		}
		

		{!loading && 
			<form onSubmit={onSubmit}>
				<input value={user.name} placeholder='Name' onChange={ev => setuser( {...user , name: ev.target.value})}/>
				<input type="email" value={user.email} placeholder='Email' onChange={ev => setuser( {...user , email: ev.target.value})}/>
				<input type="password" placeholder='Password' onChange={ev => setuser( {...user , password: ev.target.value})}/>
				<input type="password" placeholder='Password Confirmation' onChange={ev => setuser( {...user , password_confirmation: ev.target.value})}/>
				<button className='btn'>Save</button>
			</form>
		}
          </div>
	
	</>
  )
}
