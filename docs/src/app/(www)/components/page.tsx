import { allPosts } from "content-collections";

export default function ComponentIndexPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello components page!</h1>
      <ul>
        {allPosts.map((post) => (
          <li key={post._meta.path}>
            <a href={`/posts/${post._meta.path}`}>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
            </a>
          </li>
        ))}
      </ul>
      <div className="h-[3000px]">too long spacer</div>
    </div>
  );
}
