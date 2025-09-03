import "./styles.scss";
interface ListProps {
  listItems: any[];
}
const spreadList = (listItem: string | any[]) => {
  if (Array.isArray(listItem)) {
    return (
      <li className="ui-kut-subList">
        {listItem.map((item) => spreadList(item))}
      </li>
    );
  } else {
    return <li className="ui-kut-listItem">{listItem}</li>;
  }
};
const List: React.FC<ListProps> = ({ listItems }) => {
  return (
    <ul className="ui-kit-list">{listItems.map((item) => spreadList(item))}</ul>
  );
};

export default List;
