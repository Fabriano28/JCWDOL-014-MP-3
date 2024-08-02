import prisma from "../prisma";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

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
                expiresIn: "1hr",
            });

            return { user, token};
        } catch (err) {
            throw err;
        }
    }
}

export default new AuthAction();