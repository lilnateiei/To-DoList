import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { RiTodoFill } from "react-icons/ri";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaDumbbell } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";

export default function Home() {
  return (
    <div className="">
      <nav className="bg-purple-500 p-1">
        <ul className="flex justify-between gap-4 m-4 text-white">
          <div>
          <li className="text-2xl font-bold py-4 px-4">To-do List</li>
          </div>
          <div className="flex gap-4 font-semibold cursor-pointer   ">
          <li className=""><button className="btn-primary flex items-center"><FaPlus className="" />เพิ่มรายการใหม่</button></li>
          <li className="py-4 px-6">สมัครสมาชิก</li>
          <li className="py-4 pr-4">เข้าสู่ระบบ</li>
          </div>
        </ul>
      </nav>
      
      <div className="flex flex-1 ">

      <aside className="flex flex-col justify-end w-70 bg-slate-950 p-8 h-screen  ">
         <h1 className=" text-xl ml-5 text-white font-semibold ">Dashboard</h1>
          <ul className="m-4 font-medium text-white h-full cursor-pointer">
           <li className="p-1 flex items-center hover:bg-gray-700 hover:text-white  transition-colors duration-300"><RiTodoFill className="mx-2"/>รายการสิ่งที่ต้องทำ</li>
           <li className="p-1 flex items-center hover:bg-gray-700 hover:text-white transition-colors duration-300"><IoStatsChartSharp className="mx-2"/>สถิติรวม</li>
           <li className="p-1 flex items-center hover:bg-gray-700 hover:text-white  transition-colors duration-300"><LuClipboardList className="mx-2"/>งานที่ยังคงค้างอยู่</li>
      </ul>
      </aside>
      
       <main className="flex-1  p-6 overflow-y-auto  ">
       
        <div>
          <div className="flex justify-center mx-4 my-6  gap-8">
             <div className="w-64 h-50 rounded-xl shadow shadow-sm shadow-gray-300 ">
             </div>
             <div className="w-64 h-50 rounded-xl shadow shadow-sm  shadow-gray-300">
             </div>
             <div className="w-64 h-50 rounded-xl shadow shadow-sm  shadow-gray-300">
             </div>
          </div>
        <div className="flex justify-center  ">
          <input type="text" placeholder="เพิ่มงานใหม่" className="w-100 py-4 px-4 mr-4 bg-gray-100 rounded-lg focus:outline-none ring ring-purple-500 ring-offset ring-2  mx-5"/> <button className="btn-primary">เพิ่มงาน</button>
        </div>
        </div>
       </main>
        
      </div>
      
    
    </div>
  );
}
