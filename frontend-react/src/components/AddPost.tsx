import { Category } from '../models/post';

function AddPost() {
  return (
    <section className="feed">
      <div className="filter" id="filter"></div>
      <ul id="posts">
        <li>
          <form id="input-form">
            <article className="card">
              <div className="card-title">What kind of update is it?</div>
              <input type="hidden" name="category" id="category" />
              <div className="card-title-action">
                {Object.entries(Category).map((c) => (
                  <div className="action-element" key={c[0]}>
                    <img className="action-element-img" src={'images/' + c[0] + '.svg'} />
                    <span className="action-element-text">{c[1]}</span>
                  </div>
                ))}
              </div>

              <div className="card-content">
                <input type="file" name="photo" id="photo" accept="image/*" hidden />
                <img className="card-image-input" id="input-image" src="images/placeholder.png" alt="Select Photo" />
                <button className="primary-btn remove-image-btn" type="button">
                  <img src="images/cross.svg" alt="Remove Photo" />
                </button>

                <textarea name="caption" placeholder="Add a caption..." cols={33} rows={3} id="caption"></textarea>
              </div>

              <footer>
                <div className="footer-title">Visible to:</div>
                <select name="visibility" className="visibility-selection" defaultValue={0}>
                  <option value="0">Everyone</option>
                  <option value="1">Only Me</option>
                </select>
              </footer>
            </article>
          </form>
        </li>
      </ul>
    </section>
  );
}

export default AddPost;
