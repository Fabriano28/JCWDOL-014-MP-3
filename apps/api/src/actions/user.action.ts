import prisma from "../prisma";
import { genSalt, hash, compare } from "bcrypt";

class UserAction {

    public async findUserByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                email,
                },
        });

        return user;
        } catch (err) {
            throw err;
        }
    }

    public async findUserById(user_id: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                user_id,
                },
        });

        return user;
        } catch (err) {
            throw err;
        }
    }

    public async createUser(email: string, password: string, first_name: string, last_name: string){
        try {
            const check = await this.findUserByEmail(email);

            if (check) throw new Error("Email already exist");

            const salt = await genSalt(10);
            const hashPass = await hash(password, salt);

            const user = await prisma.user.create({
                data: {
                email,
                password: hashPass,
                first_name,
                last_name,
                role_id: 1,
                },
            });

            return user;
        } catch (err) {
            throw err;
        }
    }
}

export default new UserAction();