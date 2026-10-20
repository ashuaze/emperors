import { Emperor } from '../types/history';
import { XIA_SHANG_ZHOU_EMPERORS } from './emperors/xiaShangZhou';
import { QIN_HAN_EMPERORS } from './emperors/qinHan';
import { THREE_KINGDOMS_JIN_NANBEI_EMPERORS } from './emperors/threeKingdomsJinNanbei';
import { SUI_TANG_FIVE_EMPERORS } from './emperors/suiTangFive';
import { SONG_YUAN_EMPERORS } from './emperors/songYuan';
import { MING_QING_EMPERORS } from './emperors/mingQing';

/**
 * 华夏四千年历代帝王与君侯全景数据库
 * 收录自夏禹至清宣统帝全部朝代下的帝王、天子与霸主君王
 */
export const EMPERORS_DATA: Emperor[] = [
  ...XIA_SHANG_ZHOU_EMPERORS,
  ...QIN_HAN_EMPERORS,
  ...THREE_KINGDOMS_JIN_NANBEI_EMPERORS,
  ...SUI_TANG_FIVE_EMPERORS,
  ...SONG_YUAN_EMPERORS,
  ...MING_QING_EMPERORS
];
