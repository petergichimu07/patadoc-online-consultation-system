import React from 'react'
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import * as GiIcons from 'react-icons/gi'
export const SidebarData =[
    {
        title:'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>
    },
    {
        title:'Doctors',
        path: '/doctors',
        icon: <FaIcons.FaClinicMedical/>
    },
    {
        title:'Users',
        path: '/users',
        icon: <FaIcons.FaUserAlt/>
    },
    {
        title:'Consultations',
        path: '/consultations',
        icon: <GiIcons.GiTalk/>
    },
    {
        title:'Add General Physician',
        path: '/addGP',
        icon: <AiIcons.AiOutlineUserAdd/>
    },

]