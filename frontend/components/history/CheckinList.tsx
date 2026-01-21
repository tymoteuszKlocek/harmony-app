'use client';

import { Checkin } from '@/types';
import { Card } from '@/components/ui/card';

interface CheckinListProps {
  checkins: Checkin[];
}

export function CheckinList({ checkins }: CheckinListProps) {
  if (checkins.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No check-ins yet. Start with today!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {checkins.map((checkin) => (
        <Card key={checkin.id} className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {new Date(checkin.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              {checkin.mode === 'forest' && (
                <span className="text-sm text-muted-foreground">🌲 Forest</span>
              )}
            </div>

            <div className="grid gap-4">
              {checkin.body && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>🧘</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      Body
                    </span>
                  </div>
                  <p className="text-sm pl-7">{checkin.body}</p>
                </div>
              )}

              {checkin.mind && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>🧠</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      Mind
                    </span>
                  </div>
                  <p className="text-sm pl-7">{checkin.mind}</p>
                </div>
              )}

              {checkin.relations && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>💬</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      Relations
                    </span>
                  </div>
                  <p className="text-sm pl-7">{checkin.relations}</p>
                </div>
              )}

              {checkin.nature && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>🌿</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      Nature
                    </span>
                  </div>
                  <p className="text-sm pl-7">{checkin.nature}</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}