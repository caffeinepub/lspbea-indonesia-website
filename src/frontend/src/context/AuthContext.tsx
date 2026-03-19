import { createContext, useContext, useEffect, useState } from "react";

export interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user";
  registeredAt: string;
}

interface AuthContextType {
  currentUser: UserData | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (userData: Omit<UserData, "role" | "registeredAt">) => {
    success: boolean;
    message: string;
  };
  getAllUsers: () => UserData[];
  isAdmin: boolean;
}

const USERS_KEY = "lspbea_users";
const CURRENT_USER_KEY = "lspbea_current_user";

const ADMIN_ACCOUNT: UserData = {
  username: "adminlspbea",
  password: "admin1234",
  firstName: "Admin",
  lastName: "LSPBEA",
  email: "admin@lspbea.id",
  role: "admin",
  registeredAt: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  const getAllUsers = (): UserData[] => {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const login = (username: string, password: string): boolean => {
    if (
      username === ADMIN_ACCOUNT.username &&
      password === ADMIN_ACCOUNT.password
    ) {
      setCurrentUser(ADMIN_ACCOUNT);
      return true;
    }
    const users = getAllUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (
    userData: Omit<UserData, "role" | "registeredAt">,
  ): { success: boolean; message: string } => {
    const users = getAllUsers();
    if (users.length >= 100) {
      return {
        success: false,
        message: "Batas maksimal 100 pengguna telah tercapai.",
      };
    }
    if (users.find((u) => u.username === userData.username)) {
      return { success: false, message: "Nama akun sudah digunakan." };
    }
    if (users.find((u) => u.email === userData.email)) {
      return { success: false, message: "Email sudah terdaftar." };
    }
    const newUser: UserData = {
      ...userData,
      role: "user",
      registeredAt: new Date().toISOString(),
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    return { success: true, message: "Pendaftaran berhasil!" };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        getAllUsers,
        isAdmin: currentUser?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
