import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db', 'database.json');

import { User } from '@/types/user.types';

export interface Database {
  users: User[];
  tds: any[];
  payments: any[];
  transfers: any[];
  notifications: any[];
  upcomingTDs: any[];
  currentUser: User;
}

export function readDb(): Database {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as Database;
}

export function writeDb(data: Database): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
