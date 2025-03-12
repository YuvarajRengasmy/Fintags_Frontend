import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: {
        dashboard: false, // Track the open state for dashboard menu
        utilities: false, // Track the open state for utilities menu
        email: false,
        calls: false, // Track the open state for dashboard menu
        apps: false, // Track the open state for utilities menu
        setting: false,
      },
      isCollapsed: false, // Track the collapsed state of the sidebar
    };
  }

  toggleDropdown = (menu) => {
    this.setState((prevState) => ({
      isOpen: {
        ...prevState.isOpen,
        [menu]: !prevState.isOpen[menu], // Toggle the specific dropdown
      },
    }));
  };

  checkIfSectionShouldBeOpen = () => {
    const currentPath = window.location.pathname;
    const utilitiesLinks = [
      "/FileUpload",
      "/RegisterNumber",
      "/DomainSearch",
      "/utility1",
      "/EmailChecker",
      "/DataEnrichment",
      "/DataBase",

    ];
    // If any of the utilities links match the current path, open the "Utilities" dropdown
    if (utilitiesLinks.includes(currentPath)) {
      this.setState({
        isOpen: {
          utilities: true,
        },
      });
    }
  };

  componentDidMount() {
    // Check if the dropdown should be open based on the current route
    this.checkIfSectionShouldBeOpen();
  }


  // Function to toggle the dropdown visibility


  render() {
    const { isOpen, isCollapsed } = this.state;

    const currentPath = window.location.pathname;

    return (
      <div>
        <div className="sidebar" id="sidebar">
          {/* Sidebar Logo Section */}
          <div className="sidebar-logo">
            <a href="index.html" className="logo logo-normal">
              <img src="assets/img/logo.svg" alt="Logo" />
            </a>
            <a href="index.html" className="logo-small">
              <img src="assets/img/logo-small.svg" alt="Logo" />
            </a>
            <a href="index.html" className="dark-logo">
              <img src="assets/img/logo-white.svg" alt="Logo" />
            </a>
          </div>

          {/* User Profile Section */}
          <div className="modern-profile p-3 pb-0">
            <div className="text-center rounded bg-light p-3 mb-4 user-profile">
              <div className="avatar avatar-lg online mb-3">
                <img
                  src="assets/img/profiles/avatar-02.jpg"
                  alt="Img"
                  className="img-fluid rounded-circle"
                />
              </div>
              <h6 className="fs-12 fw-normal mb-1">Adrian Herman</h6>
              <p className="fs-10">System Admin</p>
            </div>

            {/* Sidebar Navigation */}
            <div className="sidebar-nav mb-3">
              <ul
                className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified bg-transparent"
                role="tablist"
              >
                <li className="nav-item">
                  <a className="nav-link active border-0" href="#">
                    Menu
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link border-0" href="chat.html">
                    Chats
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link border-0" href="email.html">
                    Inbox
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Main Menu */}
          <div className="sidebar-header p-3 pb-0 pt-2">
            <div className="text-center rounded bg-light p-2 mb-4 sidebar-profile d-flex align-items-center">
              <div className="avatar avatar-md online">
                <img
                  src="assets/img/profiles/avatar-02.jpg"
                  alt="Img"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="text-start sidebar-profile-info ms-2">
                <h6 className="fs-12 fw-normal mb-1">Adrian Herman</h6>
                <p className="fs-10">System Admin</p>
              </div>
            </div>
            <div className="input-group input-group-flat d-inline-flex mb-4">
              <span className="input-icon-addon">
                <i className="ti ti-search" />
              </span>
              <input type="text" className="form-control" placeholder="Search in HRMS" />
              <span className="input-group-text">
                <kbd>CTRL + / </kbd>
              </span>
            </div>
          </div>

          {/* Sidebar Inner Content */}
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>MAIN MENU</span>
                </li>

                {/* Dashboard Menu */}
                <li>
                  <ul>
                    <li className="nav-item" style={{ position: "relative" }}>
                      <Link
                        to="/"
                        className="nav-link sidebar_link"
                        data-bs-toggle="collapse"
                        aria-expanded={isOpen.dashboard}
                        aria-controls="collapseDashboard"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => this.toggleDropdown("dashboard")}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Dashboard" : ""}
                        >
                          <i className="ti ti-smart-home" />

                          <span>Dashboard</span>
                        </div>
                        <i
                          className={`fa fa-angle-right ${isOpen.dashboard ? "rotate-icon" : ""
                            }`}
                          aria-hidden="true"
                        />
                      </Link>

                      <div
                        className={`collapse ${isOpen.dashboard ? "show" : ""}`}
                        id="collapseDashboard"
                      >
                        <ul className="nav d-flex flex-column border-0 ps-4">
                          <li className="nav-item">
                            <Link
                              to="/crm"
                              className={`nav-link sidebar_link ${["/utility1", "/utility2", "/utility3"].includes(
                                window.location.pathname
                              )
                                ? "active"
                                : ""
                                }`}
                            >
                              CRM
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="/utility1"
                              className={`nav-link sidebar_link ${["/utility1", "/utility2", "/utility3"].includes(
                                window.location.pathname
                              )
                                ? "active"
                                : ""
                                }`}
                            >
                              Ecommerce
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>


                    <li className="nav-item" style={{ position: "relative" }}>
                      <Link
                        to="/"
                        className="nav-link sidebar_link"
                        data-bs-toggle="collapse"
                        aria-expanded={isOpen.utilities}
                        aria-controls="collapseUtilities"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => this.toggleDropdown("utilities")}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start", // Align items to the start (left)
                            textAlign: "left", // Ensures text is aligned to the left
                          }}
                          data-bs-toggle="tooltip"
                          title={isOpen.utilities ? "" : "Utilities"}
                        >
                          <i className="fa fa-cogs nav-icon" style={{ marginRight: "10px" }}></i>
                          <span>Utilities</span>
                        </div>
                        <i
                          className={`fa fa-angle-right ${isOpen.utilities ? "rotate-icon" : ""}`}
                          aria-hidden="true"
                        />
                      </Link>

                      <div
                        className={`collapse ${isOpen.utilities ? "show" : ""}`}
                        id="collapseUtilities"
                      >
                        <ul
                          className="nav d-flex flex-column border-0 ps-4"

                        >
                          <li className="nav-item border-bottom">
                            <Link
                              to="/FileUpload"
                              className={` ${["/FileUpload", "/utility2", "/utility3"].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                            >
                              <p className="mb-0">File Upload</p>
                            </Link>
                          </li>
                          <li className="nav-item border-bottom">
                            <Link
                              to="/RegisterNumber"
                              className={` ${["/RegisterNumber", "/utility2", "/utility3"].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                            >
                              <p className="mb-0">Ref Gen</p>
                            </Link>
                          </li>
                          <li className="nav-item border-bottom">
                            <Link
                              to="/DomainSearch"
                              className={` ${["/DomainSearch", "/", "/utility3"].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                            >
                              <p className="mb-0">DOM Check</p>
                            </Link>
                          </li>
                          <li className="nav-item border-bottom">
                            <Link
                              to="/EmailChecker"
                              className={` ${["/EmailChecker", "/utility2", "/utility3"].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                            >
                              <p className="mb-0">Email Checker</p>
                            </Link>
                          </li>
                          <li className="nav-item border-bottom">
                            <Link
                              to="/DataEnrichment"
                              className={` ${["/DataEnrichment", "/utility2", "/utility3"].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                            >
                              <p className="mb-0">Data Enrichment</p>
                            </Link>
                          </li>
                          <li className="nav-item border-bottom">
                            <Link
                              to="/DataBase"
                              className={` ${["/DataBase", "/utility2", "/utility3"].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                            >
                              <p className="mb-0">Data Base</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item" style={{ position: "relative" }}>
                      <Link
                        to="/"
                        className="nav-link sidebar_link"
                        data-bs-toggle="collapse"
                        aria-expanded={isOpen.email}
                        aria-controls="collapseUtilities"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => this.toggleDropdown("email")}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "email" : ""}
                        >
                          <i class="fa fa-mail-bulk"></i>
                          <span>Email Marketing</span>
                        </div>
                        <i
                          className={`fa fa-angle-right ${isOpen.email ? "rotate-icon" : ""
                            }`}
                          aria-hidden="true"
                        />
                      </Link>

                      <div
                        className={`collapse ${isOpen.email ? "show" : ""}`}
                        id="collapseUtilities"
                      >
                        <ul className="nav d-flex flex-column border-0 ps-4">
                          <li className="nav-item">
                            <Link
                              to="/"
                              className={`nav-link sidebar_link ${["/utility1", "/utility2", "/utility3"].includes(
                                window.location.pathname
                              )
                                ? "active"
                                : ""
                                }`}
                            >

                              Email_Campaign
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="/utility1"
                              className={`nav-link sidebar_link ${["/utility1", "/utility2", "/utility3"].includes(
                                window.location.pathname
                              )
                                ? "active"
                                : ""
                                }`}
                            >
                              Mail Box
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    {/* Calls Menu */}
                    <li className="nav-item" style={{ position: "relative" }}>
                      <Link
                        to="/"
                        className="nav-link sidebar_link"
                        data-bs-toggle="collapse"
                        aria-expanded={isOpen.calls}
                        aria-controls="collapseUtilities"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => this.toggleDropdown("calls")}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "calls" : ""}
                        >
                          <i className="fa fa-headset nav-icon"></i> {/* Headset icon (for support or sales) */}
                          <span>Cold Calls</span>
                        </div>
                        <i
                          className={`fa fa-angle-right ${isOpen.calls ? "rotate-icon" : ""
                            }`}
                          aria-hidden="true"
                        />
                      </Link>
                      <div
                        className={`collapse ${isOpen.calls ? "show" : ""}`}
                        id="collapseUtilities"
                      >
                        <ul className="nav d-flex flex-column border-0 ps-4">
                          <li className="nav-item">
                            <Link
                              to="/companyName"
                              className={`nav-link sidebar_link ${["/utility1", "/utility2", "/utility3"].includes(
                                window.location.pathname
                              )
                                ? "active"
                                : ""
                                }`}
                            >
                              Sales Call
                            </Link>
                          </li>

                        </ul>
                      </div>
                    </li>

                    {/* Apps Menu */}
                    <li className="nav-item" style={{ position: "relative" }}>
                      <Link
                        to="/"
                        className="nav-link sidebar_link"
                        data-bs-toggle="collapse"
                        aria-expanded={isOpen.apps}
                        aria-controls="collapseUtilities"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => this.toggleDropdown("apps")}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "apps" : ""}
                        >
                          <i className="fa fa-gamepad nav-icon"></i> {/* Gaming app icon */}
                          <span>Apps</span>
                        </div>
                        <i
                          className={`fa fa-angle-right ${isOpen.apps ? "rotate-icon" : ""
                            }`}
                          aria-hidden="true"
                        />
                      </Link>

                      <div
                        className={`collapse ${isOpen.apps ? "show" : ""}`}
                        id="collapseUtilities"
                      >
                        <ul className="nav d-flex flex-column border-0 ps-4">
                          <li className="nav-item">
                            <Link
                              to="/companyName"
                              className={`nav-link sidebar_link ${["/utility1", "/utility2", "/utility3"].includes(
                                window.location.pathname
                              )
                                ? "active"
                                : ""
                                }`}
                            >
                              Calender
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="/utility1"
                              className={`nav-link sidebar_link ${["/utility1", "/utility2", "/utility3"].includes(
                                window.location.pathname
                              )
                                ? "active"
                                : ""
                                }`}
                            >
                              Chat
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="/utility1"
                              className={`nav-link sidebar_link ${["/utility1", "/utility2", "/utility3"].includes(
                                window.location.pathname
                              )
                                ? "active"
                                : ""
                                }`}
                            >
                              Todo
                            </Link>
                          </li>

                        </ul>
                      </div>
                    </li>

                    {/* Calls Menu */}
                    <li className="nav-item" style={{ position: "relative" }}>
                      <Link
                        to="/"
                        className="nav-link sidebar_link"
                        data-bs-toggle="collapse"
                        aria-expanded={isOpen.setting}
                        aria-controls="collapseUtilities"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => this.toggleDropdown("setting")}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "setting" : ""}
                        >
                          <i className="fa fa-sliders nav-icon"></i>
                          <span>Settings</span>
                        </div>
                        <i
                          className={`fa fa-angle-right ${isOpen.setting ? "rotate-icon" : ""
                            }`}
                          aria-hidden="true"
                        />
                      </Link>

                      <div
                        className={`collapse ${isOpen.setting ? "show" : ""}`}
                        id="collapseUtilities"
                      >
                        <ul className="nav d-flex flex-column border-0 ps-4">
                          <li className="nav-item">
                            <Link
                              to="/companyName"
                              className={`nav-link sidebar_link ${["/utility1", "/utility2", "/utility3"].includes(
                                window.location.pathname
                              )
                                ? "active"
                                : ""
                                }`}
                            >
                              Admin Control
                            </Link>
                          </li>

                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
