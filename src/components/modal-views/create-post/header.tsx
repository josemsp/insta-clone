import LeftArrow from '@/assets/icons/left-arrow.svg?react'
import { ViewType } from '@/hooks/use-post';
import LoadingIcon from '@/assets/icons/loading.svg?react'

interface HeaderProps {
  title: string;
  currentView: ViewType;
  onBack: () => void;
  onNext: () => void;
  onPublish: () => void;
  canGoNext: boolean;
  canPublish: boolean;
  isUploading: boolean;
  uploadProgress: number;
}

const Header = ({ title, currentView, onBack, onNext, onPublish, canGoNext, canPublish, isUploading }: HeaderProps) => {

  return (
    <header className='border-b border-gray-200 py-1.5 flex justify-between px-4 '>
      {currentView !== 'SELECT_IMAGE' ?
        <LeftArrow className='w-6 h-6 cursor-pointer' onClick={onBack} /> :
        <div className='w-6'></div>
      }
      <h2 className='text-center font-semibold '>{title}</h2>
      {
        isUploading ?
          <LoadingIcon className='h-5' />
          : currentView === 'PUBLISH' ? (
            <span
              className={`text-blue-500 hover:text-gray-500 font-semibold select-none' ${canPublish ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              onClick={onPublish}
            >Share</span>
          ) : canGoNext ?
            <span
              className={`text-blue-500 hover:text-gray-500 font-semibold select-none' ${canGoNext ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              onClick={onNext}
            >Next</span> :
            <div className='w-6'></div>
      }
    </header >
  )
}

export default Header