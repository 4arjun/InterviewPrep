import { Link } from 'react-router-dom';

const Analytics = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Analytics & Insights</h1>
      <p>This page will show charts, trends, and data-driven insights about interview experiences.</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default Analytics; 