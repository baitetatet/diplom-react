import { Outlet } from 'react-router-dom'
import { Nav } from 'Components/Nav/Nav';
import { Header } from 'Components/Header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <div className="main">
        <Nav />
        <Outlet />
      </div>
    </>
  );
}

