// import { useState, useEffect, useContext, useCallback } from 'react';
// import { Container, Button, Modal } from 'react-bootstrap';
// import { AuthContext } from '../context/AuthContext';
// import { WorkoutList } from '../components/WorkoutCard';
// import AddWorkout from '../components/AddWorkout'; // Import AddWorkout component

// export default function Workouts() {
//   const { user, setUser } = useContext(AuthContext);
//   const [workouts, setWorkouts] = useState([]); // Initialize workouts as an empty array
//   const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false); // State to control modal visibility

//   // Fetch user data
//   const fetchUserData = useCallback(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return; // No need to fetch user data if no token

//     fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.user) {
//           setUser(data.user); // Update context with user data
//         } else {
//           console.error('User data not found:', data);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [setUser]);

//   // Fetch workout data
//   const fetchData = useCallback(() => {
//     const token = localStorage.getItem('token');
//     const fetchUrl = 'https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts';

//     fetch(fetchUrl, {
//       headers: {
//         Authorization: token ? `Bearer ${token}` : '', // Only send token if available
//       },
//     })
//       .then(res => res.json())
//       .then(data => {
//         // Check if the response contains workouts array
//         if (data && Array.isArray(data.workouts)) {
//           setWorkouts(data.workouts); // Extract workouts array and update state
//         } else {
//           console.error('Unexpected response format:', data);
//           setWorkouts([]); // Set empty array if the response is not as expected
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching workouts:', error);
//         setWorkouts([]); // Set empty array in case of error
//       });
//   }, []);

//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Function to add a new workout to the list without refetching
//   const addNewWorkout = (newWorkout) => {
//     setWorkouts((prevWorkouts) => [newWorkout, ...prevWorkouts]); // Add new workout at the top of the list
//   };

//   // Function to handle the modal open and close
//   const handleCloseModal = () => setShowAddWorkoutModal(false);
//   const handleShowModal = () => setShowAddWorkoutModal(true);

//   return (
//     <Container>
//       {/* Displaying list of workouts */}
//       <WorkoutList workouts={workouts} />

//       <Button
//         variant="primary"
//         onClick={handleShowModal}
//         className="mb-1 mx-auto d-flex px-4 py-2 bg-danger border-0 fw-bold text-center"
//       >
//         Add Workout
//       </Button>

//       {/* Modal for AddWorkout component */}
//       <Modal
//         show={showAddWorkoutModal}
//         onHide={handleCloseModal}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Workout</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/* Pass addNewWorkout to AddWorkout component */}
//           <AddWorkout closeModal={handleCloseModal} addWorkout={addNewWorkout} />
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }

// import { useState, useEffect, useContext, useCallback } from 'react';
// import { Container, Button, Modal } from 'react-bootstrap';
// import { AuthContext } from '../context/AuthContext';
// import { WorkoutList } from '../components/WorkoutCard';
// import AddWorkout from '../components/AddWorkout'; // Import AddWorkout component

// export default function Workouts() {
//   const { user, setUser } = useContext(AuthContext);
//   const [workouts, setWorkouts] = useState([]); // Initialize workouts as an empty array
//   const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false); // State to control modal visibility

//   // Fetch user data
//   const fetchUserData = useCallback(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return; // No need to fetch user data if no token

//     fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.user) {
//           setUser(data.user); // Update context with user data
//         } else {
//           console.error('User data not found:', data);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [setUser]);

//   // Fetch workout data
//   const fetchData = useCallback(() => {
//     const token = localStorage.getItem('token');
//     const fetchUrl = 'https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts';

//     fetch(fetchUrl, {
//       headers: {
//         Authorization: token ? `Bearer ${token}` : '', // Only send token if available
//       },
//     })
//       .then(res => res.json())
//       .then(data => {
//         // Check if the response contains workouts array
//         if (data && Array.isArray(data.workouts)) {
//           setWorkouts(data.workouts); // Extract workouts array and update state
//         } else {
//           console.error('Unexpected response format:', data);
//           setWorkouts([]); // Set empty array if the response is not as expected
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching workouts:', error);
//         setWorkouts([]); // Set empty array in case of error
//       });
//   }, []);

//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Function to add a new workout to the list without refetching
//   const addNewWorkout = (newWorkout) => {
//     setWorkouts((prevWorkouts) => [newWorkout, ...prevWorkouts]); // Add new workout at the top of the list
//   };

//   // Function to handle the modal open and close
//   const handleCloseModal = () => setShowAddWorkoutModal(false);
//   const handleShowModal = () => setShowAddWorkoutModal(true);

//   return (
//     <Container>
//       {/* Displaying list of workouts */}
//       <WorkoutList workouts={workouts} />

//       <Button
//         variant="primary"
//         onClick={handleShowModal}
//         className="mb-1 mx-auto d-flex px-4 py-2 bg-danger border-0 fw-bold text-center"
//       >
//         Add Workout
//       </Button>

//       {/* Modal for AddWorkout component */}
//       <Modal
//         show={showAddWorkoutModal}
//         onHide={handleCloseModal}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Workout</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/* Pass addNewWorkout to AddWorkout component */}
//           <AddWorkout closeModal={handleCloseModal} addWorkout={addNewWorkout} />
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }

import { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { WorkoutList } from '../components/WorkoutCard';
import AddWorkout from '../components/AddWorkout'; // Import AddWorkout component

export default function Workouts() {
  const { user, setUser } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]); // Initialize workouts as an empty array
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false); // State to control modal visibility

  // Fetch user data
  const fetchUserData = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return; // No need to fetch user data if no token

    fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user); // Update context with user data
        } else {
          console.error('User data not found:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [setUser]);

  // Fetch workout data
  const fetchData = useCallback(() => {
    const token = localStorage.getItem('token');
    const fetchUrl = 'https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts';

    fetch(fetchUrl, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Only send token if available
      },
    })
      .then(res => res.json())
      .then(data => {
        // Check if the response contains workouts array
        if (data && Array.isArray(data.workouts)) {
          setWorkouts(data.workouts); // Extract workouts array and update state
        } else {
          console.error('Unexpected response format:', data);
          setWorkouts([]); // Set empty array if the response is not as expected
        }
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setWorkouts([]); // Set empty array in case of error
      });
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to add a new workout to the list without refetching
  const addNewWorkout = (newWorkout) => {
    setWorkouts((prevWorkouts) => [newWorkout, ...prevWorkouts]); // Add new workout at the top of the list
  };

  // Function to handle the modal open and close
  const handleCloseModal = () => setShowAddWorkoutModal(false);
  const handleShowModal = () => setShowAddWorkoutModal(true);

  return (
    <Container className="mb-5">
      {/* Displaying list of workouts */}
      <WorkoutList workouts={workouts} />

      <Button
        variant="primary"
        onClick={handleShowModal}
        className="mb-1 mx-auto d-flex px-4 py-2 bg-danger border-0 fw-bold text-center"
      >
        Add Workout
      </Button>

      {/* Modal for AddWorkout component */}
      <Modal
        show={showAddWorkoutModal}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pass addNewWorkout to AddWorkout component */}
          <AddWorkout closeModal={handleCloseModal} addWorkout={addNewWorkout} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
