import api from "./api";

// AUTHENTICATION
export async function checkAuthStatus() {
  const res = await api.get("/users/check-auth");
  return res.data;
}
export async function loginUser({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}
export async function logoutUser() {
  const { data } = await api.get("/auth/logout");
  return data;
}

export async function signupUser({
  fullName,
  email,
  phoneNumber,
  password,
  passwordConfirm,
}) {
  const { data } = await api.post("/auth/signup", {
    fullName,
    email,
    password,
    passwordConfirm,
    phoneNumber,
  });
  return data;
}
export async function updateMyPassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  const { data } = await api.patch("/auth/updateMyPassword", {
    passwordCurrent,
    password,
    passwordConfirm,
  });

  return data;
}
export async function forgotPassword({ email }) {
  const { data } = await api.post("/auth/forgotPassword", { email });
  return data;
}
export async function resetPassword({ token, password, passwordConfirm }) {
  const { data } = await api.patch(`/auth/resetPassword/${token}`, {
    password,
    passwordConfirm,
  });
  return data;
}
export async function emailVerify({ token }) {
  const { data } = await api.get(`/auth/verify-email/${token}`);
  return data;
}

export async function deleteMe() {
  const { data } = await api.delete("/auth/deleteMe");
  return data;
}

export async function resendVerificationEmail({ email }) {
  try {
    const { data } = await api.post("/users/resend-verification", { email });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}
