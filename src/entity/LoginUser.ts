class LoginUser {
    id: number;
    roles: Array<string>;
    permissions: Array<string>;
    token: string;
    constructor(loginUser: any) {
        this.id = loginUser.id;
        this.token = loginUser.token;
        this.roles = loginUser.roles;
        this.permissions = loginUser.permissions;
    }
}
