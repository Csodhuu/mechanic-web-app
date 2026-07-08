"use client";

import { User } from "lucide-react";

export default function Userinfo() {
  return (
    <div className="grid grid-cols-6">
      <div className="flex items-center justify-center border-r">
        <User className="rounded-full bg-slate-300 p-2" size={40} />
      </div>
      <div className="col-span-5 flex flex-col items-center justify-center p-2 font-semibold">
        <p>Сайн байна уу</p>
      </div>
    </div>
  );
}
