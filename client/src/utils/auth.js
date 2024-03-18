class AuthService {
    loggedIn() {
        const token = this.getToken();
        //If there is a token that is not expired, return 'true'
        return token && !this.isTokenExpired(token) ? true : false;
    }
}

const authService = new AuthService();
export default authService;

