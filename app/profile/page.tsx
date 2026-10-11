import { redirect } from "next/navigation";

export default function Profile() {
  redirect("/features?tab=public-profile");
}