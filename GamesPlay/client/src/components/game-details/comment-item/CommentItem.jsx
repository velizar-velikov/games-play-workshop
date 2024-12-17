export default function CommentItem({ author, comment }) {
    return (
        <li className="comment">
            <p>
                {author?.email}: {comment}
            </p>
        </li>
    );
}
