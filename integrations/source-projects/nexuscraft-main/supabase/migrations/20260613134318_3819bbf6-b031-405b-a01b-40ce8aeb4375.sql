GRANT UPDATE (
  name, avatar_url, bio, headline, location, website,
  linkedin_url, github_url, skills, experience, education,
  is_visible, cover_image_url, last_active
) ON public.profiles TO authenticated;