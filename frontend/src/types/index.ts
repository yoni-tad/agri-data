export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'vendor';
  token?: string;
}

export interface Batch {
  _id: string;
  batchId: string;
  imageUrl: string;
  quantityKg: number;
  notes?: string;
  latitude: number | null;
  longitude: number | null;
  status: 'active' | 'archived';
  createdBy: User;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  totalBatches: number;
  recentSubmissions: Batch[];
}
