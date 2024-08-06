import prisma from "../prisma";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import userAction from "./user.action";



class AuthAction {

    public async login(email: string, password: string) {
        try {
            const user = await prisma.user.findFirst({
                select: {
                    email: true,
                    first_name: true,
                    last_name: true,
                    password: true,
                    role: {
                        select: {
                        role_name: true,
                        },
                    },
                },
                where: {
                    email,
                },
            });

            if (!user) throw new Error("Email or password is incorrect");

            const isValid = await compare(password, user.password);

            if (!isValid) throw new Error("Password is incorrect");

            const payload = {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role.role_name,
            };

            const token = sign(payload, String(process.env.API_KEY), {
                expiresIn: "10000",
            });

            return { user, token};
        } catch (err) {
            throw err;
        }
    }

    public async register(email: string, password: string, first_name: string, last_name: string){
        try {
            const check = await userAction.findUserByEmail(email);

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
                include: {
                    referral: true,
                }
            });

            const referral = await prisma.referral.create({
                data: {
                    user_id: user.user_id,
                },
            });

            return { user, referral };
        } catch (err) {
            throw err;
        }
    }
}

function generateString(length: number, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    return Array.from(randomValues, (v) => charset[v % charset.length]).join('');
}

export default new AuthAction();