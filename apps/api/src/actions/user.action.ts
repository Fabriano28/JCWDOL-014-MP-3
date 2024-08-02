import prisma from "../prisma";

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

}

export default new UserAction();