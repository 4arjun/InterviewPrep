import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Admin Panel</h1>
      <p>This page will contain user management, content moderation, and analytics for admins.</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default AdminPanel; 