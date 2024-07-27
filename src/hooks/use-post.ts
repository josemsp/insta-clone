import { createPost, uploadImage } from "@/services/firebase";
import { useCallback, useMemo, useReducer } from "react"
import { useUserStore } from "./use-user-store";

export type ViewType = 'SELECT_IMAGE' | 'VIEW_IMAGE' | 'PUBLISH'

interface State {
  currentView: ViewType;
  image: File | null;
  caption: string;
  isUploading: boolean;
  uploadProgress: number;
  uploadError: string | null;
}

type Action =
  | { type: 'SET_VIEW'; payload: ViewType }
  | { type: 'SET_IMAGE'; payload: File | null }
  | { type: 'SET_CAPTION'; payload: string }
  | { type: 'SET_UPLOADING'; payload: boolean }
  | { type: 'SET_UPLOAD_PROGRESS'; payload: number }
  | { type: 'SET_UPLOAD_ERROR'; payload: string | null };

const initialState: State = {
  currentView: 'SELECT_IMAGE',
  image: null,
  caption: '',
  isUploading: false,
  uploadProgress: 0,
  uploadError: null,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload }
    case 'SET_IMAGE':
      return { ...state, image: action.payload }
    case 'SET_CAPTION':
      return { ...state, caption: action.payload }
    case 'SET_UPLOADING':
      return { ...state, isUploading: action.payload }
    case 'SET_UPLOAD_PROGRESS':
      return { ...state, uploadProgress: action.payload }
    case 'SET_UPLOAD_ERROR':
      return { ...state, uploadError: action.payload }
    default:
      return state
  }
}

const orderOfViews: ViewType[] = ['SELECT_IMAGE', 'VIEW_IMAGE', 'PUBLISH'];

export interface ViewConfig {
  title: string;
  component: React.FC<ViewProps>;
}

export interface ViewProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export default function usePost() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { user } = useUserStore();

  const handlePublish = useCallback(async () => {
    if (!state.image || !user?.userId) return;

    dispatch({ type: 'SET_UPLOADING', payload: true });
    dispatch({ type: 'SET_UPLOAD_ERROR', payload: null });

    try {
      const { url } = await uploadImage({ bucket: 'photos', file: state.image, userId: user.userId });
      await createPost({ imageUrl: url, caption: state.caption, userId: user.userId });
      console.log(state.image, state.caption);

    } catch (error) {
      console.error('Error publishing post:', error);
      dispatch({ type: 'SET_UPLOAD_ERROR', payload: 'Failed to publish post. Please try again.' });
    } finally {
      dispatch({ type: 'SET_UPLOADING', payload: false });
    }
  }, [state.image, state.caption, user?.userId]);

  const handleNext = useCallback(() => {
    const currentIndex = orderOfViews.indexOf(state.currentView);
    if (currentIndex < orderOfViews.length - 1) {
      dispatch({ type: 'SET_VIEW', payload: orderOfViews[currentIndex + 1] });
    }
  }, [state.currentView]);

  const handleBack = useCallback(() => {
    const currentIndex = orderOfViews.indexOf(state.currentView);
    if (currentIndex > 0) {
      dispatch({ type: 'SET_VIEW', payload: orderOfViews[currentIndex - 1] });
    }
  }, [state.currentView]);

  const canGoNext = useMemo(() => {
    switch (state.currentView) {
      case 'SELECT_IMAGE':
        return !!state.image;
      case 'VIEW_IMAGE':
        return true;
      case 'PUBLISH':
        return state.caption.trim().length > 0;
      default:
        return false;
    }
  }, [state.currentView, state.image, state.caption]);

  const canPublish = useMemo(() =>
    state.image !== null && state.caption.trim().length > 0 && !state.isUploading,
    [state.image, state.caption, state.isUploading]
  );

  return {
    state,
    handleNext,
    handleBack,
    canGoNext,
    canPublish,
    handlePublish,
    dispatch
  }
}
