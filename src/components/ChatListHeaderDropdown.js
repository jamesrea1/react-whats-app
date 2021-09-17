import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { auth } from 'lib/firebase';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ChatListHeaderDropdown() {
  const handleSignOut = (e) => {
    auth.signOut();
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-20">
      <div>
        <Menu.Button className="w-10 h-10 ml-2 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100">
          <span className="sr-only">Open options</span>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
            ></path>
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full text-left px-4 py-2 text-sm'
                  )}
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
