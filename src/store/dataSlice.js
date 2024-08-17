import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        documentId: null,
    },
    reducers:{
        setDocumentId: (state, action)=>{
            // console.log(action.payload);
            state.documentId = action.payload;
        }
    }
})

export const {setDocumentId} = dataSlice.actions
export default dataSlice.reducer;