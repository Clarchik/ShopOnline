export class UserPasswords {
    constructor(
        public oldPassword: string,
        public newPassword: string,
        public newPasswordConfirm: string
    ) { }
}
