import { DataBase } from './dataBase';

export class UsersStorage {
  private iBD: DataBase;

  constructor(iBD: DataBase) {
    this.iBD = iBD;
  }

  addUserBD(firstName: string, lastName: string, email: string, score: number, icon: string): void {
    this.iBD.add('user', { firstName, lastName, email, score, icon });
  }
}
