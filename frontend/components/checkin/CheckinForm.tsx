'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';

interface CheckinFormProps {
  onSubmit: (data: {
    body?: string;
    mind?: string;
    relations?: string;
    nature?: string;
  }) => void;
  initialData?: {
    body?: string;
    mind?: string;
    relations?: string;
    nature?: string;
  };
  mode?: string;
}

interface Question {
  id: string;
  area: string;
  text: string;
}

const areaIcons: Record<string, string> = {
  body: '🧘',
  mind: '🧠',
  relations: '💬',
  nature: '🌿',
};

const areaTitles: Record<string, string> = {
  body: 'Body',
  mind: 'Mind',
  relations: 'Relations',
  nature: 'Nature',
};

export function CheckinForm({ onSubmit, initialData, mode = 'default' }: CheckinFormProps) {
  const [formData, setFormData] = useState({
    body: initialData?.body || '',
    mind: initialData?.mind || '',
    relations: initialData?.relations || '',
    nature: initialData?.nature || '',
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, [mode]);

  const loadQuestions = async () => {
    try {
      const data = await api.getQuestions(mode);
      setQuestions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((question) => (
        <Card key={question.id} className="p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{areaIcons[question.area]}</span>
              <h3 className="text-lg font-medium">{areaTitles[question.area]}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{question.text}</p>
            <Textarea
              value={formData[question.area as keyof typeof formData]}
              onChange={(e) =>
                setFormData({ ...formData, [question.area]: e.target.value })
              }
              placeholder="Optional note..."
              className="min-h-[80px]"
            />
          </div>
        </Card>
      ))}

      <Button type="submit" className="w-full" size="lg">
        Save
      </Button>
    </form>
  );
}