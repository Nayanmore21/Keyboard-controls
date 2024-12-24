import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import React, { useRef, useState } from 'react'

const KeyboardControl = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: null,
        gender: 'male',
        grade: '',
        address: '',
        phoneNumber: '',
        parentName: '',
        parentEmail: '',
        extracurricular: [],
        hasSchoolBus: false
    });

    // Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Validation state
    const [errors, setErrors] = useState({});

    // References for keyboard navigation
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const dateOfBirthRef = useRef(null);
    const genderRef = useRef(null);
    const gradeRef = useRef(null);
    const addressRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const parentNameRef = useRef(null);
    const parentEmailRef = useRef(null);
    const submitButtonRef = useRef(null);

    // Handle keyboard navigation
    const handleKeyDown = (e, nextRef, isSpecialControl = false) => {
        if (e.key === 'Enter' || (e.key === 'Tab' && !e.shiftKey)) {
            e.preventDefault();
            if (isSpecialControl) {
                // For special controls, we need to handle the focus manually
                setTimeout(() => {
                    nextRef.current?.focus();
                }, 0);
            } else {
                nextRef.current?.focus();
            }
        }
    };

    // Handle form changes
    const handleChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when field is modified
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    // Special handler for date picker
    const handleDatePickerKeyDown = (e) => {
        if (e.key === 'Enter' || (e.key === 'Tab' && !e.shiftKey)) {
            e.preventDefault();
            // Close the date picker if it's open
            e.target.blur();
            // Move to next field
            genderRef.current?.focus();
        }
    };

    // Special handler for radio group
    const handleRadioKeyDown = (e) => {
        if (e.key === 'Enter' || (e.key === 'Tab' && !e.shiftKey)) {
            e.preventDefault();
            gradeRef.current?.focus();
        }
    };

    // Special handler for select
    const handleSelectKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
            addressRef.current?.focus();
        }
    };

    // Handle date change
    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            dateOfBirth: date
        }));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        }
        if (!formData.grade) {
            newErrors.grade = 'Grade is required';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            // Handle successful form submission
            console.log('Form submitted:', formData);
            setSnackbarMessage('Form submitted successfully!');
            setOpenSnackbar(true);
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                dateOfBirth: null,
                gender: 'male',
                grade: '',
                address: '',
                phoneNumber: '',
                parentName: '',
                parentEmail: '',
                extracurricular: [],
                hasSchoolBus: false
            });
        } else {
            setSnackbarMessage('Please fill in all required fields correctly.');
            setOpenSnackbar(true);
        }
    };
    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Student Information Form
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Personal Information */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                required
                                value={formData.firstName}
                                onChange={handleChange('firstName')}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                                inputRef={firstNameRef}
                                onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                required
                                value={formData.lastName}
                                onChange={handleChange('lastName')}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                                inputRef={lastNameRef}
                                onKeyDown={(e) => handleKeyDown(e, emailRef)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange('email')}
                                error={!!errors.email}
                                helperText={errors.email}
                                inputRef={emailRef}
                                onKeyDown={(e) => handleKeyDown(e, dateOfBirthRef)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    label="Date of Birth"
                                    value={formData.dateOfBirth}
                                    onChange={handleDateChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            required
                                            error={!!errors.dateOfBirth}
                                            helperText={errors.dateOfBirth}
                                            inputRef={dateOfBirthRef}
                                            onKeyDown={handleDatePickerKeyDown}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    row
                                    value={formData.gender}
                                    onChange={handleChange('gender')}
                                    onKeyDown={handleRadioKeyDown}
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio inputRef={genderRef} />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control={<Radio />}
                                        label="Other"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required error={!!errors.grade}>
                                <InputLabel>Grade</InputLabel>
                                <Select
                                    value={formData.grade}
                                    onChange={handleChange('grade')}
                                    label="Grade"
                                    inputRef={gradeRef}
                                    onKeyDown={handleSelectKeyDown}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                                        <MenuItem key={grade} value={grade}>
                                            Grade {grade}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                multiline
                                rows={2}
                                value={formData.address}
                                onChange={handleChange('address')}
                                inputRef={addressRef}
                                onKeyDown={(e) => handleKeyDown(e, phoneNumberRef)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                required
                                value={formData.phoneNumber}
                                onChange={handleChange('phoneNumber')}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber}
                                inputRef={phoneNumberRef}
                                onKeyDown={(e) => handleKeyDown(e, parentNameRef)}
                            />
                        </Grid>

                        {/* Parent Information */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Parent/Guardian Name"
                                value={formData.parentName}
                                onChange={handleChange('parentName')}
                                inputRef={parentNameRef}
                                onKeyDown={(e) => handleKeyDown(e, parentEmailRef)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Parent/Guardian Email"
                                type="email"
                                value={formData.parentEmail}
                                onChange={handleChange('parentEmail')}
                                inputRef={parentEmailRef}
                                onKeyDown={(e) => handleKeyDown(e, submitButtonRef)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.hasSchoolBus}
                                        onChange={handleChange('hasSchoolBus')}
                                        onKeyDown={(e) => handleKeyDown(e, submitButtonRef, true)}
                                    />
                                }
                                label="Requires School Bus Service"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                ref={submitButtonRef}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default KeyboardControl

