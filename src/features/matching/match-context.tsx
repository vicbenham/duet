
import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from 'react';

import { mockActiveMatch } from '@/features/inbox/data/mock-inbox';
import type { ActiveMatch } from '@/features/inbox/types/inbox';

interface MatchContextType {
    activeMatch: ActiveMatch | null;
    setActiveMatch: Dispatch<SetStateAction<ActiveMatch | null>>;
    reportedConversationIds: string[];
    markConversationReported: (conversationId: string) => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

interface MatchProviderProps {
    children: ReactNode;
}

export function MatchProvider({ children }: MatchProviderProps) {
    const [activeMatch, setActiveMatch] = useState<ActiveMatch | null>(mockActiveMatch);
    const [reportedConversationIds, setReportedConversationIds] = useState<string[]>([]);

    const markConversationReported = (conversationId: string) => {
        setReportedConversationIds((current) =>
            current.includes(conversationId)
                ? current
                : [...current, conversationId]
        );
    };

    return (
        <MatchContext.Provider
            value={{
                activeMatch,
                setActiveMatch,
                reportedConversationIds,
                markConversationReported,
            }}
        >
            {children}
        </MatchContext.Provider>
    );
}

export function useMatch() {
    const context = useContext(MatchContext);

    if (!context) {
        throw new Error('useMatch must be used within a MatchProvider');
    }

    return context;
}
