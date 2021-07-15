import './styles.scss';
import { App } from './app';
import { DataBase, Context, BASE_CONFIG, SETTINGS_CONFIG } from './core';

const ROOT_NODE: HTMLElement = document.body;

window.onload = () => {
  const dataBase = new DataBase('Atisha2006', [BASE_CONFIG, SETTINGS_CONFIG]);
  if (dataBase) Context.getInstance(dataBase);
  if (window.location.hash.slice(1)) window.location.hash = '/';
  new App(ROOT_NODE).render();
};
