import { redirect } from "next/navigation";

export default function LegacyStudioRedirect() {
  redirect("/features?tab=prompt-mastery");
}
