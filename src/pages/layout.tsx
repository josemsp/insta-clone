import { lazy, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Image from '@/components/image';
import ROUTES from '@/constants/routes';
import InstaIcon from '@/assets/icons/insta.svg?react'
import HomeIcon from '@/assets/icons/home.svg?react'
import NewPostIcon from '@/assets/icons/new-post.svg?react'
import OutsideIcon from '@/assets/icons/outside.svg?react'
import { PROFILE_PATH } from '@/constants/paths';
import useModal from '@/hooks/use-modal';
import Modal from '@/components/modal';
import Avatar from '@/components/avatar';
import useWindowResize from '@/hooks/use-window-resize';
import { useUserStore } from '@/hooks/use-user-store';

const CreatePost = lazy(() => import('@/components/modal-views/create-post/index'))

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUserStore();
  const { openModal } = useModal()
  const { width } = useWindowResize();
  const { logout } = useUserStore()

  useEffect(() => {
    if (width <= 1024 && collapsed === false) setCollapsed(true);
    if (width > 1024 && collapsed === true) setCollapsed(false);

    if (width <= 640 && isMobile === false) setIsMobile(true);
    if (width > 640 && isMobile === true) setIsMobile(false);

  }, [width, collapsed, isMobile]);

  const handleCreatePost = () => openModal(CreatePost);

  const menuItems = [
    {
      label: 'Home',
      icon: <HomeIcon className='h-[29px]' />,
      component: <Link to={ROUTES.DASHBOARD} />
    },
    { label: 'Create', icon: <NewPostIcon className='h-[29px]' />, onClick: handleCreatePost },
    {
      label: 'Profile',
      icon: <Avatar photoUrl={user?.photoUrl} className='w-[24px] h-[24px]' />,
      component: <Link to={PROFILE_PATH(user?.username || '')} />
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Modal />
      {isMobile && (
        <header className="flex justify-between items-center p-4 border-b">
          <HomeIcon className='h-[29px]' />
          <h1 className="text-xl font-bold">Instagram</h1>
          <HomeIcon className='h-[29px]' />
        </header>
      )}

      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <Sidebar
            collapsed={collapsed}
            className="h-full text-base flex flex-col justify-between"
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
                    {!collapsed && <Image src='/images/logo.png' alt='Insta Clone' className='h-[29px]' />}
                  </MenuItem>
                </Menu>
              </header>

              <Menu className='h-full'>
                {menuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    icon={item.icon}
                    onClick={item.onClick}
                    component={item.component}
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
        )}

        <main className='flex-1 flex justify-center transition-all duration-300 ease-in-out p-5 gap-7 overflow-y-auto '>
          <Outlet />
        </main>

      </div>

      {
        isMobile && (
          <nav className="flex justify-around items-center p-4 border-t">
            {menuItems.map((item, index) => (
              <button key={index} className="focus:outline-none">
                {item.icon}
              </button>
            ))}
            <button className="focus:outline-none">
              <HomeIcon className='h-[29px]' />
            </button>
          </nav>
        )
      }
    </div >
  );
};

export default Layout
