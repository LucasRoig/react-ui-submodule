import { allPosts } from "content-collections";
import { redirect } from "next/navigation";

export default function ComponentIndexPage() {
  redirect("/components/button");
  return null;
}
