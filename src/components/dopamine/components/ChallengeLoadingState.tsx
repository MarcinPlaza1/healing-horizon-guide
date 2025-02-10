
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, Loader } from "lucide-react";

export const ChallengeLoadingState = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[300px] mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <Skeleton className="h-4 w-[80px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

