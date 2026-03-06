const fs = require("fs");
const path = "./src/components/settings/websitesettings/companysettings.tsx";

let code = fs.readFileSync(path, "utf-8");

// Remove static imports
code = code.replace(/import \{ City, Country, State \}.*/g, "import { Country, State, City } from 'country-state-city';");

// Fix fetchSettings mapping to correctly find objects from country-state-city module format
code = code.replace(
/country: Country\.find\(c => c\.value === d\.country\) \|\| null,[\s\S]*?city: City\.find\(c => c\.value === d\.city\) \|\| null/g,
`country: d.country ? { label: Country.getCountryByCode(d.country)?.name || d.country, value: d.country } : null,
                        state: d.state && d.country ? { label: State.getStateByCodeAndCountry(d.state, d.country)?.name || d.state, value: d.state } : null,
                        city: d.city && d.state && d.country ? { label: d.city, value: d.city } : null`
);

// Advanced handleSelectChange modifier
code = code.replace(
/const handleSelectChange = \(name, selectedOption\) => \{\s*setFormData\(\{ \.\.\.formData, \[name\]: selectedOption \}\);\s*\};/g,
`const handleSelectChange = (name, selectedOption) => {
        if (name === 'country') {
            setFormData({ ...formData, country: selectedOption, state: null, city: null });
        } else if (name === 'state') {
            setFormData({ ...formData, state: selectedOption, city: null });
        } else {
            setFormData({ ...formData, [name]: selectedOption });
        }
    };`
);

// Modify Country JSX
code = code.replace(
/<Select classNamePrefix="react-select" options=\{Country\} placeholder="Choose" value=\{formData\.country\} onChange=\{\(val\) => handleSelectChange\('country', val\)\} \/>/g,
`<Select classNamePrefix="react-select" options={Country.getAllCountries().map(c => ({ label: c.name, value: c.isoCode }))} placeholder="Choose Country" value={formData.country} onChange={(val) => handleSelectChange('country', val)} />`
);

// Modify State JSX
code = code.replace(
/<Select classNamePrefix="react-select" options=\{State\} placeholder="Choose" value=\{formData\.state\} onChange=\{\(val\) => handleSelectChange\('state', val\)\} \/>/g,
`<Select classNamePrefix="react-select" options={formData.country ? State.getStatesOfCountry(formData.country.value).map(s => ({ label: s.name, value: s.isoCode })) : []} placeholder="Choose State" value={formData.state} onChange={(val) => handleSelectChange('state', val)} />`
);

// Modify City JSX
code = code.replace(
/<Select classNamePrefix="react-select" options=\{City\} placeholder="Choose" value=\{formData\.city\} onChange=\{\(val\) => handleSelectChange\('city', val\)\} \/>/g,
`<Select classNamePrefix="react-select" options={formData.country && formData.state ? City.getCitiesOfState(formData.country.value, formData.state.value).map(c => ({ label: c.name, value: c.name })) : []} placeholder="Choose City" value={formData.city} onChange={(val) => handleSelectChange('city', val)} />`
);

fs.writeFileSync(path, code);
console.log("Updated companysettings.tsx");
