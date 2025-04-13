export interface FormData {
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  phone: string;
}

export interface EventData {
  name: string;
  type: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  isRecurring: boolean;
  recurrencePattern?: string;
  recurrenceEndDate?: Date;
  isPrivate: boolean;
  reminderTime?: Date;
  attachments?: string[];
  notes?: string;
}

export interface EventRequestFormProps {
  onSubmit: (data: EventData) => void;
  onCancel: () => void;
} 