"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
// mock data for online leads (10 entries)
const mockLeads = [
  {
    LeadID: "L-1001",
    Name: "John Doe",
    Mobile: "+1 555-0123",
    Email: "john.doe@example.com",
    Source: "Website",
    CampaignName: "Spring Promo",
    DateTime: "2026-01-31T10:15:00Z",
    Status: "New",
    AssignedTo: "Alice",
    Remarks: "Requested callback",
  },
  {
    LeadID: "L-1002",
    Name: "Maria Gomez",
    Mobile: "+44 7700 900123",
    Email: "maria.gomez@example.co.uk",
    Source: "Facebook",
    CampaignName: "Holiday Campaign",
    DateTime: "2026-02-10T14:30:00Z",
    Status: "Contacted",
    AssignedTo: "Bob",
    Remarks: "Interested in pricing",
  },
  {
    LeadID: "L-1003",
    Name: "Rahul Singh",
    Mobile: "+91 98765 43210",
    Email: "rahul.singh@example.in",
    Source: "Google Ads",
    CampaignName: "Search Ads",
    DateTime: "2026-02-20T09:00:00Z",
    Status: "Qualified",
    AssignedTo: "Clara",
    Remarks: "Follow up next week",
  },
  {
    LeadID: "L-1004",
    Name: "Sofia Rossi",
    Mobile: "+39 340 1234567",
    Email: "sofia.rossi@example.it",
    Source: "Email",
    CampaignName: "Newsletter",
    DateTime: "2026-02-25T16:45:00Z",
    Status: "New",
    AssignedTo: "Alice",
    Remarks: "Requested demo",
  },
  {
    LeadID: "L-1005",
    Name: "Liam Brown",
    Mobile: "+61 412 345 678",
    Email: "liam.brown@example.au",
    Source: "LinkedIn",
    CampaignName: "B2B Outreach",
    DateTime: "2026-02-28T11:20:00Z",
    Status: "Contacted",
    AssignedTo: "Bob",
    Remarks: "Send proposal",
  },
  {
    LeadID: "L-1006",
    Name: "Chen Wei",
    Mobile: "+86 139 0000 0000",
    Email: "chen.wei@example.cn",
    Source: "Referral",
    CampaignName: "Partner Referral",
    DateTime: "2026-02-15T08:00:00Z",
    Status: "Qualified",
    AssignedTo: "Clara",
    Remarks: "High priority",
  },
  {
    LeadID: "L-1007",
    Name: "Fatima Al Hadi",
    Mobile: "+971 50 123 4567",
    Email: "fatima.hadi@example.ae",
    Source: "Instagram",
    CampaignName: "Influencer Campaign",
    DateTime: "2026-01-20T13:10:00Z",
    Status: "New",
    AssignedTo: "Alice",
    Remarks: "Prefers evening calls",
  },
  {
    LeadID: "L-1008",
    Name: "Carlos Mendez",
    Mobile: "+52 1 55 1234 5678",
    Email: "carlos.mendez@example.mx",
    Source: "Website",
    CampaignName: "SEO Campaign",
    DateTime: "2026-02-01T09:45:00Z",
    Status: "Contacted",
    AssignedTo: "Diana",
    Remarks: "Requested case studies",
  },
  {
    LeadID: "L-1009",
    Name: "Anna Kuznetsova",
    Mobile: "+7 916 123 4567",
    Email: "anna.k@example.ru",
    Source: "Yandex Ads",
    CampaignName: "Local Ads",
    DateTime: "2026-02-05T12:00:00Z",
    Status: "Qualified",
    AssignedTo: "Clara",
    Remarks: "Budget confirmed",
  },
  {
    LeadID: "L-1010",
    Name: "David Kim",
    Mobile: "+82 10 1234 5678",
    Email: "david.kim@example.kr",
    Source: "Email",
    CampaignName: "Re-engagement",
    DateTime: "2026-02-26T15:30:00Z",
    Status: "New",
    AssignedTo: "Bob",
    Remarks: "Needs demo",
  },
];
import  Table  from "@/core/common/pagination/datatable";
import Link from "next/link";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import { Calendar, PlusCircle } from "react-feather";
import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });


