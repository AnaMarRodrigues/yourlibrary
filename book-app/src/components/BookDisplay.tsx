import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
  useState,
} from "react";
import BookDetails from "./BookDetails";
import cover from "../assets/no_cover.png";

const BookDisplay = ({ book }) => {
  console.log(book);

  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState<any>();
  return (
    <>
      {book.map(
        (item: {
          volumeInfo: {
            imageLinks: { smallThumbnail: any };
            title:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            authors: any[];
            publishedDate:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
          };
          id: Key | null | undefined;
        }) => {
          let thumbnail =
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail;

          return (
            <>
              <div
                className="card"
                key={item.id}
                onClick={() => {
                  setShow(true), setItem(item);
                }}
              >
                {thumbnail ? (
                  <img src={thumbnail} alt="" />
                ) : (
                  <div className="placeholder-image">
                    <img src={cover} alt="No Cover"></img>
                  </div>
                )}
                <div className="bottom">
                  <h3 className="title">{item.volumeInfo.title}</h3>
                  <h4 className="author">
                    {item.volumeInfo.authors?.join(", ") || "Unknown Author"}
                  </h4>
                  <p className="date">{item.volumeInfo.publishedDate}</p>
                </div>
              </div>
              <BookDetails
                show={show}
                item={bookItem}
                onClose={() => setShow(false)}
              />
            </>
          );
        }
      )}
    </>
  );
};

export default BookDisplay;
