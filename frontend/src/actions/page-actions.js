import { useAction } from './base-actions';

export const fetchPagesAction = (cb) => {
  return useAction({
    url: `website.page`,
    method: 'get',
    action: 'FETCH_PAGES',
    cb
  })
};