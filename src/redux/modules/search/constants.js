import generateType from '../../../utils/actionTypes';

export const NAME = 'search';

export const SEARCH = generateType(NAME, 'SEARCH');
export const SEARCH_MORE = generateType(NAME, 'SEARCH_MORE');
