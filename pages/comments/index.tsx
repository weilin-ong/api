import { useEffect, useState } from "react";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      {comments &&
        comments.map((comment: any) => {
          return (
            <div key={comment.id}>
              <h1>{comment.id}</h1>
              <h2> {comment.text} </h2>
            </div>
          );
        })}
    </>
  );
}
export default CommentList;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/comments");
  const comments = await res.json();

  return {
    props: {
      comments,
    },
  };
}
