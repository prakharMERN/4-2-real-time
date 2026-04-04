import Note from "./Note"


const NoteList = ({ notes }) => {

    return (
        <div className="w-full grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3" >
            {notes.map(note => <Note note={note} key={note._id} />)}
        </div>
    )
}

export default NoteList