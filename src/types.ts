/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Booking {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  serviceType: string;
  urgency: 'same_day' | 'soon' | 'standard';
  details: string;
  status: 'pending' | 'scheduled' | 'completed';
  estimatedPrice: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  title: string;
  review: string;
  date: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  checklist: string[];
}
