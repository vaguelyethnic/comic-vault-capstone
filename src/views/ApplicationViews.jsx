import { Route, Routes, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { EditingForm } from "../components/Forms/editingPage";
import { Home } from "../components/Home/home";
import { ListAllComics } from "../components/Vaults/mainVault/listAllComics";
import { UserSpecificComicList } from "../components/Vaults/userVault/specificComics";
import { ComicDetails } from "../components/Vaults/userVault/comicDetails"; // Ensure path is correct
import { ComicForm } from "../components/Forms/comicForm";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const userObject = JSON.parse(localUser);
      setCurrentUser(userObject);
    }
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Home currentUser={currentUser}/>} />
        <Route path='main-vault' element={<ListAllComics />} />
        <Route path='personal-vault'>
          <Route index element={<UserSpecificComicList currentUser={currentUser} />} />
          <Route path=":comicId">
            <Route index element={<ComicDetails currentUser={currentUser}/>} />
            <Route path=':editing-page' element={<EditingForm currentUser={currentUser} />} />
        </Route>
        <Route path='add-comic' element={<ComicForm currentUser={currentUser}/>} />
        <Route path='comicId' element={<ComicDetails currentUser={currentUser} />} />
      </Route>
      </Route>
    </Routes>
  );
};

