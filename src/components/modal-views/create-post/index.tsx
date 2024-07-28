import Header from './header';
import SelectImageView from './select-image-view';
import ViewImageView from './view-image-view';
import PublishView from './publish-view';
import usePost, { ViewConfig, ViewType } from '@/hooks/use-post';
import { useCallback } from 'react';
import useModal from '@/hooks/use-modal';

const viewConfigs: Record<ViewType, ViewConfig> = {
  SELECT_IMAGE: {
    title: 'Create new post',
    component: SelectImageView,
  },
  VIEW_IMAGE: {
    title: 'Preview',
    component: ViewImageView,
  },
  PUBLISH: {
    title: 'Add caption',
    component: PublishView,
  },
};

const CreatePost = () => {
  const { state, handleNext, canGoNext, canPublish, handlePublish, handleBack, dispatch } = usePost();
  const { closeModal } = useModal()

  const handlePublishPost = useCallback(async () => {
    await handlePublish();
    closeModal();
  }, [closeModal, handlePublish]);

  const currentConfig = viewConfigs[state.currentView];

  return (
    <div className='max-w-[930px] h-full w-full mx-auto'>
      <Header
        title={currentConfig.title}
        currentView={state.currentView}
        onBack={handleBack}
        onNext={handleNext}
        onPublish={handlePublishPost}
        canGoNext={canGoNext}
        canPublish={canPublish}
        isUploading={state.isUploading}
        uploadProgress={state.uploadProgress}
      />
      <currentConfig.component state={state} dispatch={dispatch} />
      {state.uploadError && (
        <p className="text-red-500 mt-4 text-center">{state.uploadError}</p>
      )}
    </div>
  );
}

export default CreatePost
