import { Link } from 'react-router-dom'
import { PROFILE_PATH } from '@/constants/paths'
import Avatar from '../avatar'
import EllipsisIcon from '@/assets/icons/ellipsis.svg?react'
import useModal from '@/hooks/use-modal'
import { lazy } from 'react'
import { useUserStore } from '@/hooks/use-user-store'
import { deletePost } from '@/services/firebase'

const PostOptions = lazy(() => import('@/components/modal-views/menu-options'))

const Header = ({ photoUrl, username, postId }: { photoUrl: string, username: string, postId: string }) => {
  const { user } = useUserStore()
  const { openModal, closeModal } = useModal()

  const handlePostOptions = () => {
    const options = user?.username === username ?
      [
        {
          label: 'Delete',
          className: 'text-red-500',
          onClick: async () => {
            await deletePost({ postId })
            closeModal()
          },
          dataCy: 'delete-post-button',
        },
      ]
      : [];
    openModal(PostOptions, { onClose: closeModal, options })
  }

  return (
    <header className='flex justify-between items-center mb-4'>
      <Link to={PROFILE_PATH(username)} className='flex items-center gap-3'>
        <Avatar photoUrl={photoUrl} className='h-8 w-8' />
        <p className='font-bold'>{username}</p>
      </Link>
      <EllipsisIcon
        onClick={handlePostOptions}
        className='h-6 w-6 cursor-pointer'
        data-cy='post-options'
      />
    </header>
  )
}

export default Header