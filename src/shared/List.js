import "./List.css";

function List(props) {
    return (
        <div className="list">
            <ol className="list__container">
                <li className="list__item list__group">{props.title}</li>
                {props.items.map(item => (
                    <li className="list__item" key={item.id}>
                        {item.title}
                    </li>
                ))}
                {/* <li className="list__item">list item 1</li>
                <li className="list__item">list item 2</li>
                <li className="list__item">list item 3</li> */}
            </ol>
        </div>
    );
}
export default List;
