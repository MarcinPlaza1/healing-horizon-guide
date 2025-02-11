
import { AlertTriangle, CheckCircle, Clock, Brain, PillBottle, HeartPulse } from "lucide-react";
import { ReactNode } from "react";

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'recovered':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'relapsed':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

export const getStatusIcon = (status: string): ReactNode => {
  switch (status) {
    case 'active':
      return <Clock className="h-4 w-4" />;
    case 'recovered':
      return <CheckCircle className="h-4 w-4" />;
    case 'relapsed':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return null;
  }
};

export const getTypeIcon = (type: string): ReactNode => {
  switch (type.toLowerCase()) {
    case 'substance':
      return <PillBottle className="h-4 w-4" />;
    case 'behavioral':
      return <Brain className="h-4 w-4" />;
    default:
      return <HeartPulse className="h-4 w-4" />;
  }
};

export const calculateCleanDays = (cleanSince?: string) => {
  if (!cleanSince) return 0;
  const start = new Date(cleanSince);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
