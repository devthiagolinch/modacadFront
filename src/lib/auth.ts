const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "ACCESS_TOKEN";

const login = (accessToken: string) => {

    localStorage.setItem(
        LOCAL_STORAGE_KEY__ACCESS_TOKEN,
        JSON.stringify(accessToken)
    );
}

const logout = () => {

    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
}

export { login, logout, LOCAL_STORAGE_KEY__ACCESS_TOKEN };