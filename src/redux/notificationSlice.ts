import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { AppNotification } from '@/types';

const seed: AppNotification[] = [
  { id: 'n1', title: 'Shipment Delivered', message: 'BK-10003 delivered at Bangalore.', time: '5m ago', read: false, type: 'success' },
  { id: 'n2', title: 'New Quotation', message: 'Quotation sent for ENQ-5012.', time: '1h ago', read: false, type: 'info' },
  { id: 'n3', title: 'Document Expiring', message: 'Permit for MH 12 AB 4521 expires soon.', time: '3h ago', read: true, type: 'warning' },
];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { items: seed },
  reducers: {
    pushNotification: {
      prepare(payload: Omit<AppNotification, 'id' | 'read' | 'time'>) {
        return { payload: { ...payload, id: nanoid(), read: false, time: 'Just now' } };
      },
      reducer(state, action: PayloadAction<AppNotification>) {
        state.items.unshift(action.payload);
      },
    },
    markAllRead(state) {
      state.items.forEach((n) => (n.read = true));
    },
  },
});

export const { pushNotification, markAllRead } = notificationSlice.actions;
export default notificationSlice.reducer;
