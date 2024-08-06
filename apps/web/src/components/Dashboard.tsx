'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import {useRouter, redirect} from "next/navigation";

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      console.log(token);
  
      if (token) {
        // Validate token on server (optional)
        axios.get('localhost:8000/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setIsAuthenticated(true);
        })
        .catch(error => {
          console.error('Token validation failed:', error);
          setIsAuthenticated(false);
        });
      } else {
        setIsAuthenticated(false);
      }
    }, []);
  
    if (!isAuthenticated) {
        return redirect('/login');
    }

    return <div>Dashboard</div>;
}

export default Dashboard;