import "./App.css";
import axios from "axios";
import { backend_api_url } from "./backend";
import { Fragment, useEffect, useState } from "react";
function App() {
  const [userData, setUserData] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backend_api_url}/${pagination}/next`)
      .then((res) => {
        console.log(res.data.users);
        setUserData(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [pagination]);

  const onNextHandler = () => {
    setPagination(pagination + 10);
    setPage(page + 1);
  };
  const onPrevioustHandler = () => {
    if (pagination > 10) {
      setPagination(pagination - 10);
      setPage(page - 1);
    } else {
      setPagination(0);
      setPage(1);
    }
  };
  let less;
  let more;
  let lesser;
  let most;
  if (page > 0) {
    less = page - 1;
    more = page + 1;
    most = page + 2;
    lesser = page - 2;
  }
  const leastPage = () => {
    setPagination(0);
    setPage(1);
  };
  const setLessPage = (page) => {
    setPagination(page * 10);
    setPage(page);
  };
  const setLesserPage = (page) => {
    setPagination(page * 20);
    setPage(page);
  };
  const setMorePage = (page) => {
    setPagination(page * 10);
    setPage(page);
  };
  const setMostPage = (page) => {
    setPagination(page * 20);
    setPage(page);
  };

  return (
    <div className="App">
      {!loading ? (
        <Fragment>
          {" "}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>JobTitle</th>
                <th>Full Name</th>
                <th>Email 1</th>
                <th>Email 2</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((user) => (
                <tr key={user.ID}>
                  <td>{user.ID}</td>
                  <td>{user.Company}</td>
                  <td>{user.JobTitle}</td>
                  <td>{user.FirstNameLastName}</td>
                  <td>{user.EmailAddress}</td>
                  <td>{user.Email}</td>
                  <td>{user.Phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination_button">
            {page !== 1 && (
              <button type="button" onClick={onPrevioustHandler}>
                &laquo; Previous
              </button>
            )}
            <div className="pagination">
              {page > 3 && (
                <button className="firstPage" onClick={leastPage}>
                  1
                </button>
              )}
              {page > 2 && (
                <button onClick={() => setLesserPage(less)}>{lesser}</button>
              )}
              {page > 1 && (
                <button onClick={() => setLessPage(less)}>{less}</button>
              )}

              <button
                className="activePage"
                type="button"
                onClick={() => alert("Already on this page")}
              >
                {page}
              </button>
              <button onClick={() => setMorePage(more)}>{more}</button>
              <button onClick={() => setMostPage(most)}>{most}</button>
            </div>
            <button type="button" onClick={onNextHandler}>
              Next &raquo;
            </button>
          </div>
        </Fragment>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default App;
