import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";

const Breadcrumbs = () => {
  const router = useRouter();

  const paths = router.isReady ? router.asPath.split("/") : [];

  // because it starts with "/..."
  const [e, a, ...crumbs] = paths.map((path) => ({
    href: router.asPath.slice(0, router.asPath.indexOf(path) + path.length),
    name: path,
  }));

  return (
    <nav className="flex overflow-x-scroll" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <Link href="/app">
            <a className="text-gray-800 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-pink-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </Link>
        </li>
        {crumbs.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Link href={page.href}>
                <a className="ml-4 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-pink-500">
                  {page.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
