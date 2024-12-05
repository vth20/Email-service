export type PayloadLogin = {
    username: string;
    password: string;
};

export type Token = {
    accessToken: string;
    refreshToken: string;
};

export type UserData = {
    username: string;
    avatar: string;
};

export type AuthResponse = Token & UserData;
