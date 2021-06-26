import { useHistory, useLocation } from "react-router-dom";
import { Card, Table, Pagination } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import queryString from "query-string";

function Restaurants() {
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const perPage = 10;
    let location = useLocation();
    let history = useHistory();
    let query = queryString.parse(location.search);
   

  useEffect(() => {
    let URL = `https://assignment11display.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;
    if(query.borough){
      URL= URL + `&borough=${query.borough}`;
    }
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
      });
  }, [page, location]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    setPage(page + 1);
  };

  if (restaurants) {

    if (restaurants.length > 0) {
        return (
          <div>
            <Card>
              <Card.Body>
                <Card.Title>Restaurant List</Card.Title>
                <Card.Subtitle>
                  Full list of restaurants. Optionally sorted by borough
                </Card.Subtitle>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Borough</th>
                  <th>Cuisine</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => 
                <>
                    <tr key={restaurant._id} onClick={() => { history.push(`/restaurant/${restaurant._id}`); }}>
                      <td>{restaurant.name}</td>
                      <td>
                        {restaurant.address.building} {restaurant.address.street}
                      </td>
                      <td>{restaurant.borough}</td>
                      <td>{restaurant.cuisine}</td>
                    </tr>
                </>
                )}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.Prev onClick={() => previousPage()} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={() => nextPage()} />
            </Pagination>
          </div>
        );
      } else 
      {
        return (
          <div>
            <Card>
              <Card.Body>
                <Card.Text>No Restaurants Found</Card.Text>
              </Card.Body>
            </Card>
          </div>
        );
      }
  }
  else {
    return (
        <div>
          <Card>
            <Card.Body>
              <Card.Text>Loading Restaurants...</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    } 
  }


export default Restaurants;