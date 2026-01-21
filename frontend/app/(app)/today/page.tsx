"use client";

import { useState, useEffect } from "react";
import { CheckinForm } from "@/components/checkin/CheckinForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Checkin } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TodayPage() {
  const [checkin, setCheckin] = useState<Checkin | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadTodayCheckin();
    }
  }, [user]);

  const loadTodayCheckin = async () => {
    try {
      const data = await api.getTodayCheckin();
      setCheckin(data);
    } catch (err) {
      setCheckin(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const result = await api.createCheckin(data);
      const isUpdate = checkin !== null;
      setCheckin(result);
      toast.success(isUpdate ? "Check-in updated" : "Check-in saved");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (authLoading || loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Harmony</h1>
          <p className="text-muted-foreground mt-1">{today}</p>
        </div>
        <Link href="/history">
          <Button variant="outline">History</Button>
        </Link>
      </div>

      <CheckinForm onSubmit={handleSubmit} initialData={checkin || undefined} />
    </div>
  );
}
