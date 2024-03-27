import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarCollapseIcon, SidebarExpandIcon } from "../assets/Icons";

function Sidebar() {
  const [collapse, setCollapse] = useState(true);

  const onClickExpandSidebar = () => {
    setCollapse(false);
  }

  const onClickCollapseSidebar = () => {
    setCollapse(true);
  }

  return (collapse ? (
    <div onClick={() => onClickExpandSidebar()}
      className="fixed mt-2 py-1 px-2 bg-orange-400 rounded-r-md hover:bg-orange-500 cursor-pointer">
      <SidebarExpandIcon className="h-8 w-8 text-white" />
    </div>
  ) : (
    <div className="fixed h-screen bg-orange-400 z-10 transition -left-60 translate-x-60 duration-200">
      <div className="flex flex-row items-center justify-between h-24 bg-orange-300">
        <h1 className="pl-4 text-3xl font-bold">Point of Sale</h1>
        <div onClick={() => onClickCollapseSidebar()} className="pr-1.5 pt-1.5">
          <SidebarCollapseIcon className="h-7 w-7 text-gray-600 hover:text-gray-800 cursor-pointer duration-200" />
        </div>
      </div>
      <ul>
        <li>
          <Link to="/">
            <div className="group w-60 py-2 px-4 hover:bg-orange-600 hover:cursor-pointer duration-200">
              <span className="text-xl group-hover:text-white">Produk</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/transaction">
            <div className="group w-60 py-2 px-4 hover:bg-orange-600 hover:cursor-pointer duration-200">
              <span className="text-xl group-hover:text-white">Transaksi</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/category">
            <div className="group w-60 py-2 px-4 hover:bg-orange-600 hover:cursor-pointer duration-200">
              <span className="text-xl group-hover:text-white">Kategori</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/admin">
            <div className="group w-60 py-2 px-4 hover:bg-orange-600 hover:cursor-pointer duration-200">
              <span className="text-xl group-hover:text-white">Admin</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  ))
}

export default Sidebar;