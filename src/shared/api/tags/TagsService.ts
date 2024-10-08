import { TPostsVisibility } from 'src/shared/services/postOptions';

export interface ITagData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  feature_image: string | null;
  parent_id: string | null;
  visibility: TPostsVisibility;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  code_injection_head: string | null;
  code_injection_foot: string | null;
  cannonical_url: string | null;
  accent_color: string | null;
  created_at: string;
  updated_at: string;
}
