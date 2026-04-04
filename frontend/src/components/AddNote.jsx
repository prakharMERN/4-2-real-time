import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useNote } from '../hooks/useNote'
import Loading from './Loading'

const AddNote = () => {
    const { postNote, setNotesChanged } = useNote()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    })

    const handleChange = e => {
        setFormData(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleAdd = async () => {
        try {
            const res = await postNote(setLoading, setError, formData)
            if (res) {
                setFormData({
                    title: "",
                    content: ""
                })
                setError('')
                document.getElementById('add_note').close()
                setNotesChanged(prev => prev + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setFormData({
            title: "",
            content: ""
        })
        setError('')
        document.getElementById('add_note').close()
    }
    return (
        <div>
            <Plus onClick={() => document.getElementById('add_note').showModal()} size={60} className=' text-white bg-primary rounded-full shadow-primary shadow-2xl hover:shadow-lg transition-all hover:bg-[#3522aa] cursor-pointer' />
            <dialog id='add_note' className='modal'>
                <div className='modal-box max-w-100'>

                    <div className='card'>
                        <div className='card-body p-0'>
                            <h2 className='card-title text-base-content'>Add Note</h2>
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
                        <button onClick={handleAdd} className='btn btn-primary' disabled={loading}>{loading ? <Loading /> : 'Add'}</button>
                    </div>
                </div>

            </dialog>
        </div>
    )
}

export default AddNote