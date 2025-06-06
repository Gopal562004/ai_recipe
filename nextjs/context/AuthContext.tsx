import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface AuthContextType {
  user: any | null;
  setUser: Dispatch<SetStateAction<any | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
