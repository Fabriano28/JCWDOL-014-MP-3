export interface User {
    user_id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role_id: number;
    referral: Referral;
}

export interface Referral {
    referral_id: string;
    user_id: string;
}

export interface Points {
    point_id: string;
    amount: number;
    user_id: string;
}

export interface FormErrors {
    email?: string;
    password?: string;
  }