import { listenToUserByUsername, UserProfileData, UserData, getProfileData } from "@/services/firebase"
import { useCallback, useEffect, useState } from "react"

export default function useProfile(loggedUserId: string | undefined, username: string) {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = useCallback(async (userId: string) => {
    try {
      if (!loggedUserId) return null;
      const additionalData = await getProfileData(userId, loggedUserId);
      return additionalData;
    } catch (err) {
      console.error('Error fetching additional profile data:', err);
      setError('Error fetching profile data');
      return null;
    }
  }, [loggedUserId]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = listenToUserByUsername({
      username,
      callback: async (snapshot) => {
        if (snapshot.empty) {
          setProfileData(null);
          setError('User not found');
          setLoading(false);
          return;
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data() as UserData;
        const userId = userData.userId;

        const additionalData = await fetchProfileData(userId);

        if (additionalData) {
          setProfileData({
            ...userData,
            ...additionalData
          });
        }

        setLoading(false);
      },
      callbackError: (err) => {
        console.error('Error in user profile listener:', err);
        setError('Error listening to profile changes');
        setLoading(false);
      }
    },);

    return () => unsubscribe();
  }, [username, loggedUserId, fetchProfileData]);

  return { profileData, loading, error };
}