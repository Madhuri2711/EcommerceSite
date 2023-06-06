import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.location !== prevProps.location) {
  //     this.onRouteChanged();
  //   }
  // }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: true });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/advanced-ui', state: 'advancedUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/maps', state: 'mapsMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/general-pages', state: 'generalPagesMenuOpen' },
      { path: '/ecommerce', state: 'ecommercePagesMenuOpen' },
      { path: '/landing', state: 'landingMenuOpen' },
      { path: '/admin', state: 'adminMenuOpen' },

    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: false })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          {/* <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt =>evt.preventDefault()}>
              <div className="nav-profile-image">
                <img src={ require("../../assets/images/faces/face1.jpg") } alt="profile" />
                <span className="login-status online"></span>
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2"><Trans>David Grey. H</Trans></span>
                <span className="text-secondary text-small"><Trans>Project Manager</Trans></span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li> */}
          {/* <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li> */}

          <>

            <li className={this.isPathActive('/landing') ? 'nav-item active' : 'nav-item'}>
              <div className={this.state.landingMenuOpen && this.isMainPathActive('/landing') ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('landingMenuOpen')} 
                data-toggle="collapse"
              >
                <span className="menu-title"><Trans>Landing Page </Trans></span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.landingMenuOpen}>
                <ul className="nav flex-column sub-menu">
                  <li className={this.isPathActive('landing/inquirylist') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/inquirylist">
                      <span className="menu-title"><Trans>Inquiries</Trans></span>
                      <i className="mdi mdi-note-text menu-icon"></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('landing/faqlist') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/faqlist">
                      <span className="menu-title"><Trans>FAQs</Trans></span>
                      <i className="mdi mdi-comment-question-outline menu-icon"></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('landing/bloglist') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/bloglist">
                      <span className="menu-title"><Trans>Blogs</Trans></span>
                      <i className="mdi mdi-lead-pencil menu-icon"></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('landing/news-subscriberslist') ?
                    'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/news-subscriberslist">
                      <span className="menu-title"><Trans>News Subscribers</Trans></span>
                      <i className="mdi mdi-newspaper menu-icon"></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('landing/custom-content') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/custom-content">
                      <span className="menu-title"><Trans>Custom Content</Trans></span>
                      <i className="mdi mdi-content-paste menu-icon"></i>
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            <li className={this.isPathActive('/admin') ? 'nav-item active' : 'nav-item'}>
              <div className={this.state.adminMenuOpen && this.isMainPathActive('/') ? 'nav-link menu-expanded' : 'nav-link'} 
               onClick={() => this.toggleMenuState('adminMenuOpen')} data-toggle="collapse"
              >
                <span className="menu-title"><Trans>Admin Panel </Trans></span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.adminMenuOpen}>
                <ul className="nav flex-column sub-menu">
                  <li className={this.isPathActive('/bannerlist') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/bannerlist">
                      <span className="menu-title"><Trans>Banners</Trans></span>
                      <i className="mdi mdi-camera-image menu-icon"></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('/categorylist') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/categorylist">
                      <span className="menu-title"><Trans>Categories</Trans></span>
                      <i className="mdi mdi-lumx menu-icon"></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('/sub-categorylist') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/sub-categorylist">
                      <span className="menu-title"><Trans>Sub-Categories</Trans></span>
                      <i className="mdi mdi-layers menu-icon"></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('/products') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/products">
                      <span className="menu-title"><Trans>Products</Trans></span>
                      <i className="mdi mdi-view-dashboard menu-icon"></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('/users') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/users">
                      <span className="menu-title"><Trans>Users</Trans></span>
                      <i className='mdi mdi mdi-account-multiple menu-icon'></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('/orders') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/orders">
                      <span className="menu-title"><Trans>Orders</Trans></span>
                      <i className="mdi mdi mdi-basket-fill menu-icon"></i>
                    </Link>
                  </li>
                  <li className={this.isPathActive('/payment_checkout') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/payment_checkout">
                      <span className="menu-title"><Trans>Payment Checkout</Trans></span>
                      {/* <i className="mdi mdi mdi-cash-multiple menu-icon"></i> */}
                    </Link>
                  </li>
                  {/* <li className={this.isPathActive('/icons') ? 'nav-item active' : 'nav-item'}>
                    <div className={this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
                      <span className="menu-title"><Trans>Icons</Trans></span>
                      <i className="menu-arrow"></i>
                      <i className="mdi mdi-contacts menu-icon"></i>
                    </div>
                    <Collapse in={this.state.iconsMenuOpen}>
                      <ul className="nav flex-column sub-menu">
                        <li className="nav-item"> <Link className={this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link'} to="/icons/mdi"><Trans>Material</Trans></Link></li>
                      </ul>
                    </Collapse>
                  </li> */}
                </ul>
              </Collapse >
            </li>
          </>
          <>

            {/* <li className={this.isPathActive('/basic-ui') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('basicUiMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Basic UI Elements</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
            </div>
            <Collapse in={this.state.basicUiMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'} to="/basic-ui/buttons"><Trans>Buttons</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/form-elements') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('formElementsMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Form Elements</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-format-list-bulleted menu-icon"></i>
            </div>
            <Collapse in={this.state.formElementsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/form-elements/basic-elements"><Trans>Basic Elements</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/tables') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('tablesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Tables</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-table-large menu-icon"></i>
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link'} to="/tables/basic-table"><Trans>Basic Table</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/icons') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Icons</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-contacts menu-icon"></i>
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link'} to="/icons/mdi"><Trans>Material</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/charts') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('chartsMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Charts</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-chart-bar menu-icon"></i>
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link'} to="/charts/chart-js"><Trans>Chart Js</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/user-pages') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-lock menu-icon"></i>
            </div>
            <Collapse in={this.state.userPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/user-pages/lockscreen') ? 'nav-link active' : 'nav-link'} to="/user-pages/lockscreen"><Trans>Lockscreen</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/error-pages') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('errorPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-security menu-icon"></i>
            </div>
            <Collapse in={this.state.errorPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-404">404</Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-500">500</Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/general-pages') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.generalPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('generalPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>General Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </div>
            <Collapse in={this.state.generalPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/general-pages/blank-page') ? 'nav-link active' : 'nav-link'} to="/general-pages/blank-page"><Trans>Blank Page</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://bootstrapdash.com/demo/purple-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-title"><Trans>Documentation</Trans></span>
              <i className="mdi mdi-file-document-box menu-icon"></i>
            </a>
          </li> */}
          </>
        </ul >
      </nav >
    );
  }

  isMainPathActive(path) {
    return this.props.location.pathname;
  }
  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);