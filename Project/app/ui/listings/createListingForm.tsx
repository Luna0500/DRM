'use client';

import React, { useState } from 'react';
import { SubmitButton } from '@/app/ui/submitButton';
import { createListingServerAction } from '@/app/actions';
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"


const CreateListingForm = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const userEmail = session?.user?.email

    const initialFormData = {
        PRD_ID: '',
        LST_Status: '', // Assuming this is a dropdown/select field
        LST_Price: '',
        LST_Quantity: '',
        LST_Location: '',
        LST_Condition: '',
        LST_ShipOption: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createListingServerAction(formData, userEmail);
            router.push('/displaylistings');
        } catch (error) {
            // Handle error (e.g., display error message)
            console.error('Error creating listing:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="PRD_ID" placeholder="Product ID" value={formData.PRD_ID} onChange={handleChange} />
            <select name="LST_Status" value={formData.LST_Status} onChange={handleSelectChange}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <input type="text" name="LST_Price" placeholder="Price" value={formData.LST_Price} onChange={handleChange} />
            <input type="number" name="LST_Quantity" placeholder="Quantity" value={formData.LST_Quantity} onChange={handleChange} />
            <input type="text" name="LST_Location" placeholder="Location" value={formData.LST_Location} onChange={handleChange} />
            <input type="text" name="LST_Condition" placeholder="Condition" value={formData.LST_Condition} onChange={handleChange} />
            <input type="text" name="LST_ShipOption" placeholder="Shipping Option" value={formData.LST_ShipOption} onChange={handleChange} />
            <button type="submit">
                Add
            </button>
        </form>
    );
};

export default CreateListingForm;
