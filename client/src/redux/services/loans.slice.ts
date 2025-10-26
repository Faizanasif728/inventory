import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoanEntry {
  id: string;
  name: string;
  phone: string;
  date: string; // ISO date string
  amount: number;
  status: 'PENDING' | 'RECEIVED';
}

interface LoansState {
  items: LoanEntry[];
}

const initialState: LoansState = {
  items: [],
};

const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    addLoan: (state, action: PayloadAction<Omit<LoanEntry, 'id'>>) => {
      const id = `${Date.now()}`;
      state.items.unshift({ id, ...action.payload });
    },
    deleteLoan: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((l) => l.id !== action.payload);
    },
    updateLoanStatus: (state, action: PayloadAction<{ id: string; status: LoanEntry['status'] }>) => {
      const item = state.items.find((l) => l.id === action.payload.id);
      if (item) {
        item.status = action.payload.status;
      }
    },
  },
});

export const { addLoan, deleteLoan, updateLoanStatus } = loansSlice.actions;
export default loansSlice.reducer;

