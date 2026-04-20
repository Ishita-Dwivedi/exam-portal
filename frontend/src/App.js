
import { useState } from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import QuestionList from "./components/QuestionList.jsx";

function App() {
  
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    if (page === "register") {
      return <Register setPage={setPage} />
    }
    return <Login setLoggedIn={setLoggedIn} setPage={setPage} />;
  }

  return <QuestionList />;

}

export default App;