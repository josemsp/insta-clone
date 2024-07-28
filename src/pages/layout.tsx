import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Image from '@/components/image';
import ROUTES from '@/constants/routes';
import HomeIcon from '@/assets/icons/home.svg?react'
import NewPostIcon from '@/assets/icons/new-post.svg?react'
import OutsideIcon from '@/assets/icons/outside.svg?react'
import { PROFILE_PATH } from '@/constants/paths';
import useModal from '@/hooks/use-modal';
import Modal from '@/components/modal';
import Avatar from '@/components/avatar';
import { useUserStore } from '@/hooks/use-user-store';
import SidebarMenu from '@/components/sidebar-menu';

const CreatePost = lazy(() => import('@/components/modal-views/create-post/index'))

const Layout = () => {
  const { user } = useUserStore();
  const { openModal } = useModal()
  const { logout } = useUserStore()

  const handleCreatePost = () => openModal(CreatePost);

  const menuItems = [
    {
      label: 'Home',
      icon: <HomeIcon className='h-[29px]' />,
      route: ROUTES.DASHBOARD
    },
    { label: 'Create', icon: <NewPostIcon className='h-[29px]' />, onClick: handleCreatePost },
    {
      label: 'Profile',
      icon: <Avatar photoUrl={user?.photoUrl} className='w-[24px] h-[24px]' />,
      route: PROFILE_PATH(user?.username || '')
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Modal />
      <header className="flex justify-between items-center py-2 px-4 border-b-2 sm:hidden">
        <Link to={ROUTES.DASHBOARD}>
          <Image src='/images/logo.png' alt='Insta Clone' className='h-[29px]' />
        </Link>
        <OutsideIcon className='h-[1.5rem] w-[1.5rem]' onClick={logout} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <SidebarMenu items={menuItems} />
        <main className='flex-1 flex justify-center transition-all duration-300 ease-in-out py-5 md:px-5 gap-7 overflow-y-auto '>
          <Outlet />
        </main>
      </div>

      <nav className="flex justify-around items-center p-4 border-t sm:hidden">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.route || ''}
            className="focus:outline-none"
            onClick={item.onClick}
          >
            {item.icon}
          </Link>
        ))}
      </nav>
    </div >
  );
};

export default Layout
