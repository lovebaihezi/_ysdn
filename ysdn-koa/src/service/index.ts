import userService from './user-service';
import mongoService from './mongo-service';
export default class {
    constructor(
        private readonly userServer: userService,
        private readonly mongoServer: mongoService
    ) {}
}
