import { Link } from 'react-router-dom';
import ROUTES from '@/constants/routes';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page not found</h2>
      <p className="text-xl text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link
        to={ROUTES.DASHBOARD}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Go back to home page
      </Link>
    </div>
  );
};

export default NotFound;