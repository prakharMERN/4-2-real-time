import { SquarePen } from 'lucide-react'
import { useState } from 'react'
import { useNote } from '../hooks/useNote'
import Loading from './Loading'

const EditNote = ({ note }) => {
    const { putNote, setNotesChanged } = useNote()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: note.title,
        content: note.content
    })

    const handleChange = e => {
        setFormData(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const hanldeEdit = async () => {
        try {
            const res = await putNote(setLoading, setError, note._id, formData)
            if (res) {
                setFormData({
                    title: "",
                    content: ""
                })
                setError('')
                document.getElementById(note._id).close()
                setNotesChanged(prev => prev + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setFormData({
            title: note.title,
            content: note.content
        })
        setError('')
        document.getElementById(note._id).close()
    }
    return (
        <div>
            <SquarePen onClick={() => document.getElementById(note._id).showModal()} className='text-info cursor-pointer hover:text-blue-500' />
            <dialog id={note._id} className='modal'>
                <div className='modal-box max-w-100'>

                    <div className='card'>
                        <div className='card-body p-0'>
                            <h2 className='card-title text-base-content'>Edit Note</h2>
                            <label className='label flex flex-col items-start' htmlFor="title">
                                <span className=''>Title</span>
                                <input className='input rounded-lg text-base-content font-mono' required placeholder='title' id='title' onChange={handleChange} type="text" name='title' value={formData.title} />
                            </label>


                            <label className='label flex flex-col items-start' htmlFor="content">
                                <span className=''>Content</span>
                                <input className='input rounded-lg text-base-content font-mono' required placeholder='content' id='content' onChange={handleChange} type="text" name='content' value={formData.content} />
                            </label>
                        </div>
                    </div>

                    {error && <p className='text-center text-error-content'>{error}</p>}

                    <div className='flex gap-4 justify-end mt-4'>
                        <button onClick={handleCancel} className='btn btn-neutral'>Cancel</button>
                        <button onClick={hanldeEdit} className='btn btn-primary' disabled={loading}>{loading ? <Loading /> : 'Edit'}</button>
                    </div>
                </div>

            </dialog>
        </div>
    )
}

export default EditNote