"use client";

import { User } from "lucide-react";
import { MeQuery } from "../../page";

interface Props {
  data: MeQuery | null;
}

export default function Userinfo({ data }: Props) {
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="flex justify-center items-center border-r">
          <User className="bg-slate-300 p-2 rounded-full" size={40} />
        </div>
        <div className="p-2 col-span-5 font-semibold flex flex-col items-center justify-center">
          <p>Сайн байна уу , {data?.name}</p>
        </div>
      </div>
    </>
  );
}
