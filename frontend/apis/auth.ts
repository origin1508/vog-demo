import customAxios from "@/utils/customAxios";

export interface LoginRequest {
  email: string;
  password: string;
}

const oauthLoginRequest = async (
  code: string,
  state: string,
  provider: string
) => {
  const res = await customAxios.post(`/auth/login/${provider}`, {
    code,
    state,
  });

  return res.data;
};

const testLoginRequest = async (oauthId: string) => {
  const res = await customAxios.post("/auth/login/demo", {
    oauthId: oauthId,
  });

  return res.data;
};

export { oauthLoginRequest, testLoginRequest };
