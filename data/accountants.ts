import { Accountant } from '@/types/user.types';

export const ACCOUNTANTS: Accountant[] = [
  { 
    id: '1', 
    lastName: 'CHABI', 
    firstName: 'Marc', 
    email: 'marc.chabi@example.com', 
    phone: '+229 90000001', 
    status: 'actif',
    birthDate: '12-05-1985',
    nationality: 'Béninoise',
    location: 'Cotonou, Quartier Fidjrossè',
    ifu: '12345678',
    bankAccount: '11223344556677',
    bankName: 'Ecobank'
  },
  { 
    id: '2', 
    lastName: 'SODJI', 
    firstName: 'Alice', 
    email: 'alice.sodji@example.com', 
    phone: '+229 90000002', 
    status: 'actif',
    birthDate: '20-08-1990',
    nationality: 'Béninoise',
    location: 'Cotonou, Quartier Akpakpa',
    ifu: '56789012',
    bankAccount: '98765432101234',
    bankName: 'BOA'
  },
  { 
    id: '3', 
    lastName: 'TOUVOUI', 
    firstName: 'Paul', 
    email: 'paul.touvoui@example.com', 
    phone: '+229 90000003', 
    status: 'inactif',
    birthDate: '15-11-1982',
    nationality: 'Béninoise',
    location: 'Abomey-Calavi, Quartier Zogbadjè',
    ifu: '90123456',
    bankAccount: '55667788990011',
    bankName: 'UBA'
  },
];
