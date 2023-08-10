import { useEffect, useState } from 'react';

const getCurrentYear = (): string => {
  return new Date(Date.now()).getFullYear().toString();
};

const Footer = () => {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(getCurrentYear());
  }, []);

  return (
    <footer className="bg-blue-950 py-5">
      <div className="container">
        <p className="text-center text-white">&copy;{currentYear} a-shop | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
