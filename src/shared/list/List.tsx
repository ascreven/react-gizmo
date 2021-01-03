import "./List.scss";

function List(props: any) {
  return (
    <div className="list">
      <ul className="list-group">
        <li className="list-group-item list-group-item-title">{props.title}</li>
        {props.items.map((item: any) => (
          <li className="list-group-item" key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default List;
