import React from 'react'
import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import { useDashboardContext } from '../pages/DashboardLayout';

const NavLinks = ({isBigSidebar}) => {
    const {toggleSidebar} = useDashboardContext();
    // console.log(isBigSidebar)
  return (
    <div>
        <div className="nav-links">
            {links.map((link) => {
              // console.log(link);
              const { text, path, icon } = link;
              return (
                <NavLink
                  to={path}
                  key={text}
                  className="nav-link"
                  onClick={isBigSidebar ? null : toggleSidebar}
                  end
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
    </div>
  )
}

export default NavLinks
