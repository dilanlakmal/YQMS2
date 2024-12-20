import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { FaUser } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/home" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/details" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600">
              Details
            </Link>
            <Link to="/inspection" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600">
              Inspection
            </Link>
          </div>

          <div className="flex items-center">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center p-2 rounded-full hover:bg-gray-100">
                <FaUser className="h-6 w-6 text-gray-600" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate('/profile')}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    >
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate('/')}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;