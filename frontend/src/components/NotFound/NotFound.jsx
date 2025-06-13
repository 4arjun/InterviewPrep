import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤔</div>
        <h1 style={{ color: '#1e3a8a', fontSize: '2rem', marginBottom: '1rem' }}>
          Oops! Page not found
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 