import { createAsyncThunk } from "@reduxjs/toolkit";
import { addXeMay } from "../reducers/XeMayReducer"
const api = "http://192.168.1.175:3000/XeMay"

export const fetchXeMay = () => {
    return async dispatch => {
        try {
            const response = await fetch(api);
            const data = await response.json();
            data.forEach(element => {
                dispatch(addXeMay(element))
            });
        } catch (error) {
            console.log("Lỗi lấy danh sách" + error);
        }
    }
}

export const deleteXeMayApi = createAsyncThunk(
    'xeMay/deleteXeMay', async (id, thunkAPI) => {
        try {
            const response = await fetch(`${api}/${id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                return id;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const addXeMayApi = createAsyncThunk(
    'xeMay/addXeMay', async (objXeMay, thunkAPI) => {
        console.log(objXeMay);
        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objXeMay),

            })
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            console.log('Error:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const updateXeMayApi = createAsyncThunk(
    'xeMay/updateXeMay',async(objXeMay,thunkAPI) =>{
        try {
            const response = await fetch(`${api}/${objXeMay.id}`, {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(objXeMay.data),
              });
              const data = await response.json();
              if (response.ok) {
                return data;
              } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
              }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


