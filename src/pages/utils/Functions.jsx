export const handleDropdownChange = (e, data, setFormData) => {
    setFormData((prevData) => ({
      ...prevData,
      country: data.country,
      state: data.state,
      city: data.city,
    }));
  };
  
  export const handleCheckboxChange = (e, data, setFormData) => {
    setFormData((prevData) => ({
      ...prevData,
      acceptedCheckbox: e.target.checked,
    }));
  };
  
  export const handleInputChange = (e, data, setFormData) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  
  export const handleFileInput = (e, data, setFormData) => {
    setFormData((prevData) => ({
      ...prevData,
      idProof: data,
    }));
  };
  
  export const checkTheForm = (formData) => {
    let checked = true;
    let errors = {};
  
    for (let key in formData) {
      if (
        formData[key] === "" ||
        formData[key] === null ||
        formData[key] === false
      ) {
        errors[key] = `${key} cannot be empty`;
        checked = false;
      }
    }
  
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      checked = false;
    }
  
    return { checked, errors };
  };
  
