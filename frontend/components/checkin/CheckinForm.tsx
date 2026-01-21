"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
}

const areas = [
  {
    key: "body",
    icon: "🧘",
    title: "Body",
    question: "How do you feel physically?",
  },
  {
    key: "mind",
    icon: "🧠",
    title: "Mind",
    question: "What's on your mind today?",
  },
  {
    key: "relations",
    icon: "💬",
    title: "Relations",
    question: "Who mattered today?",
  },
  {
    key: "nature",
    icon: "🌿",
    title: "Nature",
    question: "Were you outside today?",
  },
];

export function CheckinForm({ onSubmit, initialData }: CheckinFormProps) {
  const [formData, setFormData] = useState({
    body: initialData?.body || "",
    mind: initialData?.mind || "",
    relations: initialData?.relations || "",
    nature: initialData?.nature || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {areas.map((area) => (
        <Card key={area.key} className="p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{area.icon}</span>
              <h3 className="text-lg font-medium">{area.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{area.question}</p>
            <Textarea
              value={formData[area.key as keyof typeof formData]}
              onChange={(e) =>
                setFormData({ ...formData, [area.key]: e.target.value })
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
