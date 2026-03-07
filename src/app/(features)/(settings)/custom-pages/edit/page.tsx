"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CustomPageForm from "@/components/settings/custompages/form";
import api from "@/lib/axios";

const EditCustomPageContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPageData();
    }
  }, [id]);

  const fetchPageData = async () => {
    try {
      const response = await api.get(`/custom-pages/${id}`);
      if (response.data && response.data.data) {
        setInitialData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="content d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="page-wrapper">
        <div className="content text-center py-5">
          <h4 className="text-danger">Page not found or error loading data</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Edit Page</h4>
              <h6>Modify existing custom landing page</h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <CustomPageForm isEdit initialData={initialData} />
          </div>
        </div>
      </div>
    </div>
  );
};

const EditCustomPage = () => {
  return (
    <Suspense fallback={<div className="page-wrapper"><div className="content text-center py-5">Loading...</div></div>}>
      <EditCustomPageContent />
    </Suspense>
  );
}

export default EditCustomPage;
