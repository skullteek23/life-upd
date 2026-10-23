import { Post as PostType } from '../models/post';
import { formatDate } from '../utils/date-formatter';

function Post(props: { data: PostType }) {
  const createdDate = formatDate(props.data.created_at);
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
      <div className="card-content">{props.data.caption}</div>
    </article>
  );
}

export default Post;
