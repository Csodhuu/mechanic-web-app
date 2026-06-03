"use client";

import { CpOrderQuery } from "@/app/(base)/jobs/model";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/authClient";
import { getCookie } from "cookies-next";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InitialExamination() {
  const router = useRouter();
  const [data, setData] = useState<CpOrderQuery | null>();
  const [isLoading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await apiClient.api.crm["cp-order"].get({
        query: {
          pagination: { page: 1, size: 10 },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch merchant data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <Card className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Анхан үзлэг</h2>

        <button
          className="flex items-center gap-1 text-sm font-medium text-blue-600"
          onClick={() => router.push("/jobs")}
        >
          Дэлгэрэнгүй харах
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      {/* Cards */}
      <div className="space-y-3">
        {data?.result.map((item, index) => (
          <Card key={index} className="rounded-[24px] border border-slate-200 p-2 shadow-none">
            {/* Top */}
            <div className=" flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium text-slate-800">{item.vehicle?.vin}</span>

                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              </div>

              <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-600">
                {item.order.state}
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-[90px_1fr_20px] items-center gap-3">
              {/* Image */}
              <div className="flex items-center justify-center">
                <img
                  src={
                    "https://www.pngall.com/wp-content/uploads/19/No-Brand-Car-Design-Concept-PNG.png"
                  }
                  alt={"image"}
                  className="h-[70px] w-[90px] object-contain"
                />
              </div>

              {/* Info */}
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-slate-900">
                  {item.make?.name} {item.model?.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700">
                    {item.vehicle?.licensePlate}
                  </span>

                  <span className="text-slate-300">|</span>

                  <span className="text-sm text-slate-500">{item.vehicle?.km} Km</span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {item.customer?.phoneNumber}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
