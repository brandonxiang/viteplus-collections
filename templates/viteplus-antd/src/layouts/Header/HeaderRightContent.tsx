import { useMemo } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Avatar, MenuProps } from 'antd';
import styles from './index.module.scss';

interface HeaderProps {
  onMenuClick: () => void;
  user: {
    [key: string]: string;
  };
}

export function HeaderRightContent({ onMenuClick, user }: HeaderProps) {
  const { name, picture } = user;

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        label: (
          <>
            <LogoutOutlined />
            <span>logout</span>
          </>
        ),
        key: 'logout',
        onClick: onMenuClick,
      },
    ],
    [onMenuClick],
  );

  return (
    <div className={styles.right}>
      <Dropdown menu={{ items }}>
        <span className={styles.action}>
          <Avatar size="small" src={picture} alt="avatar" />
          <span className={styles.name}>{name}</span>
        </span>
      </Dropdown>
    </div>
  );
}