export default function IncomeListComponent () {
  const dataSource = mockLeads;

  const columns = [
    {
      title: "Lead ID (Auto)",
      dataIndex: "LeadID",
      sorter: (a: any, b: any) => (a.LeadID || "").toString().localeCompare((b.LeadID || "").toString()),
    },
    {
      title: "Name",
      dataIndex: "Name",
      sorter: (a: any, b: any) => (a.Name || "").toString().localeCompare((b.Name || "").toString()),
    },
    {
      title: "Mobile",
      dataIndex: "Mobile",
      sorter: (a: any, b: any) => (a.Mobile || "").toString().localeCompare((b.Mobile || "").toString()),
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a: any, b: any) => (a.Email || "").toString().localeCompare((b.Email || "").toString()),
    },
    {
      title: "Source",
      dataIndex: "Source",
      sorter: (a: any, b: any) => (a.Source || "").toString().localeCompare((b.Source || "").toString()),
    },
    {
      title: "Campaign Name",
      dataIndex: "CampaignName",
      sorter: (a: any, b: any) => (a.CampaignName || "").toString().localeCompare((b.CampaignName || "").toString()),
    },
    {
      title: "Date & Time",
      dataIndex: "DateTime",
      sorter: (a: any, b: any) => new Date(a.DateTime || 0).getTime() - new Date(b.DateTime || 0).getTime(),
    },
    {
      title: "Status",
      dataIndex: "Status",
      sorter: (a: any, b: any) => (a.Status || "").toString().localeCompare((b.Status || "").toString()),
    },
    {
      title: "Assigned To",
      dataIndex: "AssignedTo",
      sorter: (a: any, b: any) => (a.AssignedTo || "").toString().localeCompare((b.AssignedTo || "").toString()),
    },
    {
      title: "Remarks",
      dataIndex: "Remarks",
      sorter: (a: any, b: any) => (a.Remarks || "").toString().localeCompare((b.Remarks || "").toString()),
    },


    // {
    //   title: "",
    //   dataIndex: "actions",
    //   key: "actions",
    //   className: "action-table-data",
    //   render: () => (
    //     <div className="edit-delete-action">
    //       <Link
    //         href="#"
    //         className="me-2 p-2 mb-0"
    //         data-bs-toggle="modal"
    //         data-bs-target="#edit-units"
    //       >
    //         <i data-feather="edit" className="feather-edit" />
    //       </Link>
    //       <Link
    //         data-bs-toggle="modal"
    //         data-bs-target="#delete-modal"
    //         className="me-0 p-2 mb-0"
    //         href="#"
    //       >
    //         <i data-feather="trash-2" className="feather-trash-2" />
    //       </Link>
    //     </div>


    //   ),
    // },
  ];

  const SourceOptions = [
    { label: "Website", value: "website" },
    { label: "Facebook", value: "facebook" },
    { label: "Google Ads", value: "google" },
    { label: "Referral", value: "referral" },
  ];
  const CampaignOptions = [
    { label: "Spring Promo", value: "spring" },
    { label: "Holiday Campaign", value: "holiday" },
    { label: "B2B Outreach", value: "b2b" },
    { label: "Re-engagement", value: "reengage" },
  ];
  const StatusOptions = [
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Qualified", value: "qualified" },
    { label: "Lost", value: "lost" },
  ];
  const AssignedOptions = [
    { label: "Alice", value: "alice" },
    { label: "Bob", value: "bob" },
    { label: "Clara", value: "clara" },
    { label: "Diana", value: "diana" },
  ];
  return (
    <>
      <div className="page-wrapper">
        <div className="content" style={{ marginTop: -65 }}>
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Online Leads</h4>
                <h6>Manage your Leads</h6>
              </div>
            </div>
            <ul className="table-top-head">

              <TooltipIcons />
              <RefreshIcon />
              <CollapesIcon />
            </ul>
            {/* <div className="page-btn">
              <Link href="#" data-bs-toggle="modal" data-bs-target="#add-units" className="btn btn-primary">
                <PlusCircle data-feather="plus-circle" className=" me-2" />
                Add Leads
              </Link>
            </div> */}
          </div>

          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="search-set">
              </div>
              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="dropdown me-2">
                  <div className="input-groupicon calender-input balance-sheet-date">
                    <Calendar />
                    <PredefinedDateRanges />
                  </div>
                </div>
                {/* <div className="dropdown">
                  <a
                    href="javascript:void(0);"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Select Source
                  </a>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item rounded-1">
                        Distribution center
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item rounded-1">
                        Intelligent warehouse
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item rounded-1">
                        Mahin Logistics
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item rounded-1">
                        Allcargo Logistics
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="card-body pb-0">
              <div className=" table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>

          {/* /product list */}

        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2025 © Legal Sthal. All Right Reserved</p>
          <p>
            Designed &amp; Developed By
            <Link href="#" className="text-primary">
              Gen SkyTech
            </Link>
          </p>
        </div>
      </div>
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title">
                    <h4>Add Lead</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Name<span className="text-danger ms-1">*</span></label>
                        <input type="text" className="form-control" placeholder="Full name" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Mobile<span className="text-danger ms-1">*</span></label>
                        <input type="text" className="form-control" placeholder="Mobile number" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Email address" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Source</label>
                        <Select classNamePrefix="react-select" options={SourceOptions} placeholder="Choose source" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Campaign</label>
                        <Select classNamePrefix="react-select" options={CampaignOptions} placeholder="Choose campaign" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Date & Time</label>
                        <input type="datetime-local" className="form-control" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Status</label>
                        <Select classNamePrefix="react-select" options={StatusOptions} placeholder="Choose status" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Assigned To</label>
                        <Select classNamePrefix="react-select" options={AssignedOptions} placeholder="Assign to" />
                      </div>
                      <div className="col-lg-12">
                        <div className="summer-description-box">
                          <label className="form-label">Remarks</label>
                          <textarea className="form-control" rows={3} placeholder="Add remarks" />
                          <p className="mt-1">Maximum 250 characters</p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" data-bs-dismiss="modal" className="btn btn-primary fs-13 fw-medium p-2 px-3">Add Lead</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title">
                    <h4>Edit Lead</h4>
                  </div>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Name<span className="text-danger ms-1">*</span></label>
                        <input type="text" className="form-control" placeholder="Full name" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Mobile<span className="text-danger ms-1">*</span></label>
                        <input type="text" className="form-control" placeholder="Mobile number" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Email address" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Source</label>
                        <Select classNamePrefix="react-select" options={SourceOptions} placeholder="Choose source" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Campaign</label>
                        <Select classNamePrefix="react-select" options={CampaignOptions} placeholder="Choose campaign" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Date & Time</label>
                        <input type="datetime-local" className="form-control" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Status</label>
                        <Select classNamePrefix="react-select" options={StatusOptions} placeholder="Choose status" />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="form-label">Assigned To</label>
                        <Select classNamePrefix="react-select" options={AssignedOptions} placeholder="Assign to" />
                      </div>
                      <div className="col-lg-12">
                        <div className="summer-description-box">
                          <label className="form-label">Remarks</label>
                          <textarea className="form-control" rows={3} placeholder="Add remarks" />
                          <p className="mt-1">Maximum 250 characters</p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" data-bs-dismiss="modal" className="btn btn-primary fs-13 fw-medium p-2 px-3">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Income</h4>
                <p className="mb-0 fs-16">
                  Are you sure you want to delete income?
                </p>
                <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button" data-bs-dismiss="modal"
                    className="btn btn-primary fs-13 fw-medium p-2 px-3"
                  >
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

