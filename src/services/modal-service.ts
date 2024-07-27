import { BehaviorSubject, Observable } from "rxjs";

export type ModalComponentProps = { closeModal: () => void };

export type ModalContent<T extends object = object> = React.LazyExoticComponent<(props: T & ModalComponentProps) => JSX.Element> | null;

export interface ModalState<T extends object = object> {
  isOpen: boolean;
  content: ModalContent<T>;
  props?: T;
}

class ModalService<T extends object = object> {
  private modalSubject = new BehaviorSubject<ModalState<T>>({ isOpen: false, content: null });
  public modalState$: Observable<ModalState<T>> = this.modalSubject.asObservable();

  openModal(content: ModalContent<T>, props?: T): void {
    this.modalSubject.next({ isOpen: true, content, props });
  }

  closeModal(): void {
    this.modalSubject.next({ isOpen: false, content: null, props: undefined });
  }
}

export const modalService = new ModalService();
