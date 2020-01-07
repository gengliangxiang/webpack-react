// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMine from '../../../app/service/Mine';

declare module 'egg' {
  interface IService {
    mine: ExportMine;
  }
}
