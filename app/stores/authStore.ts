import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Account {
  id: string;
  email: string;
  password: string;
  // createdAt may come from remote JSON (string) or be a Date locally
  createdAt: string | Date;
  avatar?: string;
}

interface AuthState {
  // Auth mode state
  isSignUp: boolean;
  setSignUpMode: (isSignUp: boolean) => void;
  // Guest flag: true when user chose to continue as guest
  isGuest: boolean;
  setGuest: (isGuest: boolean) => void;

  // Accounts management
  accounts: Account[];
  addAccount: (account: Omit<Account, "id" | "createdAt">) => void;

  // Current user
  currentUser: Account | null;
  setCurrentUser: (user: Account | null) => void;

  // Auth actions
  // signIn now calls remote JSON endpoint and may be asynchronous
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => boolean;
  signOut: () => void;

  // Check if email exists
  emailExists: (email: string) => boolean;

  // Avatar management
  updateAvatar: (avatarUri: string) => void;

  // Account management
  deleteAccount: (accountId: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isSignUp: false,
      isGuest: false,
      // Start with empty local accounts; authentication will consult remote JSON
      accounts: [],
      currentUser: null,

      // Actions
      setSignUpMode: (isSignUp: boolean) => set({ isSignUp }),

      addAccount: (accountData) => {
        const newAccount: Account = {
          ...accountData,
          id: Date.now().toString(),
          // store createdAt as ISO string for persistence consistency
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          accounts: [...state.accounts, newAccount],
        }));
      },

      setCurrentUser: (user) => set({ currentUser: user, isGuest: false }),

      signIn: async (email: string, password: string) => {
        const REMOTE_URL =
          "https://andrew-tran-impt.github.io/bmic-api/bmic-login.json";

        try {
          const res = await fetch(REMOTE_URL);
          if (!res.ok) {
            console.log(
              "auth signIn: remote responded with status",
              res.status,
            );
            return false;
          }

          const payload = await res.json();

          const remoteUser = (payload as any)?.user;
          const token = (payload as any)?.token;

          if (
            token &&
            remoteUser &&
            remoteUser.email?.toLowerCase() === email.toLowerCase()
          ) {
            const normalized: Account = {
              id: remoteUser.id ?? Date.now().toString(),
              email: remoteUser.email,
              // We don't receive password from remote for security — store the entered one locally for offline fallback
              password,
              createdAt: new Date().toISOString(),
              avatar: (remoteUser as any).avatar,
            };

            // add to local accounts if missing
            const { accounts } = get();
            const exists = accounts.some(
              (a) => a.email.toLowerCase() === normalized.email.toLowerCase(),
            );
            if (!exists) {
              set((state) => ({ accounts: [...state.accounts, normalized] }));
            }

            set({ currentUser: normalized });
            return true;
          }

          // Remote responded but did not provide valid token/user — authentication failed
          console.log(
            "auth signIn: remote did not return token/user or email mismatch",
            { payload },
          );
          return false;
        } catch (err) {
          // network or fetch error - fall back to local accounts
          console.log("auth signIn fetch error:", err);

          const { accounts } = get();
          const localMatch = accounts.find(
            (acc) =>
              acc.email.toLowerCase() === email.toLowerCase() &&
              acc.password === password,
          );
          if (localMatch) {
            set({ currentUser: localMatch });
            return true;
          }

          return false;
        }
      },

      signUp: (email: string, password: string) => {
        const { emailExists } = get();

        // Check if email already exists
        if (emailExists(email)) {
          return false;
        }

        // Add new account
        get().addAccount({ email, password });

        // Automatically sign in the new user
        const newAccount = get().accounts.find(
          (acc) => acc.email.toLowerCase() === email.toLowerCase(),
        );

        if (newAccount) {
          set({ currentUser: newAccount });
        }

        return true;
      },

      signOut: () => set({ currentUser: null, isGuest: false }),

      setGuest: (isGuest) => set({ isGuest }),

      emailExists: (email: string) => {
        const { accounts } = get();
        return accounts.some(
          (acc) => acc.email.toLowerCase() === email.toLowerCase(),
        );
      },

      updateAvatar: (avatarUri: string) => {
        const { currentUser } = get();
        if (currentUser) {
          // Update current user's avatar
          const updatedUser = { ...currentUser, avatar: avatarUri };
          set({ currentUser: updatedUser });

          // Update the account in the accounts array
          set((state) => ({
            accounts: state.accounts.map((acc) =>
              acc.id === currentUser.id ? { ...acc, avatar: avatarUri } : acc,
            ),
          }));
        }
      },

      deleteAccount: (accountId: string) => {
        const { currentUser, accounts } = get();

        // Check if the account exists
        const accountExists = accounts.some((acc) => acc.id === accountId);
        if (!accountExists) {
          return false;
        }

        // Remove the account from the accounts array
        set((state) => ({
          accounts: state.accounts.filter((acc) => acc.id !== accountId),
        }));

        // If the deleted account is the current user, sign them out
        if (currentUser && currentUser.id === accountId) {
          set({ currentUser: null });
        }

        return true;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accounts: state.accounts,
        currentUser: state.currentUser,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log("Error rehydrating auth store:", error);
        } else {
          console.log("Auth store rehydrated successfully");
        }
      },
    },
  ),
);
