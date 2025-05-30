import api from './api';

export interface AuthPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends AuthPayload {
  fullName: string;
  phoneNumber: string;
  passwordConfirm: string;
  username:string
  email:string;
  password:string
}

export interface PasswordUpdatePayload {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

export interface ResetPayload {
  token: string;
  password: string;
  passwordConfirm: string;
}

export async function checkAuthStatus() {
  const { data } = await api.get('/users/check-auth');
  return data;
}

export async function loginUser(payload: AuthPayload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function logoutUser() {
  const { data } = await api.get('/auth/logout');
  return data;
}

export async function signupUser(payload: SignupPayload) {
  const { data } = await api.post('/auth/signup', payload);
  return data;
}

export async function updateMyPassword(payload: PasswordUpdatePayload) {
  const { data } = await api.patch('/auth/updateMyPassword', payload);
  return data;
}

export async function forgotPassword(payload: { email: string }) {
  const { data } = await api.post('/auth/forgotPassword', payload);
  return data;
}

export async function resetPassword(payload: ResetPayload) {
  const { data } = await api.patch(`/auth/resetPassword/${payload.token}`, {
    password: payload.password,
    passwordConfirm: payload.passwordConfirm,
  });
  return data;
}

export async function emailVerify(payload: { token: string }) {
  const { data } = await api.get(`/auth/verify-email/${payload.token}`);
  return data;
}

export async function deleteMe() {
  const { data } = await api.delete('/auth/deleteMe');
  return data;
}

export async function resendVerificationEmail(payload: { email: string }) {
  const { data } = await api.post('/users/resend-verification', payload);
  return data;
}
