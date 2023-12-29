import './CommentsList.css';

const CommentsList = ({ comments }) => (

    <>
    <h3 className="mb-3">Comments:</h3>
    {comments.map((comment,index) => {
        if (comment.postedBy && comment.text){
            return (
                <div className="new-blur rounded-2">
                    <div className="comment-postedBy">{comment.postedBy}</div>
                    <div className="comment-text">{comment.text}</div>
                </div>
            );
        }
    })}
    </>
    
)

export default CommentsList;