import { useCallback, useEffect, useState } from "react";
import { listenToPhotosUpdates, PhotoWithUserDetails } from "@/services/firebase";
import { useUserStore } from "./use-user-store";

export default function usePhotos() {
  const [photos, setPhotos] = useState<PhotoWithUserDetails[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore()

  const handlePhotosUpdate = useCallback((data: PhotoWithUserDetails[]) => {
    setLoading(true)
    setPhotos(data);
    setLoading(false);
  }, []);

  const handleError = useCallback((err: Error) => {
    setError(err.message);
    setLoading(false);
  }, []);

  useEffect(() => {
    let isActive = true;
    let unsubscribe: (() => void) | undefined;

    const setupListener = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        unsubscribe = listenToPhotosUpdates({
          following: user.following,
          userId: user.userId,
          callback: (data) => {
            if (isActive) {
              handlePhotosUpdate(data)
            }
          },
        });
      } catch (err) {
        if (isActive) {
          handleError(err as Error);
        }
      }
    };

    setupListener();

    return () => {
      isActive = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, handleError, handlePhotosUpdate])

  return { photos, loading, error };
}
