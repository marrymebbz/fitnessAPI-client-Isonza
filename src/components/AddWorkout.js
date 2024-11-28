import { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { Notyf } from 'notyf';

// export default function AddWorkout() {
//   const notyf = new Notyf();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   // Input states
//   const [name, setName] = useState("");
//   const [duration, setDuration] = useState("");

//   // Async function to create the workout
//   async function createWorkout(e) {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('duration', duration);

//     try {
//       const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData // Send FormData instead of JSON
//       });

//        // Check if the response is OK (status 2xx)
//   if (!response.ok) {
//     // Log additional response details for debugging
//     const errorText = await response.text();
//     console.error(`Error: ${response.status} - ${errorText}`);
//     throw new Error('Failed to add workout');
//   }

//       // Reset form fields on success
//       setName("");
//       setDuration("");
//       notyf.success("Workout added.");
//       navigate("/workouts");

//     } catch (error) {
//       console.error('Error:', error);
//       notyf.error("Error: Something Went Wrong.");
//     }
//   }

//   return (
//     user ? (
//       <Container>
//         <h1 className="my-4 text-center">Add Workout</h1>
//         <Form onSubmit={createWorkout} encType="multipart/form-data" className="border rounded border-primary p-4">
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-semibold">Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Name"
//               required
//               value={name}
//               onChange={e => setName(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-semibold">Duration:</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Duration"
//               required
//               value={duration}
//               onChange={e => setDuration(e.target.value)}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit" className="mt-3 w-100">Submit</Button>
//         </Form>
//       </Container>
//     ) : ( 
//       <Navigate to="/workouts" />
//     )
//   );
// }

export default function AddWorkout({ closeModal }) {
  const notyf = new Notyf();
  const { user } = useContext(AuthContext);

  // Input states
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  // Async function to create the workout
  async function createWorkout(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Make sure the token is available
    if (!token) {
      notyf.error("You need to be logged in to add a workout.");
      return;
    }

    // Prepare the data to send as JSON
    const workoutData = {
      name,
      duration,
    };

    try {
      const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Specify the content type
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(workoutData),  // Send the data as JSON
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        notyf.error(`Failed to add workout: ${errorText}`);
        return;
      }

      // Reset form fields and close modal on success
      setName("");
      setDuration("");
      notyf.success("Workout added successfully.");
      closeModal();  // Close the modal after successful submission
    } catch (error) {
      console.error('Error:', error);
      notyf.error("Something went wrong. Please try again.");
    }
  }

  return (
    user ? (
      <Form onSubmit={createWorkout}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Duration:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Duration"
            required
            value={duration}
            onChange={e => setDuration(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 w-100">Submit</Button>
      </Form>
    ) : (
      <Navigate to="/workouts" />
    )
  );
}
