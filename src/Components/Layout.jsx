import { Outlet } from 'react-router-dom'
import { Nav } from './Nav/Nav';
import { Header } from './Header/Header';

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

