import React, { useContext } from 'react'
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

const ProfileBtn = () => {

    const user = useContext(UserContext);
  return (
    <Link to={'/profile'} className='bg-zinc-600 rounded-full'>
        <img src="/assets/profile-circle-icon.png" alt="Profile" className='w-10'/>
    </Link>
  )
}

export default ProfileBtn