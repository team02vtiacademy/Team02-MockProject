import React from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import { selectFilms } from "../../redux/selectors/FilmSelector";
// import paginationFactory from "react-bootstrap-table2-paginator";
import { getListFilmAction } from "../../redux/actions/FilmActions";
import '../../css/film.css'

import * as Icon from 'react-feather';


const FilmList = (props) => {
  

  return(
  <Container fluid className="p-0">
    
    <Row>
      <Col> 
        <Card>
          <CardHeader>

          </CardHeader>
          <CardBody>
              <div className="category-products cgv-movies">
              <ul className="products-grid products-grid--max-4-col first last odd">
              {props.films.map((film)=>(
                    <li className="film-lists item last">
                        <div className="product-images">
                            <a
                              href={`/films/${film.filmId}`}
                              title={film.name}
                              className="product-image"
                            >
                                <img
                                  className="product-images"
                                  id="product-collection-image-5416"
                                    src={film.poster}
                                    alt={film.name}
                                />
                            </a>
                        </div>
                        <div
                          className="product-info"
                          style={{ maxHeight: "none", height: "auto", minHeight: 36 }}
                        >
                        <h2 className="product-name">
                          <a
                            href="#"
                            title={film.name}
                          >
                            {film.name}
                          </a>
                        </h2>

                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Thể loại: </span>
                          <span className="cgv-info-normal">
                            {film.genre}
                          </span>
                        </div>
                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Thời lượng: </span>
                          <span className="cgv-info-normal">{film.duration}</span>
                        </div>

                
                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Khởi chiếu: </span>
                          <span className="cgv-info-normal">{film.releaseDate}</span>
                        </div>
                        <div className="cgv-movie-info">
                        <span className="cgv-info-bold">Giá vé: </span>
                        <span className="cgv-info-normal">{film.ticketPrice} VNĐ</span>
                        </div>
                      </div>
                    </li>

              ))}
              </ul>
            </div>
        
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
)};


export default FilmList;