import React, { useState } from 'react'
import { AddRoom as addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from '../common/RoomTypeSelector'

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: '',
        roomPrice: ''
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomInputChange = (room) => {
        const name = room.target.name;
        let value = room.target.value;

        if (name === "roomPrice") {
            value = !isNaN(value) ? parseInt(value) : "";
        }

        setNewRoom({ ...newRoom, [name]: value });
    };

    const handleImageChange = (image) => {
        const selectedImage = image.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            if (success === true) {
                setSuccessMessage("A new room has been added to the database successfully.");
                setNewRoom({ photo: null, roomType: '', roomPrice: '' });
                setImagePreview("");
                setErrorMessage("");
                document.getElementById("photo").value = null; // optional: reset file input
            } else {
                setErrorMessage("An error occurred while adding the room. Please try again later.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage("An error occurred while submitting the form. Please try again later.");
        }
    };

    return (
        <>
            <section className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Add New Room</h2>

                        <form onSubmit={handleSubmit}>
                            {successMessage && (
                                <div className="alert alert-success" role="alert">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            <div className='mb-3'>
                                <label htmlFor='roomType' className='form-label'>Room Type</label>
                                <RoomTypeSelector
                                    handleRoomInputChange={handleRoomInputChange}
                                    newRoom={newRoom}
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='roomPrice' className='form-label'>Room Price</label>
                                <input
                                    className='form-control'
                                    required
                                    id="roomPrice"
                                    name='roomPrice'
                                    type='number'
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='photo' className='form-label'>Room Photo</label>
                                <input
                                    type='file'
                                    id='photo'
                                    name='photo'
                                    className='form-control'
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview Room Photo"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mb-3"
                                    />
                                )}
                            </div>

                            <div className='d-grid d-md-flex mt-2'>
                                <button className='btn btn-outline-primary ml-5'>Save Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddRoom;
