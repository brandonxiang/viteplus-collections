import { useLoaderData } from 'react-router';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface PersonalCenterLoaderData {
  user: User;
}

function PersonalCenter() {
  const { user } = useLoaderData() as PersonalCenterLoaderData;

  return (
    <div>
      <h1>我的</h1>

      <div style={{ textAlign: 'center', padding: '20px' }}>
        <img
          src={user.avatar}
          alt="Avatar"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            marginBottom: '15px',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNmMGYwZjAiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjOTk5Ij4KPHA+VXNlcjwvcD4KPHN2Zz4KPC9zdmc+';
          }}
        />
        <h2>{user.name}</h2>
        <p style={{ color: '#666' }}>{user.email}</p>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <strong>Profile Settings</strong>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <button style={{ width: '100%', padding: '10px', marginBottom: '5px' }}>
            Edit Profile
          </button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <button style={{ width: '100%', padding: '10px', marginBottom: '5px' }}>Settings</button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <button style={{ width: '100%', padding: '10px', marginBottom: '5px' }}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default PersonalCenter;
