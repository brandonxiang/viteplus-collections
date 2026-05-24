import { Menu as AntMenu } from 'antd';
import { Link } from 'react-router';
import { MenuProps as AntMenuProps } from 'antd/es/menu';
import { ItemType } from 'antd/es/menu/interface';

interface MenuItem {
  path: string;
  title?: string;
  icon?: string;
  redirect?: string;
  subMenu?: MenuItem[];
  noMenu?: boolean;
  ret?: boolean;
}

type MenuProps = {
  menu: MenuItem[];
} & AntMenuProps;

const getMenu = (menu: MenuItem[]): AntMenuProps['items'] => {
  const items = menu.map((item) => {
    let res: ItemType = {
      key: item.path,
      icon: item.icon,
      label: item.subMenu ? (
        <span className="nav-text">{item.title}</span>
      ) : (
        <Link to={item.redirect || item.path}>
          <span className="nav-text">{item.title}</span>
        </Link>
      ),
      onClick: () => {
        if (item.redirect) {
          window.location.href = item.redirect;
        }
      },
    };

    if (item.subMenu) {
      const children = item.subMenu
        .filter((item) => !item.noMenu)
        .map((item) => {
          return {
            key: item.path,
            icon: item.icon,
            label: item.subMenu ? (
              <span className="nav-text">{item.title}</span>
            ) : (
              <Link to={item.redirect || item.path}>
                <span className="nav-text">{item.title}</span>
              </Link>
            ),
            onClick: () => {
              if (item.redirect) {
                window.location.href = item.redirect;
              }
            },
          };
        });
      res = {
        ...res,
        children,
      };
    }

    return res;
  });
  return items;
};

export const BaseMenu = ({ menu, ...props }: MenuProps) => {
  //支持两层路由，如果要支持多于三层，请重构

  const items = getMenu(menu);

  return <AntMenu {...props} items={items}></AntMenu>;
};
