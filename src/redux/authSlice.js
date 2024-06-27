import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Toast from 'react-native-toast-message'

const initialState = {
    user: [],
    token: '',
    isLoading: false,
    error: null,
    formStatus: '',
    userTrackingId: '',
    startTracking: true,
    updateTracking: false
}

const showToast = (type, message) => {
    Toast.show({
        type: type,
        text1: message,
    });
};


export const UserLogin = createAsyncThunk(
    'auth/UserLogin',
    async (config, { rejectWithValue }) => {
        axios.request(config)
        try {
            const response = await axios(config);

            console.log("response", JSON.stringify(response));
            if (response.data.success == "false") {

                showToast('error', response.data.message)
                return rejectWithValue(response.data);

            } else {
                showToast('success', 'Login Successful')
                // state.user = action.payload
                // dispatch(CurrentUser(response.data))
                console.log('response', response.data)
                // state.formStatus = action.payload
                // dispatch(formStatus(response.data.fillFormStatus))
                // state.token = action.payload
                return response.data;

                // dispatch(setToken(response.data.token))
            }
        }
        catch (error) {

            console.log(error);
            showToast('error', error.message)
            return rejectWithValue(error);

        }
    }
);



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        CurrentUser: (state, action) => {
            state.user = action.payload
            // console.log('completeUser', action.payload)
        },
        formStatus: (state, action) => {
            state.formStatus = action.payload
            // console.log('redux form status', action.payload)
        },
        setToken: (state, action) => {
            state.token = action.payload
            // console.log("action.payload", action.payload)
        },
        clearToken: (state, action) => {
            state.user = []
            state.token = ''
        },
        userTrackingId: (state, action) => {
            state.userTrackingId = action.payload
        },
        clearUserTrackingId: (state, action) => {
            state.userTrackingId = ""

        },
        startTrackings: (state, action) => {
            state.startTracking = action.payload
        },
        updateTrackings: (state, action) => {
            state.updateTracking = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(UserLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.user = action.payload;
                state.formStatus = action.payload.fillFormStatus

            })
            .addCase(UserLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
})

export const { CurrentUser, setToken, clearToken, formStatus, userTrackingId, startTrackings, clearUserTrackingId, updateTrackings } = authSlice.actions

export default authSlice.reducer