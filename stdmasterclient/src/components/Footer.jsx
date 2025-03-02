import { FaGraduationCap } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer bg-base-300 p-8 text-primary-content footer-center mt-4">
      <div className="text-neutral-300">
        <FaGraduationCap className="text-6xl" />
        <p className="text-md">Copyright &copy; {year} All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
