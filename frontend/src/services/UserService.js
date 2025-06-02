import instance from '../untils/axiosCustomize';

export const updateUserProfile = async (data) => {
    const response = await instance.put('/v1/users/me', data);
    return response.data;
}

export const updateUserPassword = async (data) => {
    const response = await instance.put('/v1/users/me/change-password', data);
    return response.data;
}

export const getUserProfile = async () => {
    const response = await instance.get('/v1/users/me');
    return response.data;
}

export const getUserBookingHistory = async () => {
    const response = await instance.get('/v1/bookings/me');
    return response.data;
}