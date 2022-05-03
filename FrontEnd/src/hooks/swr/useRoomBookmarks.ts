import useSWR from 'swr';
import { getHousingBookmarks } from '@apis';
import { TEN_MINUTES } from '@constants';
import {
  addHousingBookmark as addBookmarkAPI,
  removeHousingBookmark as removeBookmarkAPI,
} from '@apis';

const useRoomBookmarks = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/bookmarks',
    getHousingBookmarks,
    {
      refreshInterval: TEN_MINUTES,
    },
  );

  const addBookmark = async (roomId: number) => {
    try {
      await addBookmarkAPI(roomId);
      if (data) {
        const mergedBookmarks = [...data, roomId];
        mutate(mergedBookmarks, false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeBookmark = async (roomId: number) => {
    try {
      await removeBookmarkAPI(roomId);
      if (data) {
        const unremovedBookmarks = data.filter((r) => r !== roomId);
        mutate(unremovedBookmarks, false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    data,
    isValidating,
    error,
    mutate,
    addBookmark,
    removeBookmark,
  };
};

export default useRoomBookmarks;
