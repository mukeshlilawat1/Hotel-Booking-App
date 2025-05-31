import axios from "axios";

// create an axios instance with the base url for the api
export const Api = axios.create({
  baseURL: "http://localhost:9192/api"
})

// function to add a new room
// using the form data to send the photo, room type, and room price
// returns true if the room is added successfully, otherwise false
export async function AddRoom(photo, roomType, roomPrice) {
  const formData = new FormData()
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);


  // send the form data to the server
  // using the post method of axios
  const response = await Api.post("/rooms/add/new-room", formData)
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

// function to get all rooms
// returns an array of room objects
export async function getRoomTypes() {
  try {
    const response = await Api.get("/rooms/room-types");
   return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
}
