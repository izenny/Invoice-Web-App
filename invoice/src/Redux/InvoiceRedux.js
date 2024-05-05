import {createSlice} from '@reduxjs/toolkit'
const invoiceSlice = createSlice({
    name:'invoice',
    initialState:{
        invoices:[]
    },reducers:{
        invoiceLists : (state,action)=>{
            console.log("action", action.payload);
            state.invoices.push(action.payload)
        },
    }
})
export const { invoiceLists } = invoiceSlice.actions;
export default invoiceSlice.reducer;
