export interface GoogleUserResponse {
  provider: string;
  providerId: string;
  email: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatar_link: string;
}
