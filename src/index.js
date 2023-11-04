import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import GuildBossAttendanceForm from './components/GuildBoss';
import GuildExpeditionForm from './components/GuildExpedition';
import GuildPointContestForm from './components/GuildPointContest';
import AdminLogin from './components/AdminLogin';
import PendingAttendance from './components/PendingAttendance';
import { AuthProvider } from './context/AuthContext';
import AdminOptionsPage from './components/AdminOptions';
import GuildAttendance from './components/GuildAttendance';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'guildboss',
        element: <GuildBossAttendanceForm />,
      },
      {
        path: 'guildexpedition',
        element: <GuildExpeditionForm />,
      },
      {
        path: 'guildpointcontest',
        element: <GuildPointContestForm />,
      },
      {
        path: 'admin',
        element: <AdminLogin />,
      },
      {
        path: 'pending',
        element: <PendingAttendance />,
      },
      {
        path: 'admin-options',
        element: <AdminOptionsPage />,
      },
      {
        path: 'guild-attendance',
        element: <GuildAttendance />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {' '}
      {/* Wrap your app with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
