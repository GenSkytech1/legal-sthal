"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { all_routes } from "@/data/all_routes";

const CustomPageForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: 1,
    hero_title: "",
    hero_price: "",
    hero_subtitle: "",
    form_title: "",
    also_get: [""],
    how_it_works: [""],
    process_list: [""],
    benefits: [""],
    requirements: [""],
    documents: [""],
    what_you_get: [""],
    fees_cost: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? parseInt(value) : value,
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const newArray = [...(formData as any)[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: string) => {
    setFormData({ ...formData, [field]: [...(formData as any)[field], ""] });
  };

  const removeArrayItem = (index: number, field: string) => {
    const newArray = [...(formData as any)[field]];
    if (newArray.length > 1) {
      newArray.splice(index, 1);
      setFormData({ ...formData, [field]: newArray });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/custom-pages', formData);
      router.push(all_routes.custompages || "/custom-pages");
    } catch (error: any) {
      console.error("Error creating page:", error.response?.data || error.message);
      alert("Error creating page: " + JSON.stringify(error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const renderArrayInputs = (title: string, field: keyof typeof formData) => (
    <div className="card mb-4 shadow-sm">
      <div className="card-header border-bottom">
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="card-body">
        {((formData as any)[field] as string[]).map((item, index) => (
          <div key={index} className="d-flex mb-2 align-items-center">
            <span className="me-2 fw-bold">{index + 1}.</span>
            <input
              type="text"
              className="form-control me-2"
              value={item}
              onChange={(e) => handleArrayChange(e, index, field)}
              placeholder={`Enter item details...`}
            />
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeArrayItem(index, field)}
              disabled={((formData as any)[field] as string[]).length <= 1}
            >
              <i className="ti ti-trash"></i>
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-outline-primary mt-2"
          onClick={() => addArrayItem(field)}
        >
          <i className="ti ti-plus me-1"></i> Add Item
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-header d-flex justify-content-between align-items-center mb-4">
        <h4>Create New Template Content</h4>
        <div>
          <Link href={all_routes.custompages || "/custom-pages"} className="btn btn-secondary btn-sm me-2">
            Go Back
          </Link>
          <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
            {loading ? "Publishing..." : "Save Configured Page"}
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card mb-4 shadow-sm">
            <div className="card-header border-bottom">
              <h5 className="mb-0">Page Navigation</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Menu/Page Title</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. GST Registration" />
              </div>
              <div className="mb-3">
                <label className="form-label">URL Slug</label>
                <div className="input-group">
                  <span className="input-group-text">/</span>
                  <input type="text" className="form-control" name="slug" value={formData.slug} onChange={handleChange} required placeholder="gst-registration" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                  <option value={1}>Active</option>
                  <option value={0}>Hidden</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-header border-bottom">
              <h5 className="mb-0">Left Hero Banner Info</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Main Heading</label>
                <input type="text" className="form-control" name="hero_title" value={formData.hero_title} onChange={handleChange} placeholder="e.g. Register your GST..." />
              </div>
              <div className="mb-3">
                <label className="form-label">Sub Heading</label>
                <input type="text" className="form-control" name="hero_subtitle" value={formData.hero_subtitle} onChange={handleChange} placeholder="Small description" />
              </div>
              <div className="mb-3">
                <label className="form-label">Starting Price</label>
                <input type="text" className="form-control" name="hero_price" value={formData.hero_price} onChange={handleChange} placeholder="₹ 499 + Govt fee" />
              </div>
               <div className="mb-3">
                <label className="form-label">Form Box Title</label>
                <input type="text" className="form-control" name="form_title" value={formData.form_title} onChange={handleChange} placeholder="Get Free Consultation" />
              </div>
            </div>
          </div>

          {renderArrayInputs("Hero 'Also Get' Highlights", "also_get")}
          {renderArrayInputs("How It Works Steps", "how_it_works")}
          {renderArrayInputs("Process Workflow", "process_list")}

        </div>

        <div className="col-lg-6">
          {renderArrayInputs("Top Benefits", "benefits")}
          {renderArrayInputs("Pre-requirements", "requirements")}
          {renderArrayInputs("Required Documents", "documents")}
          {renderArrayInputs("What You Get Delivered", "what_you_get")}
          
          <div className="card mb-4 shadow-sm">
            <div className="card-header border-bottom">
              <h5 className="mb-0">Fees, Costs & Explanations</h5>
            </div>
            <div className="card-body">
              <textarea
                className="form-control"
                name="fees_cost"
                value={formData.fees_cost}
                onChange={handleChange}
                rows={5}
                placeholder="Include any specific package grids or text regarding payment structure... (Accepts basic HTML if rendered properly)"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CustomPageForm;