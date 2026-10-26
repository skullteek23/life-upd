import { useEffect, useState } from 'react';
import type { Post as PostType } from '../models/post';
import Post from './Post';
import Filters from './Filters';
import { get } from '../services/posts.services';
import { useOutletContext } from 'react-router';
import type { ActionOutletContext } from '../utils/actions';

function Feed() {
  const [feed, setFeed] = useState<PostType[]>([]);
  const [dateFilter, setDateFilter] = useState<string>('');
  const { refresh } = useOutletContext<ActionOutletContext>();
  const [isRefresh, _setIsRefresh] = refresh;

  useEffect(() => {
    get(dateFilter).then((response: PostType[]) => {
      setFeed([...(response || [])]);
    });
  }, [dateFilter, isRefresh]);

  const changeFilter = (params: string) => {
    setDateFilter(params);
  };

  return (
    <section className="feed">
      <Filters data={changeFilter}></Filters>
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
