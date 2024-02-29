'use client';

import React, { useState } from 'react';
import { SubmitButton } from '@/app/ui/submitButton';
import { updateListingServerAction } from '@/app/actions';
import { useRouter } from 'next/navigation'
import { Listing } from '@/app/ui/listings/listingInterface'
import { list } from 'postcss';


const UpdateListingForm = ({ listing }: { listing: Listing; }) => {
    const router = useRouter();
    const initialFormData = {
        PRD_ID: listing.PRD_ID,
        LST_Status: listing.LST_Status,
        LST_Price: listing.LST_Price,
        LST_Quantity: listing.LST_Quantity,
        LST_Location: listing.LST_Location,
        LST_Condition: listing.LST_Condition,
        LST_ShipOption: listing.LST_ShipOption,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateListingServerAction(listing.LST_ID, formData);
            router.push('carddetail?IDQuery=' + listing.PRD_ID);
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
            <input type="text" name="PRD_ID" placeholder={formData.PRD_ID} value={formData.PRD_ID} onChange={handleChange} />
            <select name="LST_Status" value={formData.LST_Status} onChange={handleSelectChange}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <input type="text" name="LST_Price" placeholder={formData.LST_Price.toString()} value={formData.LST_Price} onChange={handleChange} />
            <input type="number" name="LST_Quantity" placeholder={formData.LST_Quantity.toString()} value={formData.LST_Quantity} onChange={handleChange} />
            <input type="text" name="LST_Location" placeholder={formData.LST_Location} value={formData.LST_Location} onChange={handleChange} />
            <input type="text" name="LST_Condition" placeholder={listing.LST_Condition} value={formData.LST_Condition} onChange={handleChange} />
            <input type="text" name="LST_ShipOption" placeholder={listing.LST_ShipOption} value={formData.LST_ShipOption} onChange={handleChange} />
            <button type="submit">
                Add
            </button>
        </form>
    );
};

export default UpdateListingForm;
