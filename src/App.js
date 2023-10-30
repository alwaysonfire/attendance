import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './components/Home';
import GuildBossAttendanceForm from './components/GuildBoss';
import GuildExpeditionForm from './components/GuildExpedition';
import GuildPointContestForm from './components/GuildPointContest';
import AdminLogin from './components/AdminLogin';

function App() {
  // Example of using a state variable for authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define your routes with conditional rendering
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'guildboss',
      element: isAuthenticated ? <GuildBossAttendanceForm /> : <AdminLogin />,
    },
    {
      path: 'guildexpedition',
      element: isAuthenticated ? <GuildExpeditionForm /> : <AdminLogin />,
    },
    {
      path: 'guildpointcontest',
      element: isAuthenticated ? <GuildPointContestForm /> : <AdminLogin />,
    },
    {
      path: 'admin',
      element: <AdminLogin setIsAuthenticated={setIsAuthenticated} />,
    },
  ]);

  return element;
}

export default App;
