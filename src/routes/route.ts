import { Router } from 'express';
import Register from '../controller/auth/register.controller';
import Login from '../controller/auth/login.controller';
import Logout from '../controller/auth/logout.controller';
import CheckSAuthState from '../controller/middleware/auth.middleware';
import Auth from '../controller/auth/auth.controller';

import { deleteUser, getUser, getUsers, postUser, updateUser } from '../controller/user.controller';
import { deleteRole, getRole, getRoles, postRole, updateRole } from '../controller/role.controllet';

export const routes = (route: Router) => {
    
    //Authentication
    route.post('/api/register', Register)
    route.post('/api/login',Login)
    route.get('/api/user',CheckSAuthState,Auth )
    route.post('/api/logout', CheckSAuthState,Logout)


    //User
    route.get('/api/users' ,CheckSAuthState, getUsers)
    route.get('/api/users/:id',CheckSAuthState,getUser)
    route.post('/api/users',CheckSAuthState, postUser)
    route.put('/api/users/:id',CheckSAuthState, updateUser)
    route.delete('/api/users/:id',CheckSAuthState, deleteUser)

    //Role
    route.get('/api/roles',CheckSAuthState ,getRoles)
    route.get('/api/roles/:id',CheckSAuthState,getRole)
    route.post('/api/roles',CheckSAuthState, postRole)
    route.put('/api/roles/:id',CheckSAuthState, updateRole)
    route.delete('/api/roles/:id', CheckSAuthState, deleteRole)

}