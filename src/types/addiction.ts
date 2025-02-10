
export interface Addiction {
  id: string;
  name: string;
  type: 'substance' | 'behavioral';
  start_date: string;
  notes?: string;
  status: 'active' | 'recovered' | 'relapsed';
  triggers?: string[];
  clean_since?: string;
  last_relapse_date?: string;
  addiction_type_id: string;
  goals?: {
    title: string;
    completed: boolean;
    target_date?: string;
  }[];
}

export interface AddictionType {
  id: string;
  name: string;
  category: 'substance' | 'behavioral';
  description?: string;
  common_triggers?: string[];
}

export interface Milestone {
  id: string;
  addiction_id: string;
  milestone_type: string;
  description: string;
  milestone_date: string;
  days_clean: number;
}
