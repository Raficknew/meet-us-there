export type JWTUser = {
  id: string;
  name: string;
  email: string;
  google_id: string;
};

export type Token = {
  user: JWTUser;
};
