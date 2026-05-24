import { SpinLoading } from 'antd-mobile';

export const PageLoading = () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <SpinLoading />
  </div>
);
