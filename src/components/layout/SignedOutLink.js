import React from 'react';
import {Link} from 'react-router-dom';

const SignedOutLinks =() =>{
    return(
        <ul className ="right">
            <li><Link to='/signup'>Sign up</Link></li>
            <li><Link to='/signin'>Login</Link></li>
            
            
        </ul>
    )
}

export default SignedOutLinks;