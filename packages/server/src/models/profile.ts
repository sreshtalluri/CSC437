export interface Profile {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  event_name: string;
  event_date: string;
  event_time: string;
  event_description: string;
  event_status: 'upcoming' | 'past' | 'cancelled';
}