import React from 'react';
import {useLocalState} from "../zustand/localState";
import '@/src/styles/dashboard/dashboard.css';

const Dashboard = () => {
    const {localState} = useLocalState();

    return (<div className="relay-wp-dashboard-content frt-flex frt-flex-col">
        <div
            className="relay-wp-dashboard-intro frt-flex frt-flex-row frt-items-center frt-gap-4 frt-ml-2 frt-mr-6 frt-mt-8">
            <p>Welcome Back, <span>{localState?.user?.nick_name}!
                </span></p>
            <i className='rwp rwp-Video frt-text-lg frt-text-light-gray frt-w-5 frt-h-5'/>
        </div>

    </div>)
};

export default Dashboard;

// 28 05