import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardHeader() {

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    };

    return (
        <header className="absolute w-full z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Desktop navigation */}
                    <nav className="hidden md:flex md:grow">
                        {/* Desktop sign-in links */}
                        <ul className="flex grow justify-end flex-wrap items-center">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/simulator"
                                    className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                >
                                    Simulator
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/transactions/add"
                                    className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                >
                                    Add a transaction
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/transactions/list"
                                    className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                >
                                    Show transactions
                                </Link>
                            </li>
                            <li>
                                {/* Log out */}
                                <button
                                    onClick={handleLogout}
                                    className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                                >
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}