import { IPostData, IPostDataRequest } from '../api/posts/PostsService';

const stripHtml = (html: string) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const transformPostResponse = (response: IPostData): IPostDataRequest => {
  const meta = Array.isArray(response.meta) && response.meta.length > 0 ? response.meta[0] : {};

  return {
    title: response.title,
    description: response.description,
    feature_image: response.feature_image,
    type: response.type,
    content: response.content,
    status: response.status,
    images: response.images ? response.images.join(',') : null,
    visibility: response.visibility,
    admins: response.admins.map((admin) => admin),
    editors: response.editors.map((editor) => editor),
    curadors: response.curadors.map((curador) => curador),
    published_at: response.published_at,
    canonicalUrl: response.canonicalUrl,
    tags: response.tags.map((tag) => tag),
    subjects: response.subjects.map((subject) => subject),
    og_image: meta?.og_image ?? '',
    og_title: meta?.og_title ?? '',
    og_description: meta?.og_description ?? '',
    twitter_image: meta?.twitter_image ?? '',
    twitter_title: meta?.twitter_title ?? '',
    twitter_description: meta?.twitter_description ?? '',
    meta_title: meta?.meta_title ?? '',
    meta_description: meta?.meta_description ?? '',
    email_subject: meta?.email_subject ?? '',
    frontmatter: meta?.frontmatter ?? '',
    feature_image_alt: meta?.feature_image_alt ?? '',
    email_only: meta?.email_only ?? '',
    feature_image_caption: meta?.feature_image_caption ? stripHtml(meta.feature_image_caption) : '',
  };
};
