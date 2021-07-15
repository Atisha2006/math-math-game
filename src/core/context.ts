import { IUserConfig } from '../shared';
import { DIFFICULTY_EASY, DIFFICULTY_HARD, DIFFICULTY_MEDIUM, STATES, TOP_SCORE, USER_ICON_DEF } from './constants';
import { DataBase } from './dataBase';
import { UsersStorage } from './usersStorage';

export class Context {
  private static instance: Context;

  private activeState: string;

  private cardType: string;

  private difficultyGame: string;

  private userStorage: UsersStorage;

  private activeUser: IUserConfig;

  private iDB: DataBase;

  private constructor(bd: DataBase) {
    this.iDB = bd;
    this.activeState = STATES.about;
    this.cardType = 'animal';
    this.difficultyGame = 'easy';
    this.userStorage = new UsersStorage(bd);
    this.activeUser = undefined!;
  }

  public static getInstance(bd?: DataBase): Context {
    if (!Context.instance) {
      if (bd) Context.instance = new Context(bd);
    }
    return Context.instance;
  }

  public setActiveState(value: string): void {
    this.activeState = value;
  }

  public writeTop(parent: HTMLElement): HTMLElement {
    const parentNode = parent;
    this.iDB.getSort('user', TOP_SCORE).then((p) =>
      p.forEach((el) => {
        const { firstName, lastName, email, score, icon } = el as { [key: string]: string };

        const row = document.createElement('div');
        row.classList.add('score__row');

        const img = document.createElement('img');
        img.classList.add('score__img');
        if (`${icon}` === 'default') img.src = USER_ICON_DEF;
        else img.src = `${icon}`;

        const profile = document.createElement('div');
        profile.classList.add('score__profile');

        const nameField = document.createElement('div');
        nameField.classList.add('score__name');
        nameField.textContent = `${firstName} ${lastName}`;

        const emailField = document.createElement('div');
        emailField.classList.add('score__email');
        emailField.textContent = `${email}`;

        const scoreField = document.createElement('div');
        scoreField.classList.add('score__score');
        scoreField.textContent = `score: ${score}`;

        profile.append(nameField, emailField);
        row.append(img, profile, scoreField);
        parentNode.append(row);
      })
    );
    return parentNode;
  }

  public getActiveState(): string {
    return this.activeState;
  }

  public setCategory(value: string): void {
    this.cardType = value;
  }

  public getCategory(): number {
    if (this.cardType === 'animal') return 0;
    if (this.cardType === 'santaniel') return 1;
    return 0;
  }

  public setDifficulty(value: string): void {
    this.difficultyGame = value;
  }

  public getDifficulty(): [string, number] {
    if (this.difficultyGame === 'easy') return [this.difficultyGame, DIFFICULTY_EASY]; // кол-во пар карточек
    if (this.difficultyGame === 'medium') return [this.difficultyGame, DIFFICULTY_MEDIUM];
    if (this.difficultyGame === 'hard') return [this.difficultyGame, DIFFICULTY_HARD];
    return ['easy', DIFFICULTY_EASY];
  }

  public setUser(value: IUserConfig): void {
    this.userStorage.addUserBD(value.firstName, value.lastName, value.email, +value.score, value.icon);
    this.activeUser = value;
  }

  public setScore(value: number): void {
    if (this.activeUser) {
      this.userStorage.addUserBD(
        this.activeUser.firstName,
        this.activeUser.lastName,
        this.activeUser.email,
        value,
        this.activeUser.icon
      );
    }
  }
}
