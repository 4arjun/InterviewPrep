import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../App';

const UserProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>User Profile - {id ? `ID: ${id}` : user?.name}</h1>
      <p>This page will show user contributions, stats, and manage posts.</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default UserProfile; 