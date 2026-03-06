"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { all_routes } from "@/data/all_routes";
import api from "@/lib/axios";

interface CustomPage {
  id: number;
  slug: string;
  hero_title: string;
  status: number;
  created_at: string;
}

const CustomPagesList = () => {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await api.get('/custom-pages');
      if (response.data && response.data.data) {
        setPages(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;
    try {
      await api.delete(`/custom-pages/${id}`);
      fetchPages();
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="card-title">Custom Pages</h4>
        <Link href={`${all_routes.custompages}/create`} className="btn btn-primary d-inline-flex align-items-center">
          <i className="ti ti-plus me-1"></i> Add New Page
        </Link>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="thead-light">
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">Loading...</td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">No pages found.</td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page.id}>
                    <td>{page.hero_title}</td>
                    <td>/{page.slug}</td>
                    <td>
                      <span className={`badge bg-${page.status === 1 ? 'success' : 'danger'}`}>
                        {page.status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Link href={`/${page.slug}`} target="_blank" className="btn btn-sm btn-icon btn-outline-info me-2" title="View">
                          <i className="ti ti-eye"></i>
                        </Link>
                        {/* Edit link will go here when implemented */}
                        <button onClick={() => deletePage(page.id)} className="btn btn-sm btn-icon btn-outline-danger" title="Delete">
                          <i className="ti ti-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomPagesList;
