"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import SettingsSideBar from '../settingssidebar';
import CommonFooter from '@/core/common/footer/commonFooter';

export default function LandingPageSettingsComponent() {
    const [loading, setLoading] = useState(false);
    
    // Simple state mapping
    const [formData, setFormData] = useState({
        hero_title: '',
        hero_subtitle: '',
        footer_about: '',
        footer_phone: '',
        footer_email: '',
        footer_address: ''
    });

    const [headerNav, setHeaderNav] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    
    // New Sections
    const [whyChoose, setWhyChoose] = useState<any[]>([]);
    const [trustedPartners, setTrustedPartners] = useState<any[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);

    const [files, setFiles] = useState<{header_logo: File | null; hero_image: File | null; why_choose_image: File | null}>({
        header_logo: null,
        hero_image: null,
        why_choose_image: null
    });

    const [preview, setPreview] = useState<{header_logo: string | null; hero_image: string | null; why_choose_image: string | null}>({
        header_logo: null,
        hero_image: null,
        why_choose_image: null
    });

    // Store testimonial files separately by index
    const [testimonialFiles, setTestimonialFiles] = useState<{ [key: number]: File }>({});
    const [testimonialPreviews, setTestimonialPreviews] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/website-content');
                if (response.data?.data) {
                    const d = response.data.data;
                    const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace('/api', '');

                    setFormData({
                        hero_title: d.hero_title || '',
                        hero_subtitle: d.hero_subtitle || '',
                        footer_about: d.footer_about || '',
                        footer_phone: d.footer_phone || '',
                        footer_email: d.footer_email || '',
                        footer_address: d.footer_address || ''
                    });
                    
                    setHeaderNav(d.header_nav || []);
                    setServices(d.our_services || []);
                    
                    setWhyChoose(d.why_choose_us || []);
                    setTrustedPartners(d.trusted_partners || []);
                    setTestimonials(d.testimonials || []);

                    setPreview({
                        header_logo: d.header_logo ? BASE_URL + d.header_logo : null,
                        hero_image: d.hero_image ? BASE_URL + d.hero_image : null,
                        why_choose_image: d.why_choose_image ? BASE_URL + d.why_choose_image : null
                    });
                }
            } catch (error) {
                console.error('Error fetching settings', error);
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: any, name: string) => {
        const file = e.target.files[0];
        if (file) {
            setFiles({ ...files, [name]: file });
            setPreview({ ...preview, [name]: URL.createObjectURL(file) } as any);
        }
    };

    const handleTestimonialFileChange = (e: any, index: number) => {
        const file = e.target.files[0];
        if (file) {
            setTestimonialFiles(prev => ({ ...prev, [index]: file }));
            setTestimonialPreviews(prev => ({ ...prev, [index]: URL.createObjectURL(file) }));
        }
    };

    const addNav = () => setHeaderNav([...headerNav, { label: '', link: '', subNav: [] }]);
    const updateNav = (index: number, field: string, value: string) => {
        const newNav = [...headerNav];
        newNav[index][field] = value;
        setHeaderNav(newNav);
    };
    const removeNav = (index: number) => setHeaderNav(headerNav.filter((_, i) => i !== index));

    const addSubNav = (navIndex: number) => {
        const newNav = [...headerNav];
        if (!newNav[navIndex].subNav) newNav[navIndex].subNav = [];
        newNav[navIndex].subNav.push({ label: '', link: '' });
        setHeaderNav(newNav);
    };
    const updateSubNav = (navIndex: number, subIndex: number, field: string, value: string) => {
        const newNav = [...headerNav];
        newNav[navIndex].subNav[subIndex][field] = value;
        setHeaderNav(newNav);
    };
    const removeSubNav = (navIndex: number, subIndex: number) => {
        const newNav = [...headerNav];
        newNav[navIndex].subNav = newNav[navIndex].subNav.filter((_: any, i: number) => i !== subIndex);
        setHeaderNav(newNav);
    };

    const addService = () => setServices([...services, { title: '', description: '' }]);
    const updateService = (index: number, field: string, value: string) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };
    const removeService = (index: number) => setServices(services.filter((_, i) => i !== index));

    // Why Choose Methods
    const addWhyChoose = () => setWhyChoose([...whyChoose, { point: '' }]);
    const updateWhyChoose = (index: number, value: string) => {
        const newWhyChoose = [...whyChoose];
        newWhyChoose[index].point = value;
        setWhyChoose(newWhyChoose);
    };
    const removeWhyChoose = (index: number) => setWhyChoose(whyChoose.filter((_, i) => i !== index));

    // Trusted Partners Methods
    const addPartner = () => setTrustedPartners([...trustedPartners, { name: '' }]);
    const updatePartner = (index: number, value: string) => {
        const newPartners = [...trustedPartners];
        newPartners[index].name = value;
        setTrustedPartners(newPartners);
    };
    const removePartner = (index: number) => setTrustedPartners(trustedPartners.filter((_, i) => i !== index));

    // Testimonials Methods
    const addTestimonial = () => setTestimonials([...testimonials, { quote: '', author: '', role: '' }]);
    const updateTestimonial = (index: number, field: string, value: string) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index][field] = value;
        setTestimonials(newTestimonials);
    };
    const removeTestimonial = (index: number) => {
        setTestimonials(testimonials.filter((_, i) => i !== index));
        
        // Cleanup files state to keep indices in sync
        const newFiles: any = {};
        Object.keys(testimonialFiles).forEach((key: any) => {
            const k = parseInt(key);
            if (k < index) newFiles[k] = testimonialFiles[k];
            else if (k > index) newFiles[k - 1] = testimonialFiles[k];
        });
        setTestimonialFiles(newFiles);

        const newPreviews: any = {};
        Object.keys(testimonialPreviews).forEach((key: any) => {
            const k = parseInt(key);
            if (k < index) newPreviews[k] = testimonialPreviews[k];
            else if (k > index) newPreviews[k - 1] = testimonialPreviews[k];
        });
        setTestimonialPreviews(newPreviews);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            
            Object.keys(formData).forEach((key: any) => {
                data.append(key, (formData as any)[key] || '');
            });
            
            if (files.header_logo) data.append('header_logo', files.header_logo);
            if (files.hero_image) data.append('hero_image', files.hero_image);
            if (files.why_choose_image) data.append('why_choose_image', files.why_choose_image);

            Object.keys(testimonialFiles).forEach((index: any) => {
                data.append(`testimonial_image_${index}`, testimonialFiles[index]);
            });
            
            data.append('header_nav', JSON.stringify(headerNav));
            data.append('our_services', JSON.stringify(services));
            data.append('why_choose_us', JSON.stringify(whyChoose));
            data.append('trusted_partners', JSON.stringify(trustedPartners));
            data.append('testimonials', JSON.stringify(testimonials));

            await api.post('/website-content', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Landing page settings saved successfully');
        } catch (error) {
            console.error('Error saving settings', error);
            toast.error('Failed to save settings');
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="page-wrapper">
                <div className="content settings-content">
                    <div className="page-header settings-pg-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Landing Page CMS</h4>
                                <h6>Manage your external landing page content</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="settings-wrapper d-flex">
                                <SettingsSideBar />
                                <div className="card flex-fill mb-0">
                                    <div className="card-header">
                                        <h4 className="fs-18 fw-bold">Website Content Configuration</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            
                                            {/* Logo & Hero */}
                                            <div className="border-bottom mb-4">
                                                <h6 className="fs-16 fw-bold mb-3">Hero Section & Branding</h6>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Header Logo</label>
                                                        <input type="file" className="form-control" accept="image/*" onChange={(e) => handleFileChange(e, "header_logo")} />
                                                        {preview.header_logo && <img src={preview.header_logo} alt="Logo preview" className="mt-2 rounded" style={{maxHeight:'50px'}} />}
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Hero Background Image</label>
                                                        <input type="file" className="form-control" accept="image/*" onChange={(e) => handleFileChange(e, "hero_image")} />
                                                        {preview.hero_image && <img src={preview.hero_image} alt="Hero preview" className="mt-2 rounded" style={{maxHeight:'50px'}} />}
                                                    </div>
                                                    <div className="col-md-12 mb-3">
                                                        <label className="form-label">Hero Title</label>
                                                        <input type="text" className="form-control" name="hero_title" value={formData.hero_title} onChange={handleInputChange} placeholder="e.g. Legal Sthal - Your Trusted Partner" />
                                                    </div>
                                                    <div className="col-md-12 mb-3">
                                                        <label className="form-label">Hero Subtitle</label>
                                                        <textarea className="form-control" name="hero_subtitle" rows={3} value={formData.hero_subtitle} onChange={handleInputChange} placeholder="Legal Sthal combines legal expertise..." />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Navigation */}
                                            <div className="border-bottom mb-4">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="fs-16 fw-bold mb-0">Header Navigation Menu</h6>
                                                    <button type="button" className="btn btn-sm btn-primary" onClick={addNav}>+ Add Menu Link</button>
                                                </div>
                                                {headerNav.map((nav: any, index: number) => (
                                                    <div key={index} className="p-3 mb-3 border rounded">
                                                        <div className="row align-items-center mb-2">
                                                            <div className="col-5">
                                                                <input type="text" className="form-control fw-bold" placeholder="Main Link Label (e.g. Protect Business)" value={nav.label} onChange={(e) => updateNav(index, 'label', e.target.value)} />
                                                            </div>
                                                            <div className="col-5">
                                                                <input type="text" className="form-control" placeholder="Link (Optional, if it has sub-menu)" value={nav.link} onChange={(e) => updateNav(index, 'link', e.target.value)} />
                                                            </div>
                                                            <div className="col-2 text-end">
                                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => removeNav(index)}>Remove</button>
                                                            </div>
                                                        </div>

                                                        {/* Sub Nav Section */}
                                                        <div className="ms-4 mt-2 ps-3 border-start">
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                <small className="text-muted fw-bold">Sub-navigation Links</small>
                                                                <button type="button" className="btn btn-sm btn-outline-secondary py-0" onClick={() => addSubNav(index)}>+ Add Sub Link</button>
                                                            </div>
                                                            {(nav.subNav || []).map((sub: any, subIndex: number) => (
                                                                <div key={subIndex} className="row align-items-center mb-2">
                                                                    <div className="col-5">
                                                                        <input type="text" className="form-control form-control-sm" placeholder="Sub Label (e.g. Private Limited)" value={sub.label} onChange={(e) => updateSubNav(index, subIndex, 'label', e.target.value)} />
                                                                    </div>
                                                                    <div className="col-5">
                                                                        <input type="text" className="form-control form-control-sm" placeholder="URL (e.g. #private-ltd)" value={sub.link} onChange={(e) => updateSubNav(index, subIndex, 'link', e.target.value)} />
                                                                    </div>
                                                                    <div className="col-2 text-end">
                                                                        <i className="feather-trash-2 text-danger" style={{cursor: 'pointer'}} onClick={() => removeSubNav(index, subIndex)}></i>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                                {headerNav.length === 0 && <p className="text-muted small">No navigation links added yet.</p>}
                                            </div>

                                            {/* Services */}
                                            <div className="border-bottom mb-4 pb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="fs-16 fw-bold mb-0">Our Services</h6>
                                                    <button type="button" className="btn btn-sm btn-primary" onClick={addService}>+ Add Service Card</button>
                                                </div>
                                                {services.map((svc: any, index: number) => (
                                                    <div key={index} className="row mb-3 p-3 border rounded bg-light">
                                                        <div className="col-12 mb-2">
                                                            <input type="text" className="form-control fw-bold" placeholder="Service Title (e.g. Startup Registration)" value={svc.title} onChange={(e) => updateService(index, 'title', e.target.value)} />
                                                        </div>
                                                        <div className="col-12 mb-2">
                                                            <textarea className="form-control" placeholder="Service Description..." rows={2} value={svc.description} onChange={(e) => updateService(index, 'description', e.target.value)} />
                                                        </div>
                                                        <div className="col-12 text-end">
                                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeService(index)}>Remove</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Why Choose Us */}
                                            <div className="border-bottom mb-4 pb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="fs-16 fw-bold mb-0">Why Choose Legal Sthal?</h6>
                                                    <button type="button" className="btn btn-sm btn-primary" onClick={addWhyChoose}>+ Add Point</button>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Why Choose Section Image</label>
                                                    <input type="file" className="form-control" accept="image/*" onChange={(e) => handleFileChange(e, "why_choose_image")} />
                                                    {preview.why_choose_image && <img src={preview.why_choose_image} alt="Preview" className="mt-2 rounded" style={{maxHeight:'80px'}} />}
                                                </div>

                                                {whyChoose.map((item: any, index: number) => (
                                                    <div key={index} className="d-flex mb-2 align-items-center">
                                                        <span className="me-2 fw-bold">{index + 1}.</span>
                                                        <input type="text" className="form-control me-2" placeholder="e.g. 100% Online Process..." value={item.point} onChange={(e) => updateWhyChoose(index, e.target.value)} />
                                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeWhyChoose(index)}>
                                                            <i className="ti ti-trash"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Trusted Partners */}
                                            <div className="border-bottom mb-4 pb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="fs-16 fw-bold mb-0">Trusted Partners</h6>
                                                    <button type="button" className="btn btn-sm btn-primary" onClick={addPartner}>+ Add Partner</button>
                                                </div>
                                                <div className="row">
                                                    {trustedPartners.map((partner: any, index: number) => (
                                                        <div key={index} className="col-md-4 mb-2 d-flex align-items-center">
                                                            <input type="text" className="form-control me-2" placeholder="e.g. ICICI Bank" value={partner.name} onChange={(e) => updatePartner(index, e.target.value)} />
                                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removePartner(index)}>
                                                                <i className="ti ti-trash"></i>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Testimonials */}
                                            <div className="border-bottom mb-4 pb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="fs-16 fw-bold mb-0">Client Testimonials</h6>
                                                    <button type="button" className="btn btn-sm btn-primary" onClick={addTestimonial}>+ Add Testimonial</button>
                                                </div>
                                                {testimonials.map((testi: any, index: number) => {
                                                     const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace('/api', '');
                                                     const displayImage = testimonialPreviews[index] || (testi.image ? BASE_URL + testi.image : null);
                                                     
                                                     return (
                                                    <div key={index} className="row mb-3 p-3 border rounded bg-light">
                                                        <div className="col-12 mb-2">
                                                            <div className="d-flex align-items-center">
                                                                <div className="me-3">
                                                                    {displayImage ? (
                                                                        <img src={displayImage} alt="Profile" className="rounded-circle" style={{width: '60px', height: '60px', objectFit: 'cover'}} />
                                                                    ) : (
                                                                        <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white" style={{width: '60px', height: '60px'}}>
                                                                            <i className="ti ti-user fs-4"></i>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <label className="form-label small mb-1">Profile Picture</label>
                                                                    <input type="file" className="form-control form-control-sm" accept="image/*" onChange={(e) => handleTestimonialFileChange(e, index)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <input type="text" className="form-control fw-bold" placeholder="Client Name (e.g. Vikram Patel)" value={testi.author} onChange={(e) => updateTestimonial(index, 'author', e.target.value)} />
                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <input type="text" className="form-control" placeholder="Company / Role (e.g. Founder, FinEdge)" value={testi.role} onChange={(e) => updateTestimonial(index, 'role', e.target.value)} />
                                                        </div>
                                                        <div className="col-12 mb-2">
                                                            <textarea className="form-control" placeholder="Client Quote..." rows={2} value={testi.quote} onChange={(e) => updateTestimonial(index, 'quote', e.target.value)} />
                                                        </div>
                                                        <div className="col-12 text-end">
                                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeTestimonial(index)}>Remove</button>
                                                        </div>
                                                    </div>
                                                )})}
                                            </div>

                                            {/* Footer */}
                                            <div className="border-bottom mb-4 pb-4">
                                                <h6 className="fs-16 fw-bold mb-3">Footer Information</h6>
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <label className="form-label">Footer About Details</label>
                                                        <textarea className="form-control" name="footer_about" rows={2} value={formData.footer_about} onChange={handleInputChange} />
                                                    </div>
                                                    <div className="col-md-4 mb-3">
                                                        <label className="form-label">Contact Phone</label>
                                                        <input type="text" className="form-control" name="footer_phone" value={formData.footer_phone} onChange={handleInputChange} />
                                                    </div>
                                                    <div className="col-md-4 mb-3">
                                                        <label className="form-label">Contact Email</label>
                                                        <input type="text" className="form-control" name="footer_email" value={formData.footer_email} onChange={handleInputChange} />
                                                    </div>
                                                    <div className="col-md-4 mb-3">
                                                        <label className="form-label">Address</label>
                                                        <input type="text" className="form-control" name="footer_address" value={formData.footer_address} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-end settings-bottom-btn mt-0">
                                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                                    {loading ? 'Saving...' : 'Save Settings'}
                                                </button>
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
    );
}
