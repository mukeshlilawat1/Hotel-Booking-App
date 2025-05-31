import React, { useEffect, useState } from 'react'
// Import getRoomTypes from its module (update the path as needed)
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomTypes, setNewRoomTypes] = useState("");

    useEffect(() => {
        getRoomTypes().then((data) => {
            setNewRoomTypes(data);
        })
    }, [])


    const handleNewRoomTypeInputChange = (event) => {
        setNewRoomTypes(event.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomTypes !== "") {
            setRoomTypes([...roomTypes, newRoomTypes])
            setNewRoomTypes("");
            setShowNewRoomTypeInput(false);
        }
    }


    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select required className='form-select'
                        id='roomType' name='roomType'
                        value={newRoom.roomTypes}
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewRoomTypeInput(true);
                            } else {
                                handleRoomInputChange(e);
                            }
                        }}>

                        <option value={""}>
                            Select a Room Type
                        </option>
                        <option value={"Add New"}> Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}

                            </option>
                        ))}
                    </select>

                    {showNewRoomTypeInput && (
                        <div className='input-group'>
                            <input className='form-control ' type='text'
                                placeholder='Enter a New Room Type'
                                onChange={handleNewRoomTypeInputChange}
                            />

                            <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector