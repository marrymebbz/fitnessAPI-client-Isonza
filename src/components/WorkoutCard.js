import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function WorkoutCard({ workoutProp }) {
  const { name, duration} = workoutProp;

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Duration:</Card.Subtitle>
        <Card.Text>{duration}</Card.Text>
      </Card.Body>
    </Card>
  );
}

WorkoutCard.propTypes = {
  workoutProp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};

export function WorkoutList({ workouts }) {
  return (
    <Container className="mt-5 mb-4">
      {/* Title Section */}
      <div className="text-center mb-0">
        <h2>Our Workouts</h2>
      </div>

      {/* Responsive Grid for Workoutss */}
      <Row className="g-4">
        {workouts.map((workout) => (
          <Col key={workout._id} xs={12} sm={6} md={4}>
            <WorkoutCard workoutProp={workout} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

WorkoutList.propTypes = {
  workouts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired
    })
  ).isRequired,
};