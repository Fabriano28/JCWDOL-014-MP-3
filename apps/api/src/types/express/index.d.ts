export type User = {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
};
  
  declare global {
    namespace Express {
      export interface Request {
        user?: User;
      }
    }
  }