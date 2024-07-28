import { modalService, ModalState } from '@/services/modal-service';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import CloseIcon from '@/assets/icons/close.svg?react'

const Modal = () => {
  const [{ isOpen, content, props }, setModalState] = useState<ModalState>({ isOpen: false, content: null });

  useEffect(() => {
    const subscription = modalService.modalState$.subscribe(setModalState);
    return () => subscription.unsubscribe();
  }, []);

  if (!isOpen || !content) return null;

  const componentProps = props || {};
  const ModalComponent = content;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <CloseIcon className='absolute top-4 right-4 h-6 w-6 cursor-pointer text-white' onClick={() => modalService.closeModal()} />
      <div className="bg-white rounded-xl shadow-lg max-w-4xl max-h-[35rem] w-full h-full">
        <Suspense fallback={<Loading />}>
          <ModalComponent {...componentProps} closeModal={() => modalService.closeModal()} />
        </Suspense>
      </div>
    </div>
  );
};

export default Modal;
