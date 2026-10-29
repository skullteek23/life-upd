import { useLoaderData, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { update, validateExistingPost } from '../services/posts.services';
import PostForm, { type IForm } from './PostForm';
import type { Post } from '../models/post';
import { useSubmitAction } from './context/SubmitAction';
import { useRefreshAction } from './context/refreshAction';

function EditPost() {
  const [isSubmit, setIsSubmit] = useSubmitAction();
  const [_isRefresh, setIsRefresh] = useRefreshAction();
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
    if (!post) {
      navigate('/');
      return;
    }
    if (isSubmit && postData && Object.keys(postData).length && post?.id) {
      update(validateExistingPost(postData), post?.id)
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

export default EditPost;
