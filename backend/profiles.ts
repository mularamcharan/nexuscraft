import type { UserProfile } from "@shared/types";
import { database } from "./database";

const emptyProfile: UserProfile = {
  fullName: "Learner",
  username: "",
  email: "",
  bio: "",
  avatarImage: null
};

export function readProfile(sessionHash: string): UserProfile {
  const row = database
    .prepare(
      "SELECT full_name, username, email, bio, avatar_image FROM user_profiles WHERE session_hash = ?"
    )
    .get(sessionHash) as {
      full_name: string;
      username: string;
      email: string;
      bio: string;
      avatar_image: string | null;
    } | undefined;

  if (!row) return emptyProfile;

  return {
    fullName: row.full_name,
    username: row.username,
    email: row.email,
    bio: row.bio,
    avatarImage: row.avatar_image
  };
}

export function writeProfile(sessionHash: string, profile: UserProfile): UserProfile {
  database
    .prepare(`
      INSERT INTO user_profiles (session_hash, full_name, username, email, bio, avatar_image)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(session_hash) DO UPDATE SET
        full_name = excluded.full_name,
        username = excluded.username,
        email = excluded.email,
        bio = excluded.bio,
        avatar_image = excluded.avatar_image,
        updated_at = CURRENT_TIMESTAMP
    `)
    .run(
      sessionHash,
      profile.fullName,
      profile.username,
      profile.email,
      profile.bio,
      profile.avatarImage
    );

  return profile;
}
