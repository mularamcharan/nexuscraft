import { redirect } from "next/navigation";

export default function Portfolio() {
  redirect("/features?tab=portfolio");
}