"use client";

import { EmptyState, PageShell } from "@/components/page-shell";
import { apiClient } from "@/lib/authClient";
import { getCookie } from "cookies-next";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { ProfileContent } from "./_components/organisms/profile-content";
import type { MeQuery } from "./_types/profile";

export default function Profile() {
  const [user, setUser] = useState<MeQuery | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMe = async () => {
      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        const token = getCookie("token");
        if (!token) {
          if (isMounted) setError("Нэвтрэх token олдсонгүй.");
          return;
        }

        const res = await apiClient.api.user.me.get();
        if (isMounted) {
          setUser(res.data ?? null);
          if (!res.data) setError("Хэрэглэгчийн мэдээлэл олдсонгүй.");
        }
      } catch (fetchError) {
        console.error("Failed to fetch profile data:", fetchError);
        if (isMounted) setError("Хувийн мэдээлэл авахад алдаа гарлаа.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchMe();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageShell
      eyebrow="Account"
      title="Профайл"
      description="Нэвтэрсэн ажилтны эрх, салбар, холбоо барих мэдээлэл."
      icon={<UserRound className="size-5" />}
    >
      {isLoading && (
        <EmptyState title="Уншиж байна" description="Хувийн мэдээлэл татаж байна..." />
      )}

      {!isLoading && error && (
        <EmptyState title="Мэдээлэл авах боломжгүй" description={error} />
      )}

      {!isLoading && user && <ProfileContent user={user} />}
    </PageShell>
  );
}
