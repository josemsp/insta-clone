import ROUTES from "@/constants/routes";
import useWindowResize from "@/hooks/use-window-resize";
import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar"
import { Link } from "react-router-dom";
import Image from "../image";
import InstaIcon from '@/assets/icons/insta.svg?react'
import OutsideIcon from '@/assets/icons/outside.svg?react'
import { useUserStore } from "@/hooks/use-user-store";
import { IMAGE_PUBLIC_PATH } from "@/constants/paths";

interface SidebarMenuProps {
  items: {
    label: string;
    icon: JSX.Element;
    onClick?: () => void;
    route?: string;
  }[]
}

const SidebarMenu = ({ items }: SidebarMenuProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { width } = useWindowResize();
  const { logout } = useUserStore();

  useEffect(() => {
    if (width <= 1024 && collapsed === false) setCollapsed(true);
    if (width > 1024 && collapsed === true) setCollapsed(false);
  }, [width, collapsed]);

  return (
    <Sidebar
      collapsed={collapsed}
      className="h-full text-base hidden sm:flex flex-col justify-between"
      width='240px'
      transitionDuration={500}
    >
      <div className='flex flex-col justify-between h-screen py-8'>
        <header className='h-[90px] flex items-center'>
          <Menu>
            <MenuItem
              key={`sidebar-header`}
              component={<Link to={ROUTES.DASHBOARD} />}
              icon={collapsed && <InstaIcon className='h-[29px]' />}
            >
              {!collapsed && <Image src={IMAGE_PUBLIC_PATH('logo.png')} alt='Insta Clone' className='h-[29px]' />}
            </MenuItem>
          </Menu>
        </header>

        <Menu className='h-full'>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              onClick={item.onClick}
              component={<Link to={item.route || ''} />}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        <Menu>
          <MenuItem
            key={`sidebar-header`}
            icon={<OutsideIcon className='h-[1.5rem] w-[1.5rem]' />}
            onClick={logout}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  )
}

export default SidebarMenu