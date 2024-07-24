import usePhotos from "@/hooks/use-photos"
import useUser from "@/hooks/use-user"
import Skeleton from "react-loading-skeleton"
import { PhotoWithUserDetails } from "@/services"
import Post from "./post"

const Timeline = ({ className }: { className?: string }) => {
  const { photos, loading: photosLoading, error: photosError } = usePhotos();
  const { userData, loading: userLoading, error: userError } = useUser();

  if (userLoading || photosLoading) {
    return (
      <div className={`${className} w-full`}>
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

  if (!userData) {
    return (
      <div className={`${className} container`}>
        <p className="flex justify-center font-bold">User data not available</p>
      </div>
    );
  }

  if (userData.following.length === 0) {
    return (
      <div className={`${className} container`}>
        <p className="flex justify-center font-bold">Follow other people to see Photos</p>
      </div>
    );
  }

  return (
    <div className={`container ${className} flex flex-col gap-6 mb-5`}>
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
