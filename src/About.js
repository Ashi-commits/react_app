import React from 'react';
import Card from 'react-bootstrap/Card';

function About(){
  return(
<Card>
  <Card.Header as="h5">Hey! This is Me~</Card.Header>
  <Card.Body>
    <Card.Title>Ayushi Sahu</Card.Title>
    <Card.Text>
      I am a 5th semester CPA student, I love baking!
      I have done some projects in school while learning
      web programming. And soon I want to create a porfolio
      of my own. Wish me luck!
      Well, coding is my professtion and Baking is my passion.
      It is nice meeting you!
    </Card.Text>
  </Card.Body>
</Card>
  );
}
export default About;