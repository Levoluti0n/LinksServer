import "./LinkCard.css";
const form = ["from", "to", "code", "date", "clicks"];

export default function LinkCard({ link }) {
  const render = (data) => {
    return form.map((item, index) => {
      return (
        <div key={index} className="cardRow">
          <label className="item item-field">
            {item[0].toUpperCase() + item.slice(1, item.length)}
          </label>
          <label className="item">:</label>
          <label>
            {item === "date" ? (
              new Date(data[item]).toLocaleDateString()
            ) : item === "from" || item === "to" ? (
              <a
                target={"_blank"}
                href={data[item]}
                className={"link"}
                rel={"noopener noreferrer"}
              >
                {data[item]}
              </a>
            ) : (
              data[item]
            )}
          </label>
        </div>
      );
    });
  };

  return <div className="cardBox">{link && render(link)}</div>;
}
