import axios from 'axios';
import { useState } from 'react';

export const Main = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="main">
      <nav>
        <a>Insights</a>
        <a>Schedule</a>
        <a>Message Center</a>
        <a>Engagement</a>
        <a>Meal Breaks</a>
        <a>People</a>
        <a>Settings</a>
      </nav>
      <section>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => axios.post('/auth/login', { username, password })}
        >
          Login
        </button>
      </section>
    </main>
  );
};
