'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { CheckinForm } from '@/components/checkin/CheckinForm';
import { api } from '@/lib/api';
import { Checkin } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface Quote {
  id: string;
  author: string;
  text: string;
  source?: string;
}

export default function TodayPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [checkin, setCheckin] = useState<Checkin | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadTodayCheckin();
      loadQuote();
    }
  }, [user]);

  const loadTodayCheckin = async () => {
    try {
      const data = await api.getTodayCheckin();
      setCheckin(data);
    } catch (error) {
      setCheckin(null);
    } finally {
      setLoading(false);
    }
  };

  const loadQuote = async () => {
    try {
      const data = await api.getQuote();
      setQuote(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const result = await api.createCheckin(data);
      const isUpdate = checkin !== null;
      setCheckin(result);
      toast.success(isUpdate ? 'Check-in updated' : 'Check-in saved');
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

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Balance</h1>
          <p className="text-muted-foreground mt-1">{today}</p>
        </div>
        <Link href="/history">
          <Button variant="outline">History</Button>
        </Link>
      </div>

      {quote && (
        <Card className="p-6 bg-muted/50">
          <blockquote className="space-y-2">
            <p className="text-lg italic">"{quote.text}"</p>
            <footer className="text-sm text-muted-foreground">
              — {quote.author}
              {quote.source && `, ${quote.source}`}
            </footer>
          </blockquote>
        </Card>
      )}

      <CheckinForm onSubmit={handleSubmit} initialData={checkin || undefined} />
    </div>
  );
}