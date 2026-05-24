import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Avatar, MenuProps } from 'antd';
import styles from './index.module.scss';

interface HeaderProps {
  onMenuClick: () => void;
  user: {
    [key: string]: string;
  };
}

export class HeaderRightContent extends React.PureComponent<HeaderProps> {
  render() {
    const { onMenuClick, user } = this.props;
    const { name, picture } = user;

    const items: MenuProps['items'] = [
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
    ];

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
}
