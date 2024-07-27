import PhotoVideoIcon from '@/assets/icons/photo-video.svg?react'
import InputFile from '@/components/input-file'
import { ViewProps } from '@/hooks/use-post';

const SelectImageView = ({ dispatch }: ViewProps) => {
  const handleOnChange = (file: File | null) => {
    dispatch({ type: 'SET_IMAGE', payload: file });
    dispatch({ type: 'SET_VIEW', payload: 'VIEW_IMAGE' });
  }

  return (
    <section className='flex flex-col items-center justify-center h-full gap-4'>
      <PhotoVideoIcon className='h-[77px]' />
      <InputFile
        onChange={handleOnChange}
        label='Select Image'
      />
    </section>
  )
}

export default SelectImageView