import { useLoaderData, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { update, validateExistingPost } from '../services/posts.services';
import PostForm, { type IForm } from './PostForm';
import type { Post } from '../models/post';
import { useSubmitAction } from './context/SubmitAction';
import { useRefreshAction } from './context/refreshAction';
import { useLoadingAction } from './context/LoadingAction';

function EditPost() {
  const [isSubmit, setIsSubmit] = useSubmitAction();
  const [_isRefresh, setIsRefresh] = useRefreshAction();
  const [_isLoading, setIsLoading] = useLoadingAction();
  const [post] = useLoaderData<[Post]>();
  const [postData, setPostData] = useState<IForm>({
    category: post?.category,
    visibility: post?.is_pvt,
    caption: post?.caption,
    imageUrl: post?.img_url,
    photo: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading({ status: 'stop' });
    if (!post) {
      navigate('/');
      return;
    }
    if (isSubmit && postData && Object.keys(postData).length && post?.id) {
      setIsLoading({ status: 'loading' });
      update(validateExistingPost(postData), post?.id)
        .then((result) => {
          if (result) {
            navigate('/');
            setIsRefresh(true);
            setIsSubmit(false);
          }
        })
        .catch((err) => {
          setIsLoading({ status: 'error', error: err });
          setIsRefresh(false);
          setIsSubmit(false);
        });
    }
  }, [isSubmit]);

  const handlePostData = (value: Partial<IForm>) => {
    setPostData({ ...postData, ...value });
  };

  return <>{post && <PostForm data={postData} changeData={handlePostData} />}</>;
}

export default EditPost;
