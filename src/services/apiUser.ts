import api from './api';

export interface UserUpdatePayload {
  fullName?: string;
  bio?: string;
  username:string
  address?:string
  phoneNumber?: string;
  avatar?: File;
}

export async function updateMe(userData: UserUpdatePayload) {
  const formData = new FormData();
  for (const key in userData) {
    const value = userData[key as keyof UserUpdatePayload];
    if (value !== null && value !== undefined) {
      formData.append(key, value as string | Blob);
    }
  }

  const { data } = await api.patch('/users/updateMe', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export async function deleteMe() {
  const { data } = await api.delete('/users/deleteMe');
  return data;
}

export async function getMe() {
  const { data } = await api.get('/users/me');
  return data.data;
}
