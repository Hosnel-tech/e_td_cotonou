import { Teacher } from '@/types/user.types';

export const TEACHERS: Teacher[] = [
  {
    id: '1', name: 'VIGAN Pauline', subject: 'Anglais', className: '3ème', niveau: 'secondaire',
    date: '12/07/25', status: 'actif', school: 'Complexe Scolaire La Victoire',
    email: 'pauline@gmail.com', phone: '01 67 34 25 56', birthDate: '12-09-1989',
    nationality: 'Béninoise', location: 'Cotonou, Rue Boulevard 2', ifu: '43289052',
    bankAccount: '12345678902984', bankName: 'Ecobank'
  },
  {
    id: '2', name: 'KOFFI Jean', subject: 'Mathématiques', className: 'Tle', niveau: 'secondaire',
    date: '10/05/25', status: 'actif', school: 'Lycée Technique de Cotonou',
    email: 'jean.koffi@example.com', phone: '01 90 23 45 67', birthDate: '05-05-1985',
    nationality: 'Béninoise', location: 'Abomey-Calavi, Quartier Zogbadjè', ifu: '56789012',
    bankAccount: '98765432101234', bankName: 'BOA'
  },
  {
    id: '3', name: 'ADJOVI Marie', subject: 'Français', className: 'CM2', niveau: 'primaire',
    date: '15/06/25', status: 'en attente', school: 'Collège Père Aupiais',
    email: 'marie.adjovi@example.com', phone: '01 45 67 89 01', birthDate: '20-11-1992',
    nationality: 'Béninoise', location: 'Cotonou, Quartier Akpakpa', ifu: '12345678',
    bankAccount: '11223344556677', bankName: 'UBA'
  },
  {
    id: '4', name: 'SOSSOU Marc', subject: 'SVT', className: '3ème', niveau: 'secondaire',
    date: '20/08/25', status: 'actif', school: 'Lycée Béhanzin',
    email: 'marc.sossou@example.com', phone: '01 23 45 67 89', birthDate: '15-03-1980',
    nationality: 'Béninoise', location: 'Porto-Novo, Quartier Ouando', ifu: '90123456',
    bankAccount: '55667788990011', bankName: 'NSIA'
  },
  {
    id: '5', name: 'HOUNGBEDJI Luc', subject: 'Physique-Chimie', className: 'Tle', niveau: 'secondaire',
    date: '05/09/25', status: 'actif', school: 'CEG Ste Rita',
    email: 'luc.houngbedji@example.com', phone: '01 34 56 78 90', birthDate: '10-10-1987',
    nationality: 'Béninoise', location: 'Cotonou, Quartier Ste Rita', ifu: '78901234',
    bankAccount: '99001122334455', bankName: 'Société Générale'
  },
  {
    id: '6', name: 'TOSSOU Elvire', subject: 'Histoire-Géo', className: '3ème', niveau: 'secondaire',
    date: '12/10/25', status: 'actif', school: 'Collège Notre Dame',
    email: 'elvire.tossou@example.com', phone: '01 55 66 77 88', birthDate: '22-02-1994',
    nationality: 'Béninoise', location: 'Cotonou, Fidjrossè', ifu: '22334455',
    bankAccount: '22334455667788', bankName: 'Ecobank'
  },
  {
    id: '7', name: 'GOMEZ Ricardo', subject: 'Espagnol', className: 'CM2', niveau: 'primaire',
    date: '14/11/25', status: 'en attente', school: 'Lycée Coulibaly',
    email: 'ricardo.gomez@example.com', phone: '01 88 99 00 11', birthDate: '11-11-1988',
    nationality: 'Béninoise', location: 'Cotonou, Cadjehoun', ifu: '33445566',
    bankAccount: '33445566778899', bankName: 'BOA'
  },
  {
    id: '8', name: 'DA SILVA Maria', subject: 'Philosophie', className: 'Tle', niveau: 'secondaire',
    date: '01/12/25', status: 'actif', school: 'CEG Gbegamey',
    email: 'maria.dasilva@example.com', phone: '01 44 33 22 11', birthDate: '01-01-1982',
    nationality: 'Béninoise', location: 'Cotonou, Gbegamey', ifu: '44556677',
    bankAccount: '44556677889900', bankName: 'UBA'
  },
  {
    id: '9', name: 'MIGAN Jacques', subject: 'Allemand', className: 'Tle', niveau: 'secondaire',
    date: '10/01/26', status: 'actif', school: 'CEG Les Pylônes',
    email: 'jacques.migan@example.com', phone: '01 77 66 55 44', birthDate: '14-07-1990',
    nationality: 'Béninoise', location: 'Abomey-Calavi', ifu: '55667788',
    bankAccount: '55667788990011', bankName: 'NSIA'
  },
  {
    id: '10', name: 'BOKO Félicité', subject: 'Arts Plastiques', className: 'CM2', niveau: 'primaire',
    date: '20/02/26', status: 'actif', school: 'Epitech Bénin',
    email: 'felicite.boko@example.com', phone: '01 22 11 00 99', birthDate: '12-12-1995',
    nationality: 'Béninoise', location: 'Cotonou, Sènadé', ifu: '66778899',
    bankAccount: '66778899001122', bankName: 'Société Générale'
  },
  {
    id: '11', name: 'AHOUANDJINOU Pierre', subject: 'Informatique', className: 'Tle', niveau: 'secondaire',
    date: '05/03/26', status: 'actif', school: 'Lycée Béhanzin',
    email: 'pierre.a@example.com', phone: '01 33 44 55 66', birthDate: '01-01-1986',
    nationality: 'Béninoise', location: 'Porto-Novo', ifu: '77889900',
    bankAccount: '77889900112233', bankName: 'Ecobank'
  },
  {
    id: '12', name: 'SAGBO Denise', subject: 'Anglais', className: '3ème', niveau: 'secondaire',
    date: '12/03/26', status: 'actif', school: 'CEG Akpakpa',
    email: 'denise.sagbo@example.com', phone: '01 99 88 77 66', birthDate: '05-05-1993',
    nationality: 'Béninoise', location: 'Cotonou, Akpakpa', ifu: '88990011',
    bankAccount: '88990011223344', bankName: 'BOA'
  },
  {
    id: '13', name: 'VIALON Géraud', subject: 'Mathématiques', className: '3ème', niveau: 'secondaire',
    date: '15/03/26', status: 'en attente', school: 'EFE Montaigne',
    email: 'geraud.v@example.com', phone: '01 11 22 33 44', birthDate: '10-10-1980',
    nationality: 'Française', location: 'Cotonou, Haie Vive', ifu: '99001122',
    bankAccount: '99001122334455', bankName: 'UBA'
  },
  {
    id: '14', name: 'KIKI Odile', subject: 'SVT', className: 'CM2', niveau: 'primaire',
    date: '20/03/26', status: 'actif', school: 'CEG Godomey',
    email: 'odile.kiki@example.com', phone: '01 55 44 33 22', birthDate: '15-08-1984',
    nationality: 'Béninoise', location: 'Godomey', ifu: '00112233',
    bankAccount: '00112233445566', bankName: 'NSIA'
  },
  {
    id: '15', name: 'DOSSOU Paul', subject: 'Physique', className: 'Tle', niveau: 'secondaire',
    date: '25/03/26', status: 'actif', school: 'CEG Zogbo',
    email: 'paul.dossou@example.com', phone: '01 66 77 88 99', birthDate: '30-04-1981',
    nationality: 'Béninoise', location: 'Cotonou, Zogbo', ifu: '11223344',
    bankAccount: '11223344556677', bankName: 'Société Générale'
  },
];
