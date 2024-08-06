'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import {useRouter, redirect} from "next/navigation";

const Landing = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const router = useRouter();

    const checkToken = () => {
        const token = localStorage.getItem('jwtToken');
        console.log(token);
    
        if (token) {
          setIsLoading(true);
          axios.get('http://localhost:8000/api/landing', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            setIsAuthenticated(true);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Token validation failed:', error);
            setIsAuthenticated(false);
            setIsLoading(false);
          });
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    if(isLoading) { return <div>...loading</div>}
  
    if (!isAuthenticated) {
        console.log(localStorage.getItem('jwtToken'));
        return redirect('/login');
    }

    return <div>Landing</div>;
}

export default Landing;