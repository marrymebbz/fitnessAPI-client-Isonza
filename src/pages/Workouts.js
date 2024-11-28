import { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { WorkoutList } from '../components/WorkoutCard';
import AddWorkout from '../components/AddWorkout'; // Import AddWorkout component

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
//           console.error('User data not found');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [setUser]);

//   // Fetch workout data and ensure the response is an array
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
//         // Ensure the response is an array
//         if (Array.isArray(data)) {
//           setWorkouts(data); // Store workouts in state
//         } else {
//           setWorkouts([]); // Set empty array if the response is not an array
//           console.error('Expected an array of workouts, but got:', data);
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
//   }, [fetchData, user]); 

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
//           <AddWorkout closeModal={handleCloseModal} /> {/* Add the AddWorkout component inside the modal */}
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }

import { Row, Col, Card, Spinner } from 'react-bootstrap';

export default function Workouts() {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
      const fetchUrl = 'https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts';

      try {
        const response = await fetch(fetchUrl, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else {
          console.error('Unexpected response format:', data);
          setWorkouts([]);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWorkouts();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="text-center mt-5">
        <h3>Please log in to view your workouts.</h3>
      </Container>
    );
  }

    // Function to handle the modal open and close
  const handleCloseModal = () => setShowAddWorkoutModal(false);
  const handleShowModal = () => setShowAddWorkoutModal(true);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-2 fw-bold">My Workouts</h2>
      {workouts.length === 0 ? (
        <>
          <div className="text-center">No workouts available. Start adding your workouts!</div>
          <Button 
            variant="primary" 
            onClick={handleShowModal} 
            className="mx-auto mt-2 mb-3 d-flex px-5 py-2 bg-info bg-gradient border-0 fw-bold text-center"
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
              <AddWorkout closeModal={handleCloseModal} /> {/* Add the AddWorkout component inside the modal */}
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <>
          <Row className="g-4">
          {workouts.map(workout => (
            <Col key={workout._id} xs={12} sm={6} md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{workout.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Duration</Card.Subtitle>
                  <Card.Text>{workout.duration} minutes</Card.Text>
                  <Button variant="primary" className="bg-info bg-gradient">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </>
      )}

    </Container>
  );
}
