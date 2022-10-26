import { atom } from "recoil";

// TypeScript interface
export interface DashboardQueState {
    empty: boolean
    que: Array<number>
}

// Auth Modal, default state
const defaultDashboardState: DashboardQueState = {
    empty: true,
    que: [],
}

export const dashboardQueState = atom<DashboardQueState>({
    key: 'dashboardQueState',
    default: defaultDashboardState
})