import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Card, CardGroup } from "react-bootstrap";
import { useParams } from 'react-router-dom';

function Restaurant(props) {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    let {id}=useParams();
    useEffect(() => {
      setLoading(true);
      fetch( `https://assignment11display.herokuapp.com/api/restaurants/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setLoading(false);
          if (data.hasOwnProperty("_id")) {
            setRestaurant(data);
          } else {
            setRestaurant(null);
          }
        });
    }, [id]);
  
    if (loading) {
      return (
        <Card>
          <Card.Body>
            <Card.Text>Loading Restaurant Data...</Card.Text>
          </Card.Body>
        </Card>
      );
    } 
    else {
      if (restaurant != null) {
        return (
          <div>
            <Card>
                <Card.Header as="h5">{restaurant.name}</Card.Header>
                <Card.Body>
                 <Card.Title></Card.Title>
                 <Card.Text>
                 {restaurant.address.building} {restaurant.address.street}
                </Card.Text>
             </Card.Body>
            </Card>
            <Map
              style={{ height: "400px" }} center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
              zoom={13} scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[
                  restaurant.address.coord[1],
                  restaurant.address.coord[0],
                ]}
              ></Marker>
            </Map>
  
            <h1>Grades</h1>
  
            <CardGroup>
              {restaurant.grades.map((rest, i) => {
                return (
                  <Card key={`${i}`}>
                    <Card.Body>
                      <Card.Title>Grade: {rest.grade}</Card.Title>
                      <Card.Text>
                        Date: {new Date(rest.date).toLocaleDateString()}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardGroup>
          </div>
        );
      } else {
        return (
          <Card>
            <Card.Body>
              <Card.Text>Unable to find Restaurant with id: {id}</Card.Text>
            </Card.Body>
          </Card>
        );
      }
    }
  }
  
  export default Restaurant;