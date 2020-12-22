import "./List.css";

function List() {
    return (
        <div className="list">
            <ol className="list__container">
                <li className="list__item list__group">list group name</li>
                <li className="list__item">list item 1</li>
                <li className="list__item">list item 2</li>
                <li className="list__item">list item 3</li>
            </ol>
        </div>
    );
}
export default List;
