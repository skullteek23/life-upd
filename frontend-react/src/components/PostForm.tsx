import { useRef } from 'react';
import { Category } from '../models/post';
import ResetImageButton from './buttons/ResetImageButton';

export interface IForm {
  category: string;
  visibility: number;
  caption: string;
  imageUrl: string;
  photo: File | null;
}

interface IFormProps {
  data: IForm;
  changeData: (data: Partial<IForm>) => void;
}
export const PLACEHOLDER_IMAGE = '/images/placeholder.png';

function PostForm(props: IFormProps) {
  const imgInputRef = useRef<HTMLInputElement>(null);

  const selectImage = (isReset: boolean) => {
    if (isReset) {
      handleChange({ imageUrl: PLACEHOLDER_IMAGE, photo: null });
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
    handleChange({ imageUrl, photo: file });
  };

  const handleChange = (value: Partial<IForm>) => {
    props.changeData({ ...value });
  };

  return (
    <section className="feed">
      <ul id="posts">
        <li>
          <form id="input-form">
            <article className="card">
              <div className="card-title">What kind of update is it?</div>
              <input type="hidden" value={props.data.category} name="category" id="category" />
              <div className="card-title-action">
                {Object.entries(Category).map((c) => (
                  <div className={props?.data?.category === c[0] ? 'action-element selected' : 'action-element'} key={c[0]} onClick={(_e) => handleChange({ category: c[0] })}>
                    <img className="action-element-img" src={'/images/' + c[0] + '.svg'} />
                    <span className="action-element-text">{c[1]}</span>
                  </div>
                ))}
              </div>

              <div className="card-content">
                <input type="file" name="photo" id="photo" accept="image/*" hidden ref={imgInputRef} onChange={selectFile} />
                <img className="card-image-input" id="input-image" alt="Select Photo" src={props.data.imageUrl} onClick={selectImage.bind(null, false)} />
                <ResetImageButton action={selectImage.bind(null, true)}></ResetImageButton>

                <textarea name="caption" value={props.data.caption} onChange={(e) => handleChange({ caption: e.target.value })} placeholder="Add a caption..." cols={33} rows={3} id="caption"></textarea>
              </div>

              <footer>
                <div className="footer-title">Visible to:</div>
                <select name="visibility" value={props.data.visibility} onChange={(e) => handleChange({ visibility: Number(e.target.value) })} className="visibility-selection">
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

export default PostForm;
