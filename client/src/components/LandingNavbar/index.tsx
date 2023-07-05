import { twMerge } from "tailwind-merge";
import Logo100percentage from "../../assets/images/logo100percentage.svg";
import { Button } from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { navigationLinks } from "./navigationLinks";

function Main() {
  return (
    <div>
      <nav className="fixed left-0 top-0 z-20 w-full border-b-2 border-[#ffe35299] !bg-transparent dark:border-[#ffe35299] dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Button
            as="a"
            href="/"
            className="flex items-center !border-none !bg-transparent"
          >
            <img
              src={Logo100percentage}
              className="mr-3 h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              GRAND CAFE
            </span>
          </Button>
          <div className="flex md:order-2">
            <Button
              type="button"
              className={twMerge([
                "mr-3 rounded-lg !border-none !bg-transparent px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-[#ffe35299] dark:hover:bg-transparent dark:focus:ring-[#ffe35299] md:mr-0",
                "focus:ring-none focus:ring-0 focus:ring-opacity-0",
                "focus-visible:outline-none",
                "dark:focus:ring-none dark:focus:ring-opacity-0",
              ])}
            >
              <Lucide
                icon="UserCircle"
                className="mx-auto block text-[#ffe35299]"
              />
            </Button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 !bg-transparent bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              {navigationLinks?.map((item, id) => (
                <li key={id}>
                  <Button
                    as="a"
                    href={item.to}
                    style={{
                      color: `linear-gradient(180deg, rgba(255, 227, 83, 0.94) 0%, #FF9224 100%) !important`,
                    }}
                    className="block border-none !bg-transparent py-2 pl-3 pr-4 uppercase !text-[#ffe35299] text-gray-900 hover:bg-transparent md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                    aria-current="page"
                  >
                    {item.title}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Main;
