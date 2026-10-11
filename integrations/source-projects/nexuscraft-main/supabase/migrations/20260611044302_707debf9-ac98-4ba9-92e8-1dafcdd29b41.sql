
REVOKE SELECT ON public.partners FROM authenticated, anon;
GRANT SELECT (id, name, type, location, projects_count, participants_count, certificates_issued, is_active, created_at, updated_at) ON public.partners TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partners TO authenticated;
REVOKE SELECT (contact_email) ON public.partners FROM authenticated, anon;

REVOKE SELECT ON public.profiles FROM authenticated, anon;
GRANT SELECT (
  id, name, email, avatar_url, bio, points, created_at, last_active,
  headline, location, website, linkedin_url, github_url, skills,
  experience, education, is_visible, profile_views, cover_image_url,
  referral_code, referred_by, referrals_count, valid_referrals,
  quiz_completed, quiz_attempts, extra_attempt_unlocked, bonus_given
) ON public.profiles TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
