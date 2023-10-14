"use client";
import Image from "next/image";

/**
 *
 * @param {{session: import("next-auth").Session}} param0
 */
export default function NavBar({ session }) {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          FlashDown
        </a>
        <a href="/cards" className=" normal-case mx-3">
          Cards
        </a>
      </div>
      <div className="flex-none">
        {session ? (
          <div className="dropdown dropdown-end z-50">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  width={512}
                  height={512}
                  alt="User Icon"
                  src={
                    session.user.image ? session.user.image : "/userIcon.png"
                  }
                  className={session.user.image ? "" : "dark:invert"}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow dark:bg-slate-800 bg-slate-200 rounded-box w-52 "
            >
              {/* <li>
                <a href="/settings">Settings</a>
              </li> */}
              <li>
                <a href="/api/auth/signout">
                  <Image
                    src={"/logout.png"}
                    width={16}
                    height={16}
                    className="dark:invert py-3"
                    alt="Logout Icon"
                  />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <a className="btn btn-ghost" href="/api/auth/signin">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
