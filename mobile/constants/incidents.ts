export const INCIDENT_LIST = [
  {
    id: 1,
    code: 'INC-3412',
    title: 'Gas leak report',
    zone: 'Zone C',
    date: 'Today 14:30',
    severity: 'critical',
    status: 'pending-verification',
    reporter: 'R. Das',
  },
  {
    id: 2,
    code: 'INC-3407',
    title: 'PPE violation Team C',
    zone: 'Zone B',
    date: 'Today 12:15',
    severity: 'high',
    status: 'assigned',
    reporter: 'Supervisor',
  },
  {
    id: 3,
    code: 'INC-3398',
    title: 'Equipment heat anomaly',
    zone: 'Zone A',
    date: 'Yesterday 09:45',
    severity: 'medium',
    status: 'escalated',
    reporter: 'M. Khan',
  },
  {
    id: 4,
    code: 'INC-3385',
    title: 'Ventilation warning',
    zone: 'Zone D',
    date: '2 days ago',
    severity: 'low',
    status: 'resolved',
    reporter: 'Safety Officer',
  },
] as const;

export const INCIDENT_DETAIL = {
  code: 'INC-3412',
  title: 'Gas leak report',
  description:
    'Strong gas smell detected near the ventilation shaft in Zone C. The area has been evacuated as a precaution.',
  zone: 'Zone C',
  date: '2026-04-19',
  time: '14:30',
  severity: 'critical',
  status: 'pending-verification',
  reporter: { name: 'R. Das', role: 'Worker', id: 'EMP001' },
  assignedTo: { name: 'Safety Officer', id: 'SO001' },
  timeline: [
    { time: '14:30', action: 'Incident reported', actor: 'R. Das', status: 'created' },
    { time: '14:32', action: 'Safety team notified', actor: 'System', status: 'alert' },
    { time: '14:45', action: 'Area evacuated', actor: 'Supervisor M. Khan', status: 'action' },
    { time: '15:00', action: 'Waiting for verification', actor: 'Safety Officer', status: 'pending' },
  ],
} as const;

export type IncidentReviewStatus = 'pending' | 'assigned' | 'resolved';

export type IncidentReviewItem = {
  id: number;
  code: string;
  title: string;
  zone: string;
  date: string;
  severity: 'critical' | 'high' | 'medium';
  status: IncidentReviewStatus;
  reporter: string;
  description: string;
};

export const INCIDENT_REVIEW_QUEUE: IncidentReviewItem[] = [
  {
    id: 1,
    code: 'INC-3412',
    title: 'Gas leak report',
    zone: 'Zone C',
    date: 'Today 14:30',
    severity: 'critical',
    status: 'pending',
    reporter: 'R. Das',
    description: 'Strong gas smell detected near ventilation shaft',
  },
  {
    id: 2,
    code: 'INC-3407',
    title: 'PPE violation Team C',
    zone: 'Zone B',
    date: 'Today 12:15',
    severity: 'high',
    status: 'assigned',
    reporter: 'Supervisor',
    description: 'Worker found without proper safety gear',
  },
  {
    id: 3,
    code: 'INC-3398',
    title: 'Equipment heat anomaly',
    zone: 'Zone A',
    date: 'Yesterday 09:45',
    severity: 'medium',
    status: 'assigned',
    reporter: 'M. Khan',
    description: 'Pump showing abnormal temperature readings',
  },
] as const;