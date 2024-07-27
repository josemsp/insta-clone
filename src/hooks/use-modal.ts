import { ModalContent, modalService } from '@/services/modal-service'
import { useCallback, useMemo } from 'react'

export default function useModal() {
  const openModal = useCallback(<T extends object = object>(
    content: ModalContent<T>,
    props?: T
  ) => {
    modalService.openModal(content as ModalContent<object>, props)
  }, [])

  const closeModal = useCallback(() => {
    modalService.closeModal()
  }, [])

  return useMemo(() => ({ openModal, closeModal }), [openModal, closeModal])
}
