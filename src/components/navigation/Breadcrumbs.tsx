import { useRouter } from "next/router";
import Link from "next/link";

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
          <Link href="/app">🏡</Link>
        </li>
        {crumbs.map((page) => {
          return (
            <li key={page.name}>
              <div className="flex items-center text-sm">
                <div>
                  <span className="flex-shrink-0">/</span>
                </div>
                <Link href={page.href}>
                  <a className="ml-4">
                    {page.name.length > 16
                      ? `${page.name.slice(0, 14)}...`
                      : page.name}
                  </a>
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
