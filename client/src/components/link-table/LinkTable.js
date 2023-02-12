import { Link } from "react-router-dom";
import "./LinkTable.css";

export default function LinkTable({ links, local, deleteHandler }) {
  if (!links.length) {
    return (
      <div className="noLink">
        <h3>No Links</h3>
      </div>
    );
  }
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>№</th>
          <th>Original</th>
          <th>Shorten Link</th>
          <th>Open</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link className={"link"} to={`/detail/${link._id}`}>
                Open
              </Link>
            </td>
            <td className="del" onClick={() => !local && deleteHandler(link._id, index)}>
              X
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
