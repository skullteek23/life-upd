import { useNavigate, useOutletContext } from 'react-router';
import { Category } from '../models/post';
import type { ActionOutletContext } from '../utils/actions';
import { useEffect, useRef } from 'react';
import { add, validate } from '../services/posts.services';

function AddPost() {
  const { submission, refresh } = useOutletContext<ActionOutletContext>();
  const [isSubmit, setIsSubmit] = submission;
  const [_isRefresh, setIsRefresh] = refresh;

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isSubmit && formRef?.current) {
      const values = Object.fromEntries(new FormData(formRef?.current));
      if (values && Object.keys(values).length) {
        add(validate(values))
          .then((result) => {
            if (result) {
              navigate('/');
              setIsRefresh(true);
              setIsSubmit(false);
            }
          })
          .catch((_err) => {
            setIsRefresh(false);
            setIsSubmit(true);
          });
      }
    }
  }, [isSubmit]);

  const selectCategory = (value: string, e: React.MouseEvent<HTMLDivElement>) => {
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.querySelectorAll('.action-element').forEach((element) => element.classList.remove('selected'));
    }
    e.currentTarget.classList.add('selected');
    if (categoryRef?.current) {
      categoryRef.current.value = value;
    }
  };

  const selectImage = (isReset: boolean) => {
    if (isReset && imageRef.current) {
      imageRef.current.src = 'images/placeholder.png';
      return;
    }
    if (imgInputRef?.current) {
      imgInputRef.current.click();
    }
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    if (imageRef?.current) {
      imageRef.current.src = imageUrl;
    }
  };

  return (
    <section className="feed">
      <ul id="posts">
        <li>
          <form id="input-form" ref={formRef}>
            <article className="card">
              <div className="card-title">What kind of update is it?</div>
              <input type="hidden" name="category" ref={categoryRef} id="category" />
              <div className="card-title-action">
                {Object.entries(Category).map((c) => (
                  <div className="action-element" key={c[0]} onClick={selectCategory.bind(null, c[0])}>
                    <img className="action-element-img" src={'images/' + c[0] + '.svg'} />
                    <span className="action-element-text">{c[1]}</span>
                  </div>
                ))}
              </div>

              <div className="card-content">
                <input type="file" name="photo" id="photo" accept="image/*" hidden ref={imgInputRef} onChange={selectFile} />
                <img className="card-image-input" id="input-image" src="images/placeholder.png" alt="Select Photo" ref={imageRef} onClick={selectImage.bind(null, false)} />
                <button className="primary-btn remove-image-btn" type="button" onClick={selectImage.bind(null, true)}>
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
