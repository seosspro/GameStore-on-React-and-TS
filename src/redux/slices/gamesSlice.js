import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGames = createAsyncThunk(
    'games/fetchGamesStatus',
    async (params, thunkAPI) => {
        const { order, sortBy, category, search, currentPage } = params;
        const { data } = await axios.get(
            `https://62977b578d77ad6f75041321.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data;
    }
);

const initialState = {
    items: [],
    status: 'loading',
};

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchGames.pending]: state => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchGames.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'succes';
        },
        [fetchGames.rejected]: state => {
            state.status = 'error';
            state.items = [];
        },
    },
});

export const { setItems } = gamesSlice.actions;

export default gamesSlice.reducer;
