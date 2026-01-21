'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { CheckinList } from '@/components/history/CheckinList';
import { api } from '@/lib/api';
import { Checkin } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadCheckins();
    }
  }, [user]);

  const loadCheckins = async () => {
    try {
      const data = await api.getCheckins();
      setCheckins(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-muted-foreground mt-1">
            {checkins.length} check-in{checkins.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/today">
          <Button variant="outline">Today</Button>
        </Link>
      </div>

      <CheckinList checkins={checkins} />
    </div>
  );
}