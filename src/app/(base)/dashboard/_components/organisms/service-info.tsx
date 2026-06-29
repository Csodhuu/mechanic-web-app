"use client";

import { Card } from "@/components/ui/card";
import { Stethoscope, Wrench, RefreshCw } from "lucide-react";
import { useState } from "react";

const serviceInfo = [
  {
    Key: "wrench",
    name: "Анхан үзлэг",
    value: 4,
    description: "Үзлэг хүлээгдэж буй",
    icon: Wrench,
    color: "bg-blue-500",
    iconColor: "text-white",
    textColor: "text-blue-500",
  },
  {
    Key: "stethoscope",
    name: "Оношилгоо",
    value: 2,
    description: "Дээшлүүлсэн авто",
    icon: Stethoscope,
    color: "bg-amber-500",
    iconColor: "text-white",
    textColor: "text-amber-500",
  },

  {
    Key: "refresh-cw",
    name: "Буцаагдсан ажил",
    value: 1,
    description: "Дахин засварлах",
    icon: RefreshCw,
    color: "bg-red-500",
    iconColor: "text-white",
    textColor: "text-red-500",
  },
];

export default function ServiceInfo() {
  const [activeKey, setActiveKey] = useState<string | null>("wrench");
  return (
    <div className="grid grid-cols-3 gap-2">
      {serviceInfo.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card
            key={index}
            className={`p-2 sm:p-3 rounded-xl ${activeKey === item.Key ? "border-2 border-blue-500" : ""}`}
            onClick={() => setActiveKey(item.Key)}
          >
            <div className="flex flex-col items-center text-center justify-between">
              <div
                className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-2 p-2`}
              >
                <Icon className={`${item.iconColor}`} size={20} />
              </div>
              <p className="text-[10px] sm:text-sm font-medium leading-tight">{item.name}</p>
              <p className={`text-lg font-bold sm:text-2xl ${item.textColor} mt-1`}>{item.value}</p>
              <p className="text-[9px] sm:text-xs text-slate-500 leading-tight">
                {item.description}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
