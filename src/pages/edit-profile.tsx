import Avatar from '@/components/avatar'
import InputFile from '@/components/input-file';
import { useUserStore } from '@/hooks/use-user-store';
import { lazy, useState } from 'react';
import LoadingIcon from '@/assets/icons/loading.svg?react'
import LeftArrowIcon from '@/assets/icons/left-arrow.svg?react'
import useModal from '@/hooks/use-modal';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PATH } from '@/constants/paths';

const ChangePhoto = lazy(() => import('@/components/modal-views/profile/change-photo'))

const EditProfile = () => {
  const { user, updateUserData, loading } = useUserStore()
  const [caption, setCaption] = useState(user?.bio || '');
  const { openModal } = useModal()
  const navigate = useNavigate()
  const captionLength = 150;

  const handleFileOnChange = async (file: File | null) => {
    if (!file) return;
    openModal(ChangePhoto, { file });
  }

  const handleSubmit = async () => {
    if (!caption || !user) return;
    await updateUserData({ bio: caption });
    navigate(PROFILE_PATH(user.username))
  }

  return (
    <div className='w-full max-w-xl'>
      <div className='mt-5 flex flex-col gap-8'>
        <div className='flex gap-5'>
          {user && <LeftArrowIcon className='cursor-pointer' onClick={() => navigate(PROFILE_PATH(user.username))} />}
          <h2 className='font-bold text-xl'>Edit Profile</h2>
        </div>
        <div className='flex items-center gap-4 rounded-lg bg-slate-200 p-4 justify-between'>
          <div className='flex gap-4 items-center'>
            <Avatar photoUrl={user?.photoUrl} className='w-16 h-16' />
            <div className='flex flex-col'>
              <p className='text-base font-bold'>{user?.username}</p>
              <span className='text-sm text-gray-500 leading-3'>{user?.fullName}</span>
            </div>
          </div>
          <InputFile
            onChange={handleFileOnChange}
            label='Change photo'
          />
        </div>

        <div className='flex flex-col'>
          <h3 className='text-base font-bold mb-4'>Bio</h3>
          <textarea
            maxLength={captionLength}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder='Bio'
            className='w-full h-24 rounded-lg border border-gray-300 p-2 focus-visible:outline-none scrollbar-gutter'
          ></textarea>
          <span className="text-end mr-4">{caption.length}/{captionLength}</span>
        </div>

        <div className='flex justify-end'>
          <button
            className='bg-blue-500 text-white rounded-lg px-4 py-2 w-full max-w-[240px]'
            onClick={handleSubmit}
          >
            {loading ? <><LoadingIcon className='h-5 mr-2' />Saving...</> :
              'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile