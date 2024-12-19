import { useForm } from '../../../hooks/useform.js';
import { useCreateComment } from '../../../hooks/useComments.js';

const initialValues = {
    comment: '',
};

export default function CommentCreate({ gameId, email, dispatch }) {
    const createComment = useCreateComment();

    const commentSubmitHandler = async ({ comment }) => {
        try {
            const newComment = await createComment(gameId, comment);
            newComment.author = { email };
            dispatch({ type: 'ADD_COMMENT', payload: newComment });
        } catch (error) {
            console.log(error);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, commentSubmitHandler);
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
