import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Account {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface AuthState {
  // Auth mode state
  isSignUp: boolean;
  setSignUpMode: (isSignUp: boolean) => void;
  
  // Accounts management
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id' | 'createdAt'>) => void;
  
  // Current user
  currentUser: Account | null;
  setCurrentUser: (user: Account | null) => void;
  
  // Auth actions
  signIn: (email: string, password: string) => boolean;
  signUp: (email: string, password: string) => boolean;
  signOut: () => void;
  
  // Check if email exists
  emailExists: (email: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isSignUp: false,
      accounts: [
        {
          id: "test-account-001",
          email: "test@gmail.com",
          password: "123456789",
          createdAt: new Date("2025-01-01T00:00:00.000Z"),
        }
      ],
      currentUser: null,

      // Actions
      setSignUpMode: (isSignUp: boolean) => set({ isSignUp }),

      addAccount: (accountData) => {
        const newAccount: Account = {
          ...accountData,
          id: Date.now().toString(),
          createdAt: new Date(),
        };
        set((state) => ({
          accounts: [...state.accounts, newAccount],
        }));
      },

      setCurrentUser: (user) => set({ currentUser: user }),

      signIn: (email: string, password: string) => {
        const { accounts } = get();
        const account = accounts.find(
          (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
        );
        
        if (account) {
          set({ currentUser: account });
          return true;
        }
        return false;
      },

      signUp: (email: string, password: string) => {
        const { accounts, emailExists } = get();
        
        // Check if email already exists
        if (emailExists(email)) {
          return false;
        }

        // Add new account
        get().addAccount({ email, password });
        
        // Automatically sign in the new user
        const newAccount = get().accounts.find(
          (acc) => acc.email.toLowerCase() === email.toLowerCase()
        );
        
        if (newAccount) {
          set({ currentUser: newAccount });
        }
        
        return true;
      },

      signOut: () => set({ currentUser: null }),

      emailExists: (email: string) => {
        const { accounts } = get();
        return accounts.some(
          (acc) => acc.email.toLowerCase() === email.toLowerCase()
        );
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accounts: state.accounts,
        currentUser: state.currentUser,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log('Error rehydrating auth store:', error);
        } else {
          console.log('Auth store rehydrated successfully');
        }
      },
    }
  )
);
