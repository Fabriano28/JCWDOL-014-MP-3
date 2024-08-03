"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormErrors } from "@/interfaces/interfaces";
import axios from "axios";


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const router = useRouter();   


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const newErrors: FormErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });

            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit">Login</button>
        </form>   
    );
};

export default LoginForm;