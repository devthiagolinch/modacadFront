import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_USER_DATA } from "../../lib/auth";

interface IUserContextData {
    user: IUserData | null;
    setUser: React.Dispatch<React.SetStateAction<IUserData | null>>;
}

interface IUserProviderProps {
    children: React.ReactNode;
}

interface IUserData {
    name: string;
    role: string;
}

const UserContext = createContext<IUserContextData | null>(null);

export const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserData | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}