import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Settings</h1>
      <p>This page will allow users to update their account preferences, change password, and manage notifications.</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default Settings; 