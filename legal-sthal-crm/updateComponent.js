const fs = require('fs');
const path = 'src/components/settings/websitesettings/companysettings.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports
content = content.replace(
    "import React from 'react'",
    "import React, { useState, useEffect } from 'react'\nimport api from '@/lib/axios';\nimport { toast } from 'react-toastify';"
);

// 2. Add state and data fetching to CompanySettingsComponent
const stateAndFetch = `
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
                const response = await api.get('/api/company-settings');
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
                        country: Country.find(c => c.value === d.country) || null,
                        state: State.find(s => s.value === d.state) || null,
                        city: City.find(c => c.value === d.city) || null
                    });
                    
                    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
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
        setFormData({ ...formData, [name]: selectedOption });
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

            const response = await api.post('/api/company-settings', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Company settings saved successfully');
        } catch (error) {
            console.error('Error saving settings', error);
            toast.error('Failed to save settings');
        }
    };
`;

content = content.replace(
    /export default function CompanySettingsComponent \(\) \{/,
    "export default function CompanySettingsComponent () {\n" + stateAndFetch
);

// 3. Update the form tag
content = content.replace(/<form>/, "<form onSubmit={handleSubmit}>");

// 4. Update inputs
content = content.replace(
    /Company Name <span className="text-danger">\*<\/span>\s*<\/label>\s*<input type="text" className="form-control" \/>/g,
    'Company Name <span className="text-danger">*</span></label><input type="text" className="form-control" name="company_name" value={formData.company_name} onChange={handleInputChange} />'
);

content = content.replace(
    /Company Email Address <span className="text-danger">\*<\/span>\s*<\/label>\s*<input type="email" className="form-control" \/>/g,
    'Company Email Address <span className="text-danger">*</span></label><input type="email" className="form-control" name="company_email" value={formData.company_email} onChange={handleInputChange} />'
);

content = content.replace(
    /Phone Number <span className="text-danger">\*<\/span>\s*<\/label>\s*<input type="text" className="form-control" \/>/g,
    'Phone Number <span className="text-danger">*</span></label><input type="text" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />'
);

content = content.replace(
    /Fax <span className="text-danger">\*<\/span>\s*<\/label>\s*<input type="text" className="form-control" \/>/g,
    'Fax <span className="text-danger">*</span></label><input type="text" className="form-control" name="fax" value={formData.fax} onChange={handleInputChange} />'
);

content = content.replace(
    /Website <span className="text-danger">\*<\/span>\s*<\/label>\s*<input type="text" className="form-control" \/>/g,
    'Website <span className="text-danger">*</span></label><input type="text" className="form-control" name="website" value={formData.website} onChange={handleInputChange} />'
);

content = content.replace(
    /Address <span className="text-danger">\*<\/span>\s*<\/label>\s*<input type="text" className="form-control" \/>/g,
    'Address <span className="text-danger">*</span></label><input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} />'
);

content = content.replace(
    /Postal Code <span className="text-danger">\*<\/span>\s*<\/label>\s*<input type="text" className="form-control" \/>/g,
    'Postal Code <span className="text-danger">*</span></label><input type="text" className="form-control" name="postal_code" value={formData.postal_code} onChange={handleInputChange} />'
);

// 5. Update selects
content = content.replace(
    /<Select\s*classNamePrefix="react-select"\s*options=\{Country\}\s*placeholder="Choose"\s*\/>/,
    '<Select classNamePrefix="react-select" options={Country} placeholder="Choose" value={formData.country} onChange={(val) => handleSelectChange("country", val)} />'
);

content = content.replace(
    /<Select\s*classNamePrefix="react-select"\s*options=\{State\}\s*placeholder="Choose"\s*\/>/,
    '<Select classNamePrefix="react-select" options={State} placeholder="Choose" value={formData.state} onChange={(val) => handleSelectChange("state", val)} />'
);

content = content.replace(
    /<Select\s*classNamePrefix="react-select"\s*options=\{City\}\s*placeholder="Choose"\s*\/>/,
    '<Select classNamePrefix="react-select" options={City} placeholder="Choose" value={formData.city} onChange={(val) => handleSelectChange("city", val)} />'
);

// 6. Update File inputs and image previews
// Use string replacements to find the first occurence of input type file and the correct image map
// We will replace one by one.
let parts = content.split('<input type="file" />');

// part 0 is before first input
// part 1 is after icon input, before favicon input
// part 2 is after favicon input, before company logo input
// part 3 is after company logo input, before dark logo input
// part 4 is after dark logo input and rest of file

if(parts.length === 5) {
    parts[1] = parts[1].replace('src="assets/img/logo-small.png"', 'src={preview.company_icon || "assets/img/logo-small.png"}');
    parts[2] = parts[2].replace('src="assets/img/logo-small.png"', 'src={preview.favicon || "assets/img/logo-small.png"}');
    parts[3] = parts[3].replace('src="assets/img/products/company-logo.svg"', 'src={preview.company_logo || "assets/img/products/company-logo.svg"}');
    parts[4] = parts[4].replace('src="assets/img/products/white-logo.svg"', 'src={preview.company_dark_logo || "assets/img/products/white-logo.svg"}');
    
    content = parts[0] + '<input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "company_icon")} />' + 
              parts[1] + '<input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "favicon")} />' +
              parts[2] + '<input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "company_logo")} />' +
              parts[3] + '<input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "company_dark_logo")} />' + 
              parts[4];
}

// update submit button
content = content.replace(
    /<Link href="#" className="btn btn-primary">\s*Save Changes\s*<\/Link>/m,
    '<button type="submit" className="btn btn-primary">Save Changes</button>'
);

fs.writeFileSync(path, content);
console.log('Script completed');
