import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Sort } from './filterSlice';

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}

interface GameSliceState {
    items: Game[];
    status: Status;
}

export type SearchGameParams = {
    order: string;
    sortBy: string;
    category: string;
    search: string;
    currentPage: string;
};

type Game = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    rating: number;
};

const initialState: GameSliceState = {
    items: [],
    status: Status.LOADING,
};

export const fetchGames = createAsyncThunk<Game[], Record<string, string>>(
    'games/fetchGamesStatus',
    async params => {
        const { order, sortBy, category, search, currentPage } = params;
        const { data } = await axios.get<Game[]>(
            `https://62977b578d77ad6f75041321.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data;
    }
);

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Game[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchGames.pending, state => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchGames.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchGames.rejected, state => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const { setItems } = gamesSlice.actions;

export default gamesSlice.reducer;
