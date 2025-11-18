export type JWTUser = {
  id: string;
  nick: string;
  email: string;
  google_id: string;
};

export type Token = {
  user: JWTUser;
};
