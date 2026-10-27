import { useEffect, useState } from 'react';
import { Post as PostType } from '../models/post';
import { formatDate } from '../utils/date-formatter';

const TRUNCATED_CAPTION_LENGTH = 70;
const MORE_TEXT = 'more';
const ELLIPSIS = '... ';

function Post(props: { data: PostType }) {
  const createdDate = formatDate(props.data.created_at);
  const [caption, setCaption] = useState(props.data.caption);
  const [truncate, setTruncate] = useState(false);

  useEffect(() => {
    if (props.data.caption.length >= TRUNCATED_CAPTION_LENGTH) {
      const newCaption = props.data.caption.slice(0, TRUNCATED_CAPTION_LENGTH - MORE_TEXT.length);
      setCaption(newCaption.concat(ELLIPSIS));
      setTruncate(true);
    }
  }, []);

  const expand = () => {
    setCaption(props.data.caption);
    setTruncate(false);
  };

  return (
    <article className="card">
      <div className="card-title">
        <span className="username">@{props.data.added_by}</span>
        <span className="dot">•</span>
        <span className="date-posted">{createdDate}</span>
        <span className="visibility-icon">{props.data.is_pvt === 1 && <img src="images/private.svg" alt="Privately visible" />}</span>
        <span className="category-icon">
          {props.data.category === 'rsh' && <img src="images/rsh.svg" alt="Relationship" />}
          {props.data.category === 'mny' && <img src="images/mny.svg" alt="Money" />}
          {props.data.category === 'hlt' && <img src="images/hlt.svg" alt="Health" />}
          {props.data.category === 'wrk' && <img src="images/wrk.svg" alt="Work" />}
          {props.data.category === 'slf' && <img src="images/slf.svg" alt="Self" />}
          {props.data.category === 'lex' && <img src="images/lex.svg" alt="Life & Experiences" />}
        </span>
      </div>
      <img className="card-image" src={props.data.img_url} />
      <div className="post-card-content">
        {caption && <span className="caption">{caption}</span>}
        {truncate && (
          <span className="see-more" onClick={expand}>
            {MORE_TEXT}
          </span>
        )}
      </div>
    </article>
  );
}

export default Post;
