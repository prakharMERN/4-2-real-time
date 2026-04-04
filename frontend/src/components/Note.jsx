import { Loader, SquarePen, Trash2 } from 'lucide-react';
import { useNote } from '../hooks/useNote';
import { useState } from 'react';
import EditNote from './EditNote';
const Note = ({ note }) => {
    const uniqueId = Date.now()

    const { deleteNote, setNotesChanged } = useNote()

    const [loadingDelete, setLoadingDelete] = useState(false)

    const handleClick = () => {
        document.getElementById(uniqueId).showModal()
    }

    const handleDelete = async () => {
        try {
            const res = await deleteNote(setLoadingDelete, note._id)
            if (res) {
                setNotesChanged(prev => prev + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all shadow-gray-400">

                <div className='relative top-4 right-4 flex gap-4 flex-row-reverse' >
                    {loadingDelete ? <Loader color='red' /> : <Trash2 onClick={handleDelete} className='text-error cursor-pointer hover:text-red-500' />}
                    {/* <SquarePen className='text-info cursor-pointer hover:text-blue-500' /> */}
                    <div>
                        <EditNote note={note} />
                    </div>
                </div>

                <div onClick={handleClick} className="card-body min-h-36 cursor-pointer">
                    <h4 className="card-title">{note.title}</h4>
                    <p className="max-h-30 overflow-hidden">
                        {note.content?.length > 120 ? note.content.slice(0, 120) + '     . . . . . . ' : note.content}
                    </p>
                </div>
            </div>
            <dialog id={uniqueId} className='modal'>
                <div className='modal-box'>
                    <div className="card-body">
                        <h4 className="card-title">{note.title}</h4>
                        <p className=" py-4">
                            {note.content}
                        </p>
                    </div>

                    <div className='modal-action'>
                        <form method='dialog'>
                            <button className='btn btn-neutral'>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Note