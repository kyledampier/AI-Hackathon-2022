import { atom } from "recoil";

// TypeScript interface
export interface AuthModalState {
    open: boolean;
    view: 'login' | 'signup' | 'resetPassword';
}

// Auth Modal, default state
const defaultModalState: AuthModalState = {
    open: false,
    view: 'login',
}

export const authModalState = atom<AuthModalState>({
    key: 'authModalState',
    default: defaultModalState
})