import React from "react";
import "./List.scss";
import ListGroup from 'react-bootstrap/ListGroup';

type props = {
  title: string,
  items: any[], 
  itemId: string, 
  displayProperty: string,
  onItemSelect: (selectedItem: number) => void;
}

function List(props: props) {

  return (
    <div className="list">
      <ListGroup className="list-group">
        <ListGroup.Item className="list-group-item-title">
          {props.title}
        </ListGroup.Item>
        {props.items.map((item: any, index: number) => (
          <ListGroup.Item key={index} action onClick={() => props.onItemSelect(item[props.itemId])}>
            {item[props.displayProperty]}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
export default List;
