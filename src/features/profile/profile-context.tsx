
import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from 'react';

import { mockProfile } from './data/mock-profile';
import type { UserProfile } from './types/user-profile';

interface ProfileContextType {
    profile: UserProfile;
    setProfile: Dispatch<SetStateAction<UserProfile>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
    children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
    const [profile, setProfile] = useState<UserProfile>(mockProfile);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }

    return context;
}
