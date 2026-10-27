import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import Post from './Post';
import FILTERS_MAP from '../models/filters';
import { DateFilter, CategoryFilter } from './Filters';
import { get } from '../services/posts.services';
import type { Post as PostType } from '../models/post';
import type { ActionOutletContext } from '../utils/actions';

function Feed() {
  const [feed, setFeed] = useState<PostType[]>([]);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const { refresh } = useOutletContext<ActionOutletContext>();
  const [isRefresh, _setIsRefresh] = refresh;

  useEffect(() => {
    get(dateFilter, categoryFilter).then((response: PostType[]) => {
      setFeed([...(response || [])]);
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
