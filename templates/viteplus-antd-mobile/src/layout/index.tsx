import { FC, Suspense } from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

import styles from './index.module.css';
import { PageLoading } from '../components/page-loading';

const Footer: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    console.log(value);
    void navigate(value);
  };

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/todo',
      title: '待办',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  return (
    <TabBar
      activeKey={pathname}
      onChange={(value) => {
        setRouteActive(value);
      }}
    >
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <NavBar
      left={<span className={styles.backLabel}>返回</span>}
      onBack={() => {
        void navigate(-1);
      }}
    >
      配合路由使用
    </NavBar>
  );
};

function Layout() {
  return (
    <Suspense fallback={<PageLoading />}>
      <div className={styles.app}>
        <div className={styles.top}>
          <Header />
        </div>
        <main className={styles.body}>
          <Outlet />
        </main>
        <div className={styles.bottom}>
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}

export default Layout;
