import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        documentId: null,
        historyList: []
    },
    reducers:{
        setDocumentId: (state, action)=>{
            // console.log(action.payload);
            state.documentId = action.payload;
        },
        setHistoryList: (state, action)=>{
            state.historyList = [action.payload, ...state.historyList];
        }
    }
})

export const {setDocumentId, setHistoryList} = dataSlice.actions
export default dataSlice.reducer;