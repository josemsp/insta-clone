import usePhotos from "@/hooks/use-photos"
import Skeleton from "react-loading-skeleton"
import { PhotoWithUserDetails } from "@/services/firebase"
import Post from "./post"
import { useUserStore } from "@/hooks/use-user-store"

const Timeline = ({ className }: { className?: string }) => {
  const { photos, loading: photosLoading, error: photosError } = usePhotos();
  const { loading: userLoading, user, error: userError } = useUserStore();

  if (userLoading || photosLoading) {
    return (
      <div className={`${className} w-full`} data-testid="skeleton">
        <Skeleton count={2} height={500} className="mb-5" />
      </div>
    );
  }

  if (userError || photosError) {
    return (
      <div className={`${className} container`}>
        <p className="text-red-500">Error: {userError || photosError}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`${className} container`}>
        <p className="flex justify-center font-bold">User data not available</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-6 `}>
      {photos && photos.length > 0 ? (
        photos.map((content: PhotoWithUserDetails) => (
          <Post key={content.docId} content={content} />
        ))
      ) : (
        <p className="flex justify-center font-bold">No photos available</p>
      )}
    </div>
  );
}

export default Timeline
