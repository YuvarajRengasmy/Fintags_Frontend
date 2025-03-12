import React, { Component } from "react";


class Header extends Component {
  render() {
    return (
      <>
        <div className="header">
          <div className="main-header">
            <div className="header-left">
              <a href="index.html" className="logo">
                <img src="assets/img/logo.svg" alt="Logo" />
              </a>
              <a href="index.html" className="dark-logo">
                <img src="assets/img/logo-white.svg" alt="Logo" />
              </a>
            </div>
            <a id="mobile_btn" className="mobile_btn" href="#sidebar">
              <span className="bar-icon">
                <span />
                <span />
                <span />
              </span>
            </a>
            <div className="header-user">
              <div className="nav user-menu nav-list">
                <div className="me-auto d-flex align-items-center" id="header-search">
                  <a id="toggle_btn" href="javascript:void(0);" className="btn btn-menubar me-1">
                    <i className="ti ti-arrow-bar-to-left" />
                  </a>
                  <div className="input-group input-group-flat d-inline-flex me-1">
                    <span className="input-icon-addon">
                      <i className="ti ti-search" />
                    </span>
                    <input type="text" className="form-control" placeholder="Search in HRMS" />
                  </div>
                  <div className="dropdown crm-dropdown">
                    <a href="#" className="btn btn-menubar me-1" data-bs-toggle="dropdown">
                      <i className="ti ti-layout-grid" />
                    </a>
                    <div className="dropdown-menu dropdown-lg dropdown-menu-start">
                      <div className="card mb-0 border-0 shadow-none">
                        <div className="card-header">
                          <h4>CRM</h4>
                        </div>
                        <div className="card-body pb-1">
                          <div className="row">
                            <div className="col-sm-6">
                              <a href="contacts.html" className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                <span className="d-flex align-items-center me-3">
                                  <i className="ti ti-user-shield text-default me-2" />Contacts
                                </span>
                                <i className="ti ti-arrow-right" />
                              </a>
                              <a href="deals-grid.html" className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                <span className="d-flex align-items-center me-3">
                                  <i className="ti ti-heart-handshake text-default me-2" />Deals
                                </span>
                                <i className="ti ti-arrow-right" />
                              </a>
                              <a href="pipeline.html" className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                <span className="d-flex align-items-center me-3">
                                  <i className="ti ti-timeline-event-text text-default me-2" />Pipeline
                                </span>
                                <i className="ti ti-arrow-right" />
                              </a>
                            </div>
                            <div className="col-sm-6">
                              <a href="companies-grid.html" className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                <span className="d-flex align-items-center me-3">
                                  <i className="ti ti-building text-default me-2" />Companies
                                </span>
                                <i className="ti ti-arrow-right" />
                              </a>
                              <a href="leads-grid.html" className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                <span className="d-flex align-items-center me-3">
                                  <i className="ti ti-user-check text-default me-2" />Leads
                                </span>
                                <i className="ti ti-arrow-right" />
                              </a>
                              <a href="activity.html" className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                <span className="d-flex align-items-center me-3">
                                  <i className="ti ti-activity text-default me-2" />Activities
                                </span>
                                <i className="ti ti-arrow-right" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="profile-settings.html" className="btn btn-menubar">
                    <i className="ti ti-settings-cog" />
                  </a>
                </div>
                <div className="sidebar sidebar-horizontal" id="horizontal-single">
                  <div className="sidebar-menu">
                    <div className="main-menu">
                      <ul className="nav-menu">
                        <li className="menu-title">
                          <span>Main</span>
                        </li>
                        <li className="submenu">
                          <a href="#" className>
                            <i className="ti ti-smart-home" /><span>Dashboard</span>
                            <span className="menu-arrow" />
                          </a>
                          <ul>
                            <li><a href="index.html" className>Admin Dashboard</a></li>
                            <li><a href="employee-dashboard.html" className>Employee Dashboard</a></li>
                            <li><a href="deals-dashboard.html" className>Deals Dashboard</a></li>
                            <li><a href="leads-dashboard.html" className>Leads Dashboard</a></li>
                          </ul>
                        </li>
                        <li className="submenu">
                          <a href="#" className>
                            <i className="ti ti-user-star" /><span>Super Admin</span>
                            <span className="menu-arrow" />
                          </a>
                          <ul>
                            <li><a href="dashboard.html" className>Dashboard</a></li>
                            <li><a href="companies.html" className>Companies</a></li>
                            <li><a href="subscription.html" className>Subscriptions</a></li>
                            <li><a href="packages.html" className>Packages</a></li>
                            <li><a href="domain.html" className>Domain</a></li>
                            <li><a href="purchase-transaction.html" className>Purchase Transaction</a></li>
                          </ul>
                        </li>
                        <li className="submenu">
                          <a href="#" className>
                            <i className="ti ti-layout-grid-add" /><span>Applications</span>
                            <span className="menu-arrow" />
                          </a>
                          <ul>
                            <li><a href="chat.html" className>Chat</a></li>
                            <li className="submenu submenu-two">
                              <a href="#" className>Calls<span className="menu-arrow inside-submenu" /></a>
                              <ul>
                                <li><a href="voice-call.html" className>Voice Call</a></li>
                                <li><a href="video-call.html" className>Video Call</a></li>
                                <li><a href="outgoing-call.html" className>Outgoing Call</a></li>
                                <li><a href="incoming-call.html" className>Incoming Call</a></li>
                                <li><a href="call-history.html" className>Call History</a></li>
                              </ul>
                            </li>
                            <li><a href="calendar.html" className>Calendar</a></li>
                            <li><a href="email.html" className>Email</a></li>
                            <li><a href="todo.html" className>To Do</a></li>
                            <li><a href="notes.html" className>Notes</a></li>
                            <li><a href="file-manager.html" className>File Manager</a></li>
                            <li><a href="kanban-view.html" className>Kanban</a></li>
                            <li><a href="invoices.html" className>Invoices</a></li>
                          </ul>
                        </li>
                        <li className="submenu">
                          <a href="#" className>
                            <i className="ti ti-layout-board-split" /><span>Layouts</span>
                            <span className="menu-arrow" />
                          </a>
                          <ul>
                            <li>
                              <a href="layout-horizontal.html" className>
                                <span>Horizontal</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-detached.html" className>
                                <span>Detached</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-modern.html" className>
                                <span>Modern</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-two-column.html" className>
                                <span>Two Column </span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-hovered.html" className>
                                <span>Hovered</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-box.html" className>
                                <span>Boxed</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-horizontal-single.html" className>
                                <span>Horizontal Single</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-horizontal-overlay.html" className>
                                <span>Horizontal Overlay</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-horizontal-box.html" className>
                                <span>Horizontal Box</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-horizontal-sidemenu.html" className>
                                <span>Menu Aside</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-vertical-transparent.html" className>
                                <span>Transparent</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-without-header.html" className>
                                <span>Without Header</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-rtl.html" className>
                                <span>RTL</span>
                              </a>
                            </li>
                            <li>
                              <a href="layout-dark.html" className>
                                <span>Dark</span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="submenu">
                          <a href="#" className="active">
                            <i className="ti ti-user-star" /><span>Projects</span>
                            <span className="menu-arrow" />
                          </a>
                          <ul>
                            <li className>
                              <a href="clients-grid.html"><span>Clients</span>
                              </a>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className><span>Projects</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="projects-grid.html" className>Projects</a></li>
                                <li><a href="tasks.html" className>Tasks</a></li>
                                <li><a href="task-board.html" className>Task Board</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="#" className="active ">Crm<span className="menu-arrow" /></a>
                              <ul>
                                <li><a href="contacts-grid.html" className="active"><span>Contacts</span></a></li>
                                <li><a href="companies-grid.html" className><span>Companies</span></a></li>
                                <li><a href="deals-grid.html" className><span>Deals</span></a></li>
                                <li><a href="leads-grid.html" className><span>Leads</span></a></li>
                                <li><a href="pipeline.html" className><span>Pipeline</span></a></li>
                                <li><a href="analytics.html" className><span>Analytics</span></a></li>
                                <li><a href="activity.html" className><span>Activities</span></a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className><span>Employees</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="employees.html" className>Employee Lists</a></li>
                                <li><a href="employees-grid.html" className>Employee Grid</a></li>
                                <li><a href="employee-details.html" className>Employee Details</a></li>
                                <li><a href="departments.html" className>Departments</a></li>
                                <li><a href="designations.html" className>Designations</a></li>
                                <li><a href="policy.html" className>Policies</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className><span>Tickets</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="tickets.html" className>Tickets</a></li>
                                <li><a href="ticket-details.html" className>Ticket Details</a></li>
                              </ul>
                            </li>
                            <li className>
                              <a href="holidays.html"><span>Holidays</span></a>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className>
                                <span>Attendance</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    Leaves<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="leaves.html" className>Leaves (Admin)</a></li>
                                    <li><a href="leaves-employee.html" className>Leave (Employee)</a></li>
                                    <li><a href="leave-settings.html" className>Leave Settings</a></li>
                                  </ul>
                                </li>
                                <li><a href="attendance-admin.html" className>Attendance (Admin)</a></li>
                                <li><a href="attendance-employee.html" className>Attendance (Employee)</a></li>
                                <li><a href="timesheets.html" className>Timesheets</a></li>
                                <li><a href="schedule-timing.html" className>Shift &amp; Schedule</a></li>
                                <li><a href="overtime.html" className>Overtime</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className>
                                <span>Performance</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="performance-indicator.html" className>Performance Indicator</a></li>
                                <li><a href="performance-review.html" className>Performance Review</a></li>
                                <li><a href="performance-appraisal.html" className>Performance Appraisal</a></li>
                                <li><a href="goal-tracking.html" className>Goal List</a></li>
                                <li><a href="goal-type.html" className>Goal Type</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className><span>Training</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="training.html" className>Training List</a></li>
                                <li><a href="trainers.html" className>Trainers</a></li>
                                <li><a href="training-type.html" className>Training Type</a></li>
                              </ul>
                            </li>
                            <li><a href="promotion.html" className><span>Promotion</span></a></li>
                            <li><a href="resignation.html" className><span>Resignation</span></a></li>
                            <li><a href="termination.html" className><span>Termination</span></a></li>
                          </ul>
                        </li>
                        <li className="submenu">
                          <a href="#" className>
                            <i className="ti ti-user-star" /><span>Administration</span>
                            <span className="menu-arrow" />
                          </a>
                          <ul>
                            <li className="submenu">
                              <a href="javascript:void(0);" className><span>Sales</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="estimates.html" className>Estimates</a></li>
                                <li><a href="invoices.html" className>Invoices</a></li>
                                <li><a href="payments.html" className>Payments</a></li>
                                <li><a href="expenses.html" className>Expenses</a></li>
                                <li><a href="provident-fund.html" className>Provident Fund</a></li>
                                <li><a href="taxes.html" className>Taxes</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className>
                                <span>Accounting</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="categories.html" className>Categories</a></li>
                                <li><a href="budgets.html" className>Budgets</a></li>
                                <li><a href="budget-expenses.html" className>Budget Expenses</a></li>
                                <li><a href="budget-revenues.html" className>Budget Revenues</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className>
                                <span>Payroll</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="employee-salary.html" className>Employee Salary</a></li>
                                <li><a href="payslip.html" className>Payslip</a></li>
                                <li><a href="payroll.html" className>Payroll Items</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className>
                                <span>Assets</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="asset.html" className>Assets</a></li>
                                <li><a href="asset-categories.html" className>Asset Categories</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className>
                                <span>Help &amp; Supports</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="knowledgebase.html" className>Knowledge Base</a></li>
                                <li><a href="activity.html">Activities</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className>
                                <span>User Management</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="users.html" className>Users</a></li>
                                <li><a href="roles-permissions.html" className>Roles &amp; Permissions</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className>
                                <span>Reports</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li><a href="expenses-report.html" className>Expense Report</a></li>
                                <li><a href="invoice-report.html" className>Invoice Report</a></li>
                                <li><a href="payment-report.html" className>Payment Report</a></li>
                                <li><a href="project-report.html" className>Project Report</a></li>
                                <li><a href="task-report.html" className>Task Report</a></li>
                                <li><a href="user-report.html" className>User Report</a></li>
                                <li><a href="employee-report.html" className>Employee Report</a></li>
                                <li><a href="payslip-report.html" className>Payslip Report</a></li>
                                <li><a href="attendance-report.html" className>Attendance Report</a></li>
                                <li><a href="leave-report.html" className>Leave Report</a></li>
                                <li><a href="daily-report.html" className>Daily Report</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="javascript:void(0);" className>
                                <span>Settings</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    General Settings<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="profile-settings.html" className>Profile</a></li>
                                    <li><a href="security-settings.html" className>Security</a></li>
                                    <li><a href="notification-settings.html" className>Notifications</a></li>
                                    <li><a href="connected-apps.html" className>Connected Apps</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    Website Settings<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="bussiness-settings.html" className>Business Settings</a></li>
                                    <li><a href="seo-settings.html" className>SEO Settings</a></li>
                                    <li><a href="localization-settings.html" className>Localization</a></li>
                                    <li><a href="prefixes.html" className>Prefixes</a></li>
                                    <li><a href="preferences.html" className>Preferences</a></li>
                                    <li><a href="appearance.html" className>Appearance</a></li>
                                    <li><a href="language.html" className>Language</a></li>
                                    <li><a href="authentication-settings.html" className>Authentication</a></li>
                                    <li><a href="ai-settings.html" className>AI Settings</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    App Settings<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="salary-settings.html" className>Salary Settings</a></li>
                                    <li><a href="approval-settings.html" className>Approval Settings</a></li>
                                    <li><a href="invoice-settings.html" className>Invoice Settings</a></li>
                                    <li><a href="leave-type.html" className>Leave Type</a></li>
                                    <li><a href="custom-fields.html" className>Custom Fields</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    System Settings<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="email-settings.html" className>Email Settings</a></li>
                                    <li><a href="email-template.html" className>Email Templates</a></li>
                                    <li><a href="sms-settings.html" className>SMS Settings</a></li>
                                    <li><a href="sms-template.html" className>SMS Templates</a></li>
                                    <li><a href="otp-settings.html" className>OTP</a></li>
                                    <li><a href="gdpr.html" className>GDPR Cookies</a></li>
                                    <li><a href="maintenance-mode.html" className>Maintenance Mode</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    Financial Settings<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="payment-gateways.html" className>Payment Gateways</a></li>
                                    <li><a href="tax-rates.html" className>Tax Rate</a></li>
                                    <li><a href="currencies.html" className>Currencies</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    Other Settings<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="custom-css.html" className>Custom CSS</a></li>
                                    <li><a href="custom-js.html" className>Custom JS</a></li>
                                    <li><a href="cronjob.html" className>Cronjob</a></li>
                                    <li><a href="storage-settings.html" className>Storage</a></li>
                                    <li><a href="ban-ip-address.html" className>Ban IP Address</a></li>
                                    <li><a href="backup.html" className>Backup</a></li>
                                    <li><a href="clear-cache.html" className>Clear Cache</a></li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="submenu">
                          <a href="#" className>
                            <i className="ti ti-page-break" /><span>Pages</span>
                            <span className="menu-arrow" />
                          </a>
                          <ul>
                            <li><a href="starter.html" className><span>Starter</span></a></li>
                            <li><a href="profile.html" className><span>Profile</span></a></li>
                            <li><a href="gallery.html" className><span>Gallery</span></a></li>
                            <li><a href="search-result.html" className><span>Search Results</span></a></li>
                            <li><a href="timeline.html" className><span>Timeline</span></a></li>
                            <li><a href="pricing.html" className><span>Pricing</span></a></li>
                            <li><a href="coming-soon.html" className><span>Coming Soon</span></a></li>
                            <li><a href="under-maintenance.html" className><span>Under Maintenance</span></a></li>
                            <li><a href="under-construction.html" className><span>Under Construction</span></a></li>
                            <li><a href="https://nodejs.dreamstechnologies.com/error-404" className><span>API Keys</span></a></li>
                            <li><a href="privacy-policy.html" className><span>Privacy Policy</span></a></li>
                            <li><a href="terms-condition.html" className><span>Terms &amp; Conditions</span></a></li>
                            <li className="submenu">
                              <a href="#" className>
                                <span>Content</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li className><a href="pages.html">Pages</a></li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    Blogs<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="blogs.html" className>All Blogs</a></li>
                                    <li><a href="blog-categories.html" className>Categories</a></li>
                                    <li><a href="blog-comments.html" className>Comments</a></li>
                                    <li><a href="blog-tags.html" className>Tags</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    Locations<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="countries.html" className>Countries</a></li>
                                    <li><a href="states.html" className>States</a></li>
                                    <li><a href="cities.html" className>Cities</a></li>
                                  </ul>
                                </li>
                                <li className><a href="testimonials.html">Testimonials</a></li>
                                <li className><a href="faq.html">FAQ’S</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="#">
                                <span>Authentication</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>Login<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="login.html">Cover</a></li>
                                    <li><a href="login-2.html">Illustration</a></li>
                                    <li><a href="login-3.html">Basic</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>Register<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="register.html">Cover</a></li>
                                    <li><a href="register-2.html">Illustration</a></li>
                                    <li><a href="register-3.html">Basic</a></li>
                                  </ul>
                                </li>
                                <li className="submenu"><a href="javascript:void(0);">Forgot Password<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="forgot-password.html">Cover</a></li>
                                    <li><a href="forgot-password-2.html">Illustration</a></li>
                                    <li><a href="forgot-password-3.html">Basic</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);">Reset Password<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="reset-password.html">Cover</a></li>
                                    <li><a href="reset-password-2.html">Illustration</a></li>
                                    <li><a href="reset-password-3.html">Basic</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);">Email Verification<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="email-verification.html">Cover</a></li>
                                    <li><a href="email-verification-2.html">Illustration</a></li>
                                    <li><a href="email-verification-3.html">Basic</a></li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);">2 Step Verification<span className="menu-arrow" /></a>
                                  <ul>
                                    <li><a href="two-step-verification.html">Cover</a></li>
                                    <li><a href="two-step-verification-2.html">Illustration</a></li>
                                    <li><a href="two-step-verification-3.html">Basic</a></li>
                                  </ul>
                                </li>
                                <li><a href="lock-screen.html">Lock Screen</a></li>
                                <li><a href="error-404.html">404 Error</a></li>
                                <li><a href="error-500.html">500 Error</a></li>
                              </ul>
                            </li>
                            <li className="submenu">
                              <a href="#" className>
                                <span>UI Interface</span>
                                <span className="menu-arrow" />
                              </a>
                              <ul>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    <i className="ti ti-hierarchy-2" />
                                    <span>Base UI</span>
                                    <span className="menu-arrow" />
                                  </a>
                                  <ul>
                                    <li>
                                      <a href="ui-alerts.html" className>Alerts</a>
                                    </li>
                                    <li>
                                      <a href="ui-accordion.html" className>Accordion</a>
                                    </li>
                                    <li>
                                      <a href="ui-avatar.html" className>Avatar</a>
                                    </li>
                                    <li>
                                      <a href="ui-badges.html" className>Badges</a>
                                    </li>
                                    <li>
                                      <a href="ui-borders.html" className>Border</a>
                                    </li>
                                    <li>
                                      <a href="ui-buttons.html" className>Buttons</a>
                                    </li>
                                    <li>
                                      <a href="ui-buttons-group.html" className>Button Group</a>
                                    </li>
                                    <li>
                                      <a href="ui-breadcrumb.html" className>Breadcrumb</a>
                                    </li>
                                    <li>
                                      <a href="ui-cards.html" className>Card</a>
                                    </li>
                                    <li>
                                      <a href="ui-carousel.html" className>Carousel</a>
                                    </li>
                                    <li>
                                      <a href="ui-colors.html" className>Colors</a>
                                    </li>
                                    <li>
                                      <a href="ui-dropdowns.html" className>Dropdowns</a>
                                    </li>
                                    <li>
                                      <a href="ui-grid.html" className>Grid</a>
                                    </li>
                                    <li>
                                      <a href="ui-images.html" className>Images</a>
                                    </li>
                                    <li>
                                      <a href="ui-lightbox.html" className>Lightbox</a>
                                    </li>
                                    <li>
                                      <a href="ui-media.html" className>Media</a>
                                    </li>
                                    <li>
                                      <a href="ui-modals.html" className>Modals</a>
                                    </li>
                                    <li>
                                      <a href="ui-offcanvas.html" className>Offcanvas</a>
                                    </li>
                                    <li>
                                      <a href="ui-pagination.html" className>Pagination</a>
                                    </li>
                                    <li>
                                      <a href="ui-popovers.html" className>Popovers</a>
                                    </li>
                                    <li>
                                      <a href="ui-progress.html" className>Progress</a>
                                    </li>
                                    <li>
                                      <a href="ui-placeholders.html" className>Placeholders</a>
                                    </li>
                                    <li>
                                      <a href="ui-spinner.html" className>Spinner</a>
                                    </li>
                                    <li>
                                      <a href="ui-sweetalerts.html" className>Sweet Alerts</a>
                                    </li>
                                    <li>
                                      <a href="ui-nav-tabs.html" className>Tabs</a>
                                    </li>
                                    <li>
                                      <a href="ui-toasts.html" className>Toasts</a>
                                    </li>
                                    <li>
                                      <a href="ui-tooltips.html" className>Tooltips</a>
                                    </li>
                                    <li>
                                      <a href="ui-typography.html" className>Typography</a>
                                    </li>
                                    <li>
                                      <a href="ui-video.html" className>Video</a>
                                    </li>
                                    <li>
                                      <a href="ui-sortable.html" className>Sortable</a>
                                    </li>
                                    <li>
                                      <a href="ui-swiperjs.html" className>Swiperjs</a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    <i className="ti ti-hierarchy-3" />
                                    <span>Advanced UI</span>
                                    <span className="menu-arrow" />
                                  </a>
                                  <ul>
                                    <li>
                                      <a href="ui-ribbon.html" className>Ribbon</a>
                                    </li>
                                    <li>
                                      <a href="ui-clipboard.html" className>Clipboard</a>
                                    </li>
                                    <li>
                                      <a href="ui-drag-drop.html" className>Drag &amp; Drop</a>
                                    </li>
                                    <li>
                                      <a href="ui-rangeslider.html" className>Range Slider</a>
                                    </li>
                                    <li>
                                      <a href="ui-rating.html" className>Rating</a>
                                    </li>
                                    <li>
                                      <a href="ui-text-editor.html" className>Text Editor</a>
                                    </li>
                                    <li>
                                      <a href="ui-counter.html" className>Counter</a>
                                    </li>
                                    <li>
                                      <a href="ui-scrollbar.html" className>Scrollbar</a>
                                    </li>
                                    <li>
                                      <a href="ui-stickynote.html" className>Sticky Note</a>
                                    </li>
                                    <li>
                                      <a href="ui-timeline.html" className>Timeline</a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    <i className="ti ti-input-search" />
                                    <span>Forms</span>
                                    <span className="menu-arrow" />
                                  </a>
                                  <ul>
                                    <li className="submenu submenu-two">
                                      <a href="javascript:void(0);" className>
                                        Form Elements <span className="menu-arrow inside-submenu" />
                                      </a>
                                      <ul>
                                        <li>
                                          <a href="form-basic-inputs.html" className>Basic Inputs</a>
                                        </li>
                                        <li>
                                          <a href="form-checkbox-radios.html" className>Checkbox &amp; Radios</a>
                                        </li>
                                        <li>
                                          <a href="form-input-groups.html" className>Input Groups</a>
                                        </li>
                                        <li>
                                          <a href="form-grid-gutters.html" className>Grid &amp; Gutters</a>
                                        </li>
                                        <li>
                                          <a href="form-select.html" className>Form Select</a>
                                        </li>
                                        <li>
                                          <a href="form-mask.html" className>Input Masks</a>
                                        </li>
                                        <li>
                                          <a href="form-fileupload.html" className>File Uploads</a>
                                        </li>
                                      </ul>
                                    </li>
                                    <li className="submenu submenu-two">
                                      <a href="javascript:void(0);" className>
                                        Layouts <span className="menu-arrow inside-submenu" />
                                      </a>
                                      <ul>
                                        <li>
                                          <a href="form-horizontal.html" className>Horizontal Form</a>
                                        </li>
                                        <li>
                                          <a href="form-vertical.html" className>Vertical Form</a>
                                        </li>
                                        <li>
                                          <a href="form-floating-labels.html" className>Floating Labels</a>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <a href="form-validation.html" className>Form Validation</a>
                                    </li>
                                    <li>
                                      <a href="form-select2.html" className>Select2</a>
                                    </li>
                                    <li>
                                      <a href="form-wizard.html" className>Form Wizard</a>
                                    </li>
                                    <li>
                                      <a href="form-pickers.html" className>Form Pickers</a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    <i className="ti ti-table-plus" />
                                    <span>Tables</span>
                                    <span className="menu-arrow" />
                                  </a>
                                  <ul>
                                    <li>
                                      <a href="tables-basic.html" className>Basic Tables </a>
                                    </li>
                                    <li>
                                      <a href="data-tables.html" className>Data Table </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    <i className="ti ti-chart-line" />
                                    <span>Charts</span>
                                    <span className="menu-arrow" />
                                  </a>
                                  <ul>
                                    <li>
                                      <a href="chart-apex.html" className>Apex Charts</a>
                                    </li>
                                    <li>
                                      <a href="chart-c3.html" className>Chart C3</a>
                                    </li>
                                    <li>
                                      <a href="chart-js.html" className>Chart Js</a>
                                    </li>
                                    <li>
                                      <a href="chart-morris.html" className>Morris Charts</a>
                                    </li>
                                    <li>
                                      <a href="chart-flot.html" className>Flot Charts</a>
                                    </li>
                                    <li>
                                      <a href="chart-peity.html" className>Peity Charts</a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    <i className="ti ti-icons" />
                                    <span>Icons</span>
                                    <span className="menu-arrow" />
                                  </a>
                                  <ul>
                                    <li>
                                      <a href="icon-fontawesome.html" className>Fontawesome Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-tabler.html" className>Tabler Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-bootstrap.html" className>Bootstrap Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-remix.html" className>Remix Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-feather.html" className>Feather Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-ionic.html" className>Ionic Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-material.html" className>Material Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-pe7.html" className>Pe7 Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-simpleline.html" className>Simpleline Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-themify.html" className>Themify Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-weather.html" className>Weather Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-typicon.html" className>Typicon Icons</a>
                                    </li>
                                    <li>
                                      <a href="icon-flag.html" className>Flag Icons</a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="submenu">
                                  <a href="javascript:void(0);" className>
                                    <i className="ti ti-table-plus" />
                                    <span>Maps</span>
                                    <span className="menu-arrow" />
                                  </a>
                                  <ul>
                                    <li>
                                      <a href="maps-vector.html" className>Vector</a>
                                    </li>
                                    <li>
                                      <a href="maps-leaflet.html" className>Leaflet</a>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Change Log</a></li>
                            <li className="submenu">
                              <a href="javascript:void(0);"><span>Multi Level</span><span className="menu-arrow" /></a>
                              <ul>
                                <li><a href="javascript:void(0);">Multilevel 1</a></li>
                                <li className="submenu submenu-two">
                                  <a href="javascript:void(0);">Multilevel 2<span className="menu-arrow inside-submenu" /></a>
                                  <ul>
                                    <li><a href="javascript:void(0);">Multilevel 2.1</a></li>
                                    <li className="submenu submenu-two submenu-three">
                                      <a href="javascript:void(0);">Multilevel 2.2<span className="menu-arrow inside-submenu inside-submenu-two" /></a>
                                      <ul>
                                        <li><a href="javascript:void(0);">Multilevel 2.2.1</a></li>
                                        <li><a href="javascript:void(0);">Multilevel 2.2.2</a></li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                                <li><a href="javascript:void(0);">Multilevel 3</a></li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-1">
                    <a href="#" className="btn btn-menubar btnFullscreen">
                      <i className="ti ti-maximize" />
                    </a>
                  </div>
                  <div className="dropdown me-1">
                    <a href="#" className="btn btn-menubar" data-bs-toggle="dropdown">
                      <i className="ti ti-layout-grid-remove" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <div className="card mb-0 border-0 shadow-none">
                        <div className="card-header">
                          <h4>Applications</h4>
                        </div>
                        <div className="card-body">
                          <a href="calendar.html" className="d-block pb-2">
                            <span className="avatar avatar-md bg-transparent-dark me-2"><i className="ti ti-calendar text-gray-9" /></span>Calendar
                          </a>
                          <a href="todo.html" className="d-block py-2">
                            <span className="avatar avatar-md bg-transparent-dark me-2"><i className="ti ti-subtask text-gray-9" /></span>To Do
                          </a>
                          <a href="notes.html" className="d-block py-2">
                            <span className="avatar avatar-md bg-transparent-dark me-2"><i className="ti ti-notes text-gray-9" /></span>Notes
                          </a>
                          <a href="file-manager.html" className="d-block py-2">
                            <span className="avatar avatar-md bg-transparent-dark me-2"><i className="ti ti-folder text-gray-9" /></span>File Manager
                          </a>
                          <a href="kanban-view.html" className="d-block py-2">
                            <span className="avatar avatar-md bg-transparent-dark me-2"><i className="ti ti-layout-kanban text-gray-9" /></span>Kanban
                          </a>
                          <a href="invoices.html" className="d-block py-2 pb-0">
                            <span className="avatar avatar-md bg-transparent-dark me-2"><i className="ti ti-file-invoice text-gray-9" /></span>Invoices
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="me-1">
                    <a href="chat.html" className="btn btn-menubar position-relative">
                      <i className="ti ti-brand-hipchat" />
                      <span className="badge bg-info rounded-pill d-flex align-items-center justify-content-center header-badge">5</span>
                    </a>
                  </div>
                  <div className="me-1">
                    <a href="email.html" className="btn btn-menubar">
                      <i className="ti ti-mail" />
                    </a>
                  </div>
                  <div className="me-1 notification_item">
                    <a href="#" className="btn btn-menubar position-relative me-1" id="notification_popup" data-bs-toggle="dropdown">
                      <i className="ti ti-bell" />
                      <span className="notification-status-dot" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end notification-dropdown p-4">
                      <div className="d-flex align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
                        <h4 className="notification-title">Notifications (2)</h4>
                        <div className="d-flex align-items-center">
                          <a href="#" className="text-primary fs-15 me-3 lh-1">Mark all as read</a>
                          <div className="dropdown">
                            <a href="javascript:void(0);" className="bg-white dropdown-toggle" data-bs-toggle="dropdown">
                              <i className="ti ti-calendar-due me-1" />Today
                            </a>
                            <ul className="dropdown-menu mt-2 p-3">
                              <li>
                                <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                  This Week
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                  Last Week
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                  Last Month
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="noti-content">
                        <div className="d-flex flex-column">
                          <div className="border-bottom mb-3 pb-3">
                            <a href="activity.html">
                              <div className="d-flex">
                                <span className="avatar avatar-lg me-2 flex-shrink-0">
                                  <img src="assets/img/profiles/avatar-27.jpg" alt="Profile" />
                                </span>
                                <div className="flex-grow-1">
                                  <p className="mb-1"><span className="text-dark fw-semibold">Shawn</span>
                                    performance in Math is below the threshold.</p>
                                  <span>Just Now</span>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="border-bottom mb-3 pb-3">
                            <a href="activity.html" className="pb-0">
                              <div className="d-flex">
                                <span className="avatar avatar-lg me-2 flex-shrink-0">
                                  <img src="assets/img/profiles/avatar-23.jpg" alt="Profile" />
                                </span>
                                <div className="flex-grow-1">
                                  <p className="mb-1"><span className="text-dark fw-semibold">Sylvia</span> added
                                    appointment on 02:00 PM</p>
                                  <span>10 mins ago</span>
                                  <div className="d-flex justify-content-start align-items-center mt-1">
                                    <span className="btn btn-light btn-sm me-2">Deny</span>
                                    <span className="btn btn-primary btn-sm">Approve</span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="border-bottom mb-3 pb-3">
                            <a href="activity.html">
                              <div className="d-flex">
                                <span className="avatar avatar-lg me-2 flex-shrink-0">
                                  <img src="assets/img/profiles/avatar-25.jpg" alt="Profile" />
                                </span>
                                <div className="flex-grow-1">
                                  <p className="mb-1">New student record <span className="text-dark fw-semibold"> George</span> is created by <span className="text-dark fw-semibold">Teressa</span></p>
                                  <span>2 hrs ago</span>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="border-0 mb-3 pb-0">
                            <a href="activity.html">
                              <div className="d-flex">
                                <span className="avatar avatar-lg me-2 flex-shrink-0">
                                  <img src="assets/img/profiles/avatar-01.jpg" alt="Profile" />
                                </span>
                                <div className="flex-grow-1">
                                  <p className="mb-1">A new teacher record for <span className="text-dark fw-semibold">Elisa</span> </p>
                                  <span>09:45 AM</span>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex p-0">
                        <a href="#" className="btn btn-light w-100 me-2">Cancel</a>
                        <a href="activity.html" className="btn btn-primary w-100">View All</a>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown profile-dropdown">
                    <a href="javascript:void(0);" className="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
                      <span className="avatar avatar-sm online">
                        <img src="assets/img/profiles/avatar-12.jpg" alt="Img" className="img-fluid rounded-circle" />
                      </span>
                    </a>
                    <div className="dropdown-menu shadow-none">
                      <div className="card mb-0">
                        <div className="card-header">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-lg me-2 avatar-rounded">
                              <img src="assets/img/profiles/avatar-12.jpg" alt="img" />
                            </span>
                            <div>
                              <h5 className="mb-0">Kevin Larry</h5>
                              <p className="fs-12 fw-medium mb-0">warren@example.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="profile.html">
                            <i className="ti ti-user-circle me-1" />My Profile
                          </a>
                          <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="bussiness-settings.html">
                            <i className="ti ti-settings me-1" />Settings
                          </a>
                          <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="security-settings.html">
                            <i className="ti ti-status-change me-1" />Status
                          </a>
                          <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="profile-settings.html">
                            <i className="ti ti-circle-arrow-up me-1" />My Account
                          </a>
                          <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="knowledgebase.html">
                            <i className="ti ti-question-mark me-1" />Knowledge Base
                          </a>
                        </div>
                        <div className="card-footer">
                          <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="login.html">
                            <i className="ti ti-login me-2" />Logout
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown mobile-user-menu">
              <a href="javascript:void(0);" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
              <div className="dropdown-menu dropdown-menu-end">
                <a className="dropdown-item" href="#">My Profile</a>
                <a className="dropdown-item" href="#">Settings</a>
                <a className="dropdown-item" href="/">Logout</a>
              </div>
            </div>
          </div>
        </div>

      </>
    );
  }
}

export default Header;


