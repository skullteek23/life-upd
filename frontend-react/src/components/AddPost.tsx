import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { add, validateNewPost } from '../services/posts.services';
import PostForm, { PLACEHOLDER_IMAGE, type IForm } from './PostForm';
import { useSubmitAction } from './context/SubmitAction';
import { useRefreshAction } from './context/refreshAction';

function AddPost() {
  const [isSubmit, setIsSubmit] = useSubmitAction();
  const [_isRefresh, setIsRefresh] = useRefreshAction();
  const [postData, setPostData] = useState<IForm>({
    category: '',
    visibility: 0,
    caption: '',
    imageUrl: PLACEHOLDER_IMAGE,
    photo: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmit && postData && Object.keys(postData).length) {
      add(validateNewPost(postData))
        .then((result) => {
          if (result) {
            navigate('/');
            setIsRefresh(true);
            setIsSubmit(false);
          }
        })
        .catch((_err) => {
          setIsRefresh(false);
          setIsSubmit(false);
        });
    }
  }, [isSubmit]);

  const handlePostData = (value: Partial<IForm>) => {
    setPostData({ ...postData, ...value });
  };

  return <PostForm data={postData} changeData={handlePostData} />;
}

export default AddPost;
