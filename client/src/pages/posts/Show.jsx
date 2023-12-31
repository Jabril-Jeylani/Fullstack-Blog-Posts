import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

function Show() {

    const [post, setPost] = useState({})
    const textRef = useRef()

    const { id } = useParams()
    const navigate = useNavigate()

    async function getPost() {
        try {
            const response = await axios.get(`/api/posts/${id}`)
            // console.log(response.data)
            setPost(response.data)
        } catch(err) {
            console.log(err.message)
            navigate('/posts')
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const newComment = { 
                text: textRef.current.value
            }
            const comment = await axios.post(`/api/comments/${id}`, newComment)
            console.log(comment)
            // let comments = post.comments
            // comments.push(comment.data)
            // setPost({...post, comments})
            let newPost = post
            newPost.comments.push(comment)
            setPost(newPost)
            // navigate(`/posts/${id}`)
            // window.location.reload()
        } catch (err) {
            console.log('error message:')
            console.log(err.message)
        }

    }

    async function handleDeletePost() {
        await axios.delete(`/api/posts/${id}`)
        navigate('/posts')
    }

    async function handleDeleteComment(e) {
        e.preventDefault()
        const commentId = e.target.id
        console.log(post.comments) 
        // for (let i = 0; i < post.comments.length; i++) {
        //     console.log(post.comments[i]._id === ) 
        // }
        // return
        try {
            await axios.delete(`/api/comments/${id}/${commentId}`)
            // array of Data Objects
            // navigate(`/posts/${id}`)
            window.location.reload()
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    if (!post.subject) {
        return <div>Loading...</div>
    }

    return (
            <>
                <div className="a-post">
                    <h2>{post.subject}</h2>
                    <h5 style={{ opacity: '.3'}}>Posted by {post.user} on {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}</h5>
                    <p className='p-body'>{post.body}</p><br /><br />

                    {
                        post?.comments?.length ?
                        <>
                            <div>Comments:</div>
                            <div>{post.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    <div>{comment.user}</div>
                                    <div>{comment.text}</div>
                                    <form onSubmit={handleDeleteComment} id={comment._id}>
                                        <input type="submit" value="X"/>
                                    </form>
                                    <a href={`/comments/${post._id}/${comment._id}`}>+</a>
                                </div>
                            )}</div>
                            <br/><br/>
                        </>
                        : ''
                    }
                    <details>
                        <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                        <form onSubmit={handleSubmit}>
                            <textarea name="text" id="lc" cols="1" rows="1" ref={textRef}/>
                            <button>Comment</button>
                        </form>
                    </details>
                    
                    <div className="buttons">

                        <button onClick={handleDeletePost}>Delete</button>
                       
                   
                        <button onClick={() => navigate(`/posts/${id}/edit`)}>Edit</button>
               
                        
                        <button onClick={() => navigate('/posts')}>Back</button>
                     
                    </div>
                </div>
            </>
    )
}

export default Show