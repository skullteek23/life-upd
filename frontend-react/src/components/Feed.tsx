import { useEffect, useState } from 'react';

import Post from './Post';
import FILTERS_MAP from '../models/filters';
import { DateFilter, CategoryFilter } from './Filters';
import { getPosts } from '../services/posts.services';
import type { Post as PostType } from '../models/post';
import { useRefreshAction } from './context/refreshAction';
import { useLoadingAction } from './context/LoadingAction';

function Feed() {
  const [feed, setFeed] = useState<PostType[]>([]);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isRefresh, _setIsRefresh] = useRefreshAction();
  const [_isLoading, setIsLoading] = useLoadingAction();

  useEffect(() => {
    setIsLoading(true);
    getPosts(dateFilter, categoryFilter).then((response: PostType[]) => {
      setFeed([...(response || [])]);
      setIsLoading(false);
    });
  }, [dateFilter, categoryFilter, isRefresh]);

  const DATE_FILTERS = FILTERS_MAP.get('date');
  const CATEGORY_FILTERS = FILTERS_MAP.get('category');

  return (
    <section className="feed">
      <DateFilter data={setDateFilter} list={DATE_FILTERS}></DateFilter>
      <CategoryFilter data={setCategoryFilter} list={CATEGORY_FILTERS}></CategoryFilter>
      <ul id="posts">
        {feed.map((item) => (
          <li key={item.id}>
            <Post data={item}></Post>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Feed;
