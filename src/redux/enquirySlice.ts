import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { Enquiry, EnquiryStatus } from '@/types';
import { enquiriesSeed } from '@/data';

interface EnquiryState {
  items: Enquiry[];
}

const enquirySlice = createSlice({
  name: 'enquiries',
  initialState: { items: enquiriesSeed } as EnquiryState,
  reducers: {
    addEnquiry: {
      prepare(payload: Omit<Enquiry, 'id' | 'status' | 'date'>) {
        return {
          payload: {
            ...payload,
            id: `ENQ-${5100 + Math.floor(Math.random() * 899)}`,
            status: 'New' as EnquiryStatus,
            date: new Date().toISOString().slice(0, 10),
            _nano: nanoid(),
          },
        };
      },
      reducer(state, action: PayloadAction<Enquiry & { _nano?: string }>) {
        const { _nano, ...enquiry } = action.payload;
        void _nano;
        state.items.unshift(enquiry);
      },
    },
    updateEnquiryStatus(state, action: PayloadAction<{ id: string; status: EnquiryStatus }>) {
      const e = state.items.find((i) => i.id === action.payload.id);
      if (e) e.status = action.payload.status;
    },
  },
});

export const { addEnquiry, updateEnquiryStatus } = enquirySlice.actions;
export default enquirySlice.reducer;
