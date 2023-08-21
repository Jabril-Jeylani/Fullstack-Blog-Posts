import axios from "axios";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";


function EditComment() {
    let { id, commentId } = useParams()
    const commentRef = useRef()
    const navigate = useNavigate()

    console.log(id, commentId)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const updatedComment = {
                text: commentRef.current.value
            }
            await axios.put(`/api/comments/${id}/${commentId}`, updatedComment)
            navigate(`/posts/${id}`)
        } catch (err) {
            console.log(err.message)
        }
    }

    return ( 
        <>
            <h1>Edit Comment</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="clr">Body:</label><br />
                    <textarea name="text" id="clr" cols="30" rows="10" ref={commentRef}/><br /><br />

                    <button>Submit</button>
                </form>
                <form action={`/posts/${id}`}>
                    <button>Back</button>
                </form>
            </div>
        </>
    );
}

export default EditComment;