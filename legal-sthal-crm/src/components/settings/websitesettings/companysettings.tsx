"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react'
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import SettingsSideBar from '../settingssidebar'
import Select from 'react-select';
import RefreshIcon from '@/core/common/tooltip-content/refresh';
import CollapesIcon from '@/core/common/tooltip-content/collapes';
import Link from 'next/link';
import { Country, State, City } from 'country-state-city';
import CommonFooter from '@/core/common/footer/commonFooter';

export default function CompanySettingsComponent () {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [formData, setFormData] = useState({
        company_name: '',
        company_email: '',
        phone_number: '',
        fax: '',
        website: '',
        address: '',
        postal_code: '',
        country: null,
        state: null,
        city: null
    });

    const [files, setFiles] = useState({
        company_icon: null,
        favicon: null,
        company_logo: null,
        company_dark_logo: null
    });

    const [preview, setPreview] = useState({
        company_icon: null,
        favicon: null,
        company_logo: null,
        company_dark_logo: null
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/company-settings');
                if (response.data?.data) {
                    const d = response.data.data;
                    setFormData({
                        company_name: d.company_name || '',
                        company_email: d.company_email || '',
                        phone_number: d.phone_number || '',
                        fax: d.fax || '',
                        website: d.website || '',
                        address: d.address || '',
                        postal_code: d.postal_code || '',
                        country: d.country ? { label: Country.getCountryByCode(d.country)?.name || d.country, value: d.country } : null,
                        state: d.state && d.country ? { label: State.getStateByCodeAndCountry(d.state, d.country)?.name || d.state, value: d.state } : null,
                        city: d.city && d.state && d.country ? { label: d.city, value: d.city } : null
                    });
                    
                    const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace('/api', '');
                    setPreview({
                        company_icon: d.company_icon ? BASE_URL + d.company_icon : null,
                        favicon: d.favicon ? BASE_URL + d.favicon : null,
                        company_logo: d.company_logo ? BASE_URL + d.company_logo : null,
                        company_dark_logo: d.company_dark_logo ? BASE_URL + d.company_dark_logo : null
                    });
                }
            } catch (error) {
                console.error('Error fetching settings', error);
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name, selectedOption) => {
        if (name === 'country') {
            setFormData({ ...formData, country: selectedOption, state: null, city: null });
        } else if (name === 'state') {
            setFormData({ ...formData, state: selectedOption, city: null });
        } else {
            setFormData({ ...formData, [name]: selectedOption });
        }
    };

    const handleFileChange = (e, name) => {
        const file = e.target.files[0];
        if (file) {
            setFiles({ ...files, [name]: file });
            setPreview({ ...preview, [name]: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                const val = formData[key];
                if (val && typeof val === 'object' && val.value) {
                    data.append(key, val.value);
                } else {
                    data.append(key, val || '');
                }
            });
            Object.keys(files).forEach(key => {
                if (files[key]) {
                    data.append(key, files[key]);
                }
            });

            const response = await api.post('/company-settings', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Company settings saved successfully');
        } catch (error) {
            console.error('Error saving settings', error);
            toast.error('Failed to save settings');
        }
    };



    return (
        <div>
            <div className="page-wrapper">
                <div className="content settings-content">
                    <div className="page-header settings-pg-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Settings</h4>
                                <h6>Manage your settings on portal</h6>
                            </div>
                        </div>
                        <ul className="table-top-head">
                           <RefreshIcon/>
                           <CollapesIcon/>

                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="settings-wrapper d-flex">
                                <SettingsSideBar />
                                <div className="card flex-fill mb-0">
                                    <div className="card-header">
                                        <h4 className="fs-18 fw-bold">Company Settings</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="border-bottom mb-3">
                                                <div className="card-title-head">
                                                    <h6 className="fs-16 fw-bold mb-2">
                                                        <span className="fs-16 me-2">
                                                            <i className="ti ti-building" />
                                                        </span>
                                                        Company Information
                                                    </h6>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-6 col-md-4">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Company Name <span className="text-danger">*</span></label><input type="text" className="form-control" name="company_name" value={formData.company_name} onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-4">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Company Email Address <span className="text-danger">*</span></label><input type="email" className="form-control" name="company_email" value={formData.company_email} onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Phone Number <span className="text-danger">*</span></label><input type="text" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Fax <span className="text-danger">*</span></label><input type="text" className="form-control" name="fax" value={formData.fax} onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Website <span className="text-danger">*</span></label><input type="text" className="form-control" name="website" value={formData.website} onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-bottom mb-3 pb-3">
                                                <div className="card-title-head">
                                                    <h6 className="fs-16 fw-bold mb-2">
                                                        <span className="fs-16 me-2">
                                                            <i className="ti ti-photo" />
                                                        </span>
                                                        Company Images
                                                    </h6>
                                                </div>
                                                <div className="row align-items-center gy-3">
                                                    <div className="col-xl-9">
                                                        <div className="row gy-3 align-items-center">
                                                            <div className="col-lg-4">
                                                                <div className="logo-info">
                                                                    <h6 className="fw-medium">Company Icon</h6>
                                                                    <p>Upload Icon of your Company</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-8">
                                                                <div className="profile-pic-upload mb-0 justify-content-lg-end">
                                                                    <div className="new-employee-field">
                                                                        <div className="mb-0">
                                                                            <div className="image-upload mb-0">
                                                                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "company_icon")} />
                                                                                <div className="image-uploads">
                                                                                    <h4>
                                                                                        <i className="ti ti-upload me-1" />
                                                                                        Upload Image
                                                                                    </h4>
                                                                                </div>
                                                                            </div>
                                                                            <span className="mt-1">
                                                                                Recommended size is 450px x 450px. Max size 5mb.
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <div className="new-logo ms-xl-auto">
                                                            <Link href="#">
                                                                <img src={preview.company_icon || "assets/img/logo-small.png"} alt="Logo" />
                                                                <span>
                                                                    <i className="ti ti-x" />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-9">
                                                        <div className="row gy-3 align-items-center">
                                                            <div className="col-lg-4">
                                                                <div className="logo-info">
                                                                    <h6 className="fw-medium">Favicon</h6>
                                                                    <p>Upload Favicon of your Company</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-8">
                                                                <div className="profile-pic-upload mb-0 justify-content-lg-end">
                                                                    <div className="new-employee-field">
                                                                        <div className="mb-0">
                                                                            <div className="image-upload mb-0">
                                                                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "favicon")} />
                                                                                <div className="image-uploads">
                                                                                    <h4>
                                                                                        <i className="ti ti-upload me-1" />
                                                                                        Upload Image
                                                                                    </h4>
                                                                                </div>
                                                                            </div>
                                                                            <span className="mt-1">
                                                                                Recommended size is 450px x 450px. Max size 5mb.
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <div className="new-logo ms-xl-auto">
                                                            <Link href="#">
                                                                <img src={preview.favicon || "assets/img/logo-small.png"} alt="Logo" />
                                                                <span>
                                                                    <i className="ti ti-x" />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-9">
                                                        <div className="row gy-3 align-items-center">
                                                            <div className="col-lg-4">
                                                                <div className="logo-info">
                                                                    <h6 className="fw-medium">Company Logo</h6>
                                                                    <p>Upload Logo of your Company</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-8">
                                                                <div className="profile-pic-upload mb-0 justify-content-lg-end">
                                                                    <div className="new-employee-field">
                                                                        <div className="mb-0">
                                                                            <div className="image-upload mb-0">
                                                                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "company_logo")} />
                                                                                <div className="image-uploads">
                                                                                    <h4>
                                                                                        <i className="ti ti-upload me-1" />
                                                                                        Upload Image
                                                                                    </h4>
                                                                                </div>
                                                                            </div>
                                                                            <span className="mt-1">
                                                                                Recommended size is 450px x 450px. Max size 5mb.
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <div className="new-logo ms-xl-auto">
                                                            <Link href="#">
                                                                <img src={preview.company_logo || "assets/img/products/company-logo.svg"} alt="Logo" />
                                                                <span>
                                                                    <i className="ti ti-x" />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-9">
                                                        <div className="row gy-3 align-items-center">
                                                            <div className="col-lg-4">
                                                                <div className="logo-info">
                                                                    <h6 className="fw-medium">Company Dark Logo</h6>
                                                                    <p>Upload Logo of your Company</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-8">
                                                                <div className="profile-pic-upload mb-0 justify-content-lg-end">
                                                                    <div className="new-employee-field">
                                                                        <div className="mb-0">
                                                                            <div className="image-upload mb-0">
                                                                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "company_dark_logo")} />
                                                                                <div className="image-uploads">
                                                                                    <h4>
                                                                                        <i className="ti ti-upload me-1" />
                                                                                        Upload Image
                                                                                    </h4>
                                                                                </div>
                                                                            </div>
                                                                            <span className="mt-1">
                                                                                Recommended size is 450px x 450px. Max size 5mb.
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <div className="new-logo ms-xl-auto">
                                                            <Link href="#" className="bg-secondary">
                                                                <img src={preview.company_dark_logo || "assets/img/products/white-logo.svg"} alt="Logo" />
                                                                <span>
                                                                    <i className="ti ti-x" />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="company-address">
                                                <div className="card-title-head">
                                                    <h6 className="fs-16 fw-bold mb-2">
                                                        <span className="fs-16 me-2">
                                                            <i className="ti ti-map-pin" />
                                                        </span>
                                                        Address Information
                                                    </h6>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Address <span className="text-danger">*</span></label><input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Country <span className="text-danger">*</span>
                                                            </label>
                                                            {mounted && <Select classNamePrefix="react-select" options={Country.getAllCountries().map(c => ({ label: c.name, value: c.isoCode }))} placeholder="Choose Country" value={formData.country} onChange={(val) => handleSelectChange('country', val)} />}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                State <span className="text-danger">*</span>
                                                            </label>
                                                            {mounted && <Select classNamePrefix="react-select" options={formData.country ? State.getStatesOfCountry(formData.country.value).map(s => ({ label: s.name, value: s.isoCode })) : []} placeholder="Choose State" value={formData.state} onChange={(val) => handleSelectChange('state', val)} />}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                City <span className="text-danger">*</span>
                                                            </label>
                                                            {mounted && <Select classNamePrefix="react-select" options={formData.country && formData.state ? City.getCitiesOfState(formData.country.value, formData.state.value).map(c => ({ label: c.name, value: c.name })) : []} placeholder="Choose City" value={formData.city} onChange={(val) => handleSelectChange('city', val)} />}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Postal Code <span className="text-danger">*</span></label><input type="text" className="form-control" name="postal_code" value={formData.postal_code} onChange={handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-end settings-bottom-btn mt-0">
                                                <button type="button" className="btn btn-secondary me-2">
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <CommonFooter />
            </div>

        </div>
    )
}

