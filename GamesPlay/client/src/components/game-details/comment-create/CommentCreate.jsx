export default function CommentCreate({ values, changeHandler, submitHandler }) {
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form onSubmit={submitHandler} className="form">
                <textarea name="comment" placeholder="Comment......" value={values.comment} onChange={changeHandler}></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    );
}
