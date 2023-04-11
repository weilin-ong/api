import { useEffect, useState } from "react";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      });
  }, []);

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  const submitComment = async (comment: any) => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const deleteComment = async (commentId: any) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <div>
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={submitComment}>Submit comment</button>
      </div>
      <hr />
      <button onClick={fetchComments}>Load comments</button>
      {comments.map((comment:any) => {
        return (
          <div key={comment.id}>
            {comment.id}. {comment.text}
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
}
export default CommentList;

export async function getServerSideProps() {
  /* NOT RECOMMENDED and IMPOSSIBLE */
  /* SHOULD CALL DB DIRECTLY */
  // const res = await fetch("http://localhost:3000/api/comments");
  // const comments = await res.json();
  // return {
  //   props: {
  //     comments,
  //   },
  // };
}
