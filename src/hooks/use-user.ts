import { getUserByUserId, UserData } from "@/services";
import { useCallback, useEffect, useState } from "react";
import useAuth from "./use-auth";

export default function useUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUserData = useCallback(async (uid: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserByUserId({ userId: uid });
      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.uid) {
      fetchUserData(user.uid);
    } else {
      setUserData(null);
      setLoading(false);
    }
  }, [user, fetchUserData]);

  const refreshUserData = useCallback(() => {
    if (user?.uid) {
      fetchUserData(user.uid);
    }
  }, [user, fetchUserData]);

  return { userData, loading, error, refreshUserData };
}
