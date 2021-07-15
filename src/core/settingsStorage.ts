import { DataBase } from './dataBase';

export class Settings {
  private iBD: DataBase;

  constructor(iBD: DataBase) {
    this.iBD = iBD;
  }
}
