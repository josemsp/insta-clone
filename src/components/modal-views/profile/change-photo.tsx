import QuestionIcon from '@/assets/icons/question.svg?react'
import LoadingIcon from '@/assets/icons/loading.svg?react'
import { useUserStore } from '@/hooks/use-user-store'
import useModal from '@/hooks/use-modal'

const ChangePhoto = ({ file }: { file: File }) => {
  const { loading, updateUserPhotoProfile } = useUserStore()
  const { closeModal } = useModal()

  const handleConfirm = async () => {
    await updateUserPhotoProfile(file)
    closeModal()
  }

  const handleCancel = () => closeModal()

  return (
    <div className='w-full max-w-xl'>

      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
            <QuestionIcon aria-hidden="true" className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Update profile photo</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed.
                This action cannot be undone.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          disabled={loading}
          onClick={handleConfirm}
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
        >
          {loading ? <><LoadingIcon className='h-5 mr-2' />Saving...</> :
            'Save'}
        </button>
        <button
          type="button"
          data-autofocus
          onClick={handleCancel}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel</button>
      </div>

    </div>
  )
}

export default ChangePhoto