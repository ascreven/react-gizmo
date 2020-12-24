import "./List.css";

function List(props: any) {
    return (
        <div className="list">
            <ol className="list__container">
                <li className="list__item list__group">{props.title}</li>
                {props.items.map((item: any) => (
                    <li className="list__item" key={item.id}>
                        {item.title}
                    </li>
                ))}
            </ol>
        </div>
    );
}
export default List;
