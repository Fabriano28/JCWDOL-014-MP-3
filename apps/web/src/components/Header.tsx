// apps/web/src/components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">Eventku</div>
      <div>
        <Link href="/login" className="mr-4">
          <button className="px-4 py-2 bg-blue-500 rounded">Login</button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 bg-green-500 rounded">Register</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
