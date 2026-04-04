import React from 'react'

const Modal = () => {
    return (
        <div>
            <button className='btn btn-neutral' onClick={() => document.getElementById('modal').showModal()}>Click</button>
            <dialog id='modal' className='modal'>
                <div className='modal-box'>
                    <div className="card-body">
                        <h4 className="card-title">{'Title'}</h4>
                        <p className=" py-4">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat iusto quaerat, iure itaque voluptatibus exercitationem odit veritatis dolore sapiente asperiores ipsam cum, ab vitae enim voluptas ipsa aut mollitia eveniet veniam magni nesciunt? Est numquam minus optio commodi excepturi perferendis, consequuntur fugiat blanditiis vero voluptas velit aliquid libero aperiam eos!
                        </p>
                    </div>


                    <div className='modal-action'>
                        <form method='dialog'>
                            <button className='btn btn-neutral'>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Modal