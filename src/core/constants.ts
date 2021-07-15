import { IStoreConfig } from '../shared';

/**
 *  User storage config
 */
export const BASE_CONFIG: IStoreConfig = {
  store: 'user',
  index: { firstName: false, lastName: false, email: true, score: false },
  keyPath: 'email'
};

/**
 *  Settings storage config
 */
export const SETTINGS_CONFIG: IStoreConfig = {
  store: 'settings',
  index: { category: false, difficulty: false },
  keyPath: 'id'
};

/**
 *  Router states
 */
export const STATES: { [key: string]: string } = {
  about: 'page-about', // default State
  score: 'page-score',
  settings: 'page-settings',
  game: 'page-game'
};

/**
 *  Flipped card class
 */
export const FLIP_CLASS = 'flipped';

/**
 *  Number of users in the top
 */
export const TOP_SCORE = 10;

/**
 *  Number of card pairs 8*2 on easy difficulty
 */
export const DIFFICULTY_EASY = 8;

/**
 *  Number of card pairs 12*2 on medium difficulty
 */
export const DIFFICULTY_MEDIUM = 12;

/**
 *  Number of card pairs 18*2 on hard difficulty
 */
export const DIFFICULTY_HARD = 18;

/**
 *  Delay input validation
 */
export const VALIDATE_DELAY = 1500;

/**
 * Time while card is visible
 */
export const START_TIMER_DELAY = 10000;

/**
 * Random index to generate the card location
 */
export const RANDOM_INDEX = 0.5;

/**
 * Flip animation delay
 */
export const FLIP_DELAY = 1000;

/**
 * Default user icon
 */
export const USER_ICON_DEF = './icons/user_icon.svg';

/**
 * Maximum game duration time in second
 */
export const GAME_TIME = 300;
