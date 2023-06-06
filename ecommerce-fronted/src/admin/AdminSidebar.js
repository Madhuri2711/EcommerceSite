import React from 'react'
import ManageUsers from './ManageUsers'
import Cities from './Cities';
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const AdminSidebar = () => {
    let location = useLocation();
    return (
        <>
            <div className="navbar-fixed sidebar-fixed" id="body">


                <div className="wrapper">


                    <aside className="left-sidebar sidebar-dark" id="left-sidebar">
                        <div id="sidebar" className="sidebar sidebar-with-footer">
                            {/* <!-- Aplication Brand --> */}
                            <div className="app-brand">
                                <Link  to="/">
                                    <img src="images/logo.png" alt="Mono" />
                                    <span className="brand-name">InaniHub</span>
                                </Link>
                            </div>



                            <div className="sidebar-left" data-simplebar style={{ "height": "100%" }}>


                                {/* <!-- sidebar menu --> */}
                                <ul className="nav sidebar-inner" id="sidebar-menu">



                                    <li
                                        className="active"
                                    >
                                        <a className="sidenav-item-link" href="index.html">
                                            <i className="mdi mdi-briefcase-account-outline"></i>
                                            <span className="nav-text">Dashboard</span>
                                        </a>
                                    </li>


                                    <li className="has-sub" >
                                        <Link className="sidenav-item-link" to="/category" data-toggle="collapse" data-target="#email"
                                            aria-expanded="false" aria-controls="email">
                                            <i className="mdi mdi-calendar-check"></i>
                                            <span className="nav-text">Category</span> <b className="caret"></b>
                                        </Link>
                                        <ul className="collapse" id="email"
                                            data-parent="#sidebar-menu">
                                            <div className="sub-menu">
                                                <li >
                                                    <a className="sidenav-item-link" href="email-details.html">
                                                        <span className="nav-text"> Manage Category</span>

                                                    </a>
                                                </li>

                                                <li >
                                                    <a className="sidenav-item-link" href="email-compose.html">
                                                        <span className="nav-text">Manage Sub Category</span>

                                                    </a>
                                                </li>
                                            </div>
                                        </ul>
                                    </li>

                                    <li
                                    >
                                        <a className="sidenav-item-link" href="calendar.html">
                                            <i className="mdi mdi-file-chart"></i>
                                            <span className="nav-text">Contries</span>
                                        </a>
                                    </li>

                                    <li
                                    >
                                        <a className="sidenav-item-link" href="team.html">
                                            <i className="mdi mdi-file-check"></i>
                                            <span className="nav-text">State</span>
                                        </a>
                                    </li>

                                    <li
                                    >
                                        <Link className="sidenav-item-link" to="/cities">
                                            <i className="mdi mdi-file-document"></i>
                                            <span className="nav-text">Cities</span>
                                        </Link>
                                    </li>

                                    <li
                                    >
                                        <Link className="sidenav-item-link" to="/ManageUsers">
                                            <i className="mdi mdi-account-group"></i>
                                            <span className="nav-text">Users</span>
                                        </Link>
                                    </li>
                                    <li
                                    >
                                        <Link className="sidenav-item-link" to="/notification">
                                            <i className="mdi mdi-bell"></i>
                                            <span className="nav-text">Notification</span>
                                        </Link>
                                    </li>




                                    <li
                                    >
                                        <a className="sidenav-item-link" href="calendar.html">
                                            <i className="mdi mdi-comment-multiple"></i>
                                            <span className="nav-text">FAQ</span>
                                        </a>
                                    </li>


                                    <li className="has-sub" >
                                        <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#ui-elements"
                                            aria-expanded="false" aria-controls="ui-elements">
                                            <i className="mdi mdi-settings"></i>
                                            <span className="nav-text">Setting</span> <b className="caret"></b>
                                        </a>
                                        <ul className="collapse" id="ui-elements"
                                            data-parent="#sidebar-menu">
                                            <div className="sub-menu">



                                                <li >
                                                    <a className="sidenav-item-link" href="alert.html">

                                                        <span className="nav-text">Profile</span>

                                                    </a>
                                                </li>
                                            </div>
                                        </ul>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </aside>

                    <div className="page-wrapper">
                        <header className="main-header" id="header">
                            <nav className="navbar navbar-expand-lg navbar-light" id="navbar">

                                <button id="sidebar-toggler" className="sidebar-toggle">
                                    <span className="sr-only">Toggle navigation</span>
                                </button>

                                {/* <span className="page-title">dashboard</span> */}

                                <div className="navbar-right ">

                                    <ul className="nav navbar-nav">

                                     <li className="dropdown user-menu">
                                            <button className="dropdown-toggle nav-link" data-toggle="dropdown">
                                                <img src="images/user/user-xs-01.jpg" className="user-image rounded-circle" alt="User Image" />
                                                <span className="d-none d-lg-inline-block">John Doe</span>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-right">
                                                <li>
                                                    <a className="dropdown-link-item" href="user-profile.html">
                                                        <i className="mdi mdi-account-outline"></i>
                                                        <span className="nav-text">My Profile</span>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a className="dropdown-link-item" href="user-account-settings.html">
                                                        <i className="mdi mdi-settings"></i>
                                                        <span className="nav-text">Account Setting</span>
                                                    </a>
                                                </li>

                                                <li className="dropdown-footer">
                                                    <a className="dropdown-link-item" href="sign-in.html"> <i className="mdi mdi-logout"></i> Log Out </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </nav>


                        </header>

                    {location.pathname === '/ManageUsers' ?  <ManageUsers/> : " "}
                    
                    {location.pathname === '/cities' ?  <Cities/> : " "}

                    </div>
                </div>

            </div>
           
        </>
    )
}

export default AdminSidebar