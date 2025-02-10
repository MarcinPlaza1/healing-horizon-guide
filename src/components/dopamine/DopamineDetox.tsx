import { Brain, Target, Clock, Battery, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AddChallengeDialog } from "./AddChallengeDialog";
import { ChallengeList } from "./ChallengeList";

export const DopamineDetox = () => {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Dopamine Detox
          </h1>
          <p className="text-muted-foreground mt-2">
            Reset your brain's reward system and improve focus through mindful digital habits
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 days</div>
              <p className="text-xs text-muted-foreground mt-1">Best: 0 days</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <Progress value={85} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Daily Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2/5</div>
              <Progress value={40} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Digital Wellness</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Good</div>
              <p className="text-xs text-muted-foreground mt-1">Based on usage patterns</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Challenges</CardTitle>
                <CardDescription>Your ongoing dopamine detox challenges</CardDescription>
              </div>
              <AddChallengeDialog />
            </CardHeader>
            <CardContent>
              <ChallengeList />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Milestones in your detox journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Trophy className="h-8 w-8 text-primary/60" />
                  <div>
                    <p className="font-medium">First Day Complete</p>
                    <p className="text-sm text-muted-foreground">Completed a full day of digital detox</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Trophy className="h-8 w-8 text-primary/60" />
                  <div>
                    <p className="font-medium">Early Bird</p>
                    <p className="text-sm text-muted-foreground">Avoided screens for the first hour after waking</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DopamineDetox;
