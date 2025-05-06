import React, { useState, useEffect } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { GoMoon } from "react-icons/go";
import { IoMdJet } from "react-icons/io";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const newTheme = isDark ? "black" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  }, [isDark]);

  return (
    <nav className="navbar bg-base-100 shadow-sm px-10">
      <Link to='/' className="flex items-center gap-3 flex-1">
      <IoMdJet className="text-xl text-teal-500"/>
        <span className="text-xl font-semibold">JetDeals</span>
      </Link>

      <div className="flex items-center gap-2">
        <Link to="/savedDeals" className="btn btn-ghost border-none flex items-center gap-2">
          <IoIosHeartEmpty className="text-lg" />
          <span>Saved Deals</span>
        </Link>
        

        <label className="swap swap-rotate cursor-pointer">
          <input
            type="checkbox"
            checked={isDark}
            onChange={() => setIsDark(!isDark)}
          />
          {/* Light Icon */}
          <IoSunnyOutline className="swap-on fill-current text-2xl" />
          {/* Dark Icon */}
          <GoMoon className="swap-off fill-current text-2xl" />
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
