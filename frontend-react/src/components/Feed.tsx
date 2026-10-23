import { useEffect, useState } from 'react';
import type { Post as PostType } from '../models/post';
import ApiCore from '../utils/api';
import Post from './Post';
import Filters from './Filters';

function Feed() {
  const [feed, setFeed] = useState<PostType[]>([]);
  useEffect(() => {
    ApiCore.get('/posts').then((response: PostType[]) => {
      if (response) {
        updateFeed(response);
      }
    });
  }, []);

  const updateFeed = (value: PostType[]) => {
    const newFeed = [...feed, ...value];
    setFeed(newFeed);
  };

  return (
    <section className="feed">
      <div className="filter" id="filter"></div>
      <Filters></Filters>
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
