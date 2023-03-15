import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
	const {isAuthenticated, loading, user} = useSelector(state => state.user)

	return (
		<>
			{
				!loading && <Route {...rest} render={(props) => {
							if(!isAuthenticated){
								return <Redirect to='/login' />
							}

							if(isAdmin && user.role !== 'admin'){
								return <Redirect to='/login' />
							}
							
							return <Component {...props} />
						}
					}
				/>
			}
		</>
	);
}

export default ProtectedRoute;