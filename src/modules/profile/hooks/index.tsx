import { useState } from "react";

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<any>(null);

  // Function to update the user profile
  const updateUserProfile = (updatedProfile: any) => {
    setUserProfile(updatedProfile);
    // TODO: Add logic to update user profile in the backend
  };

  return { userProfile, updateUserProfile };
};
