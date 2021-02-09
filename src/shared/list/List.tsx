import React from "react";
import "./List.scss";
import ListGroup from 'react-bootstrap/ListGroup';

function List(props: any) {

  return (
    <div className="list">
      <ListGroup className="list-group">
        <ListGroup.Item className="list-group-item-title">
          {props.title}
        </ListGroup.Item>
        {props.items.map((item: any, index: number) => (
          <ListGroup.Item key={index} action onClick={() => props.onItemSelect(item.id)}>
            {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
export default List;
