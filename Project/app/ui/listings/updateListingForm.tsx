'use client';

import React, { useState } from 'react';
import { SubmitButton } from '@/app/ui/submitButton';
import { updateListingServerAction } from '@/app/actions';
import { useRouter } from 'next/navigation'
import { Listing } from '@/app/ui/listings/listingInterfaces'
import { list } from 'postcss';
import { useSession } from "next-auth/react";
import '@/app/cardlist/homePage.css'


const UpdateListingForm = ({ listing }: { listing: Listing; }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const userEmail = session?.user?.email
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
            console.error('Error updating listing:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (listing.LST_UserEmail !== userEmail) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
                <h1 className="text-5xl text-black">You Must Login to Update a Listing!</h1>
            </main>
        );
    }

    return (
        <div className="rounded-lg bg-[#eafae1] border-solid border-2 p-6 overflow-auto">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-10">
                <div className="mb-4">
                    <input type="text" name="PRD_ID" placeholder="Product ID" value={formData.PRD_ID} onChange={handleChange} className="form-input w-full px-4 py-2 bg-gray-100 border border-black text-left" />
                </div>
                <div className="mb-4">
                    <select name="LST_Status" value={formData.LST_Status} onChange={handleSelectChange} className="form-select w-full px-4 py-2 bg-gray-100 border border-black text-left">
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="mb-4">
                    <input type="text" name="LST_Price" placeholder="Price" value={formData.LST_Price} onChange={handleChange} className="form-input w-full px-4 py-2 bg-gray-100 border border-black text-left" />
                </div>
                <div className="mb-4">
                    <input type="number" name="LST_Quantity" placeholder="Quantity" value={formData.LST_Quantity} onChange={handleChange} className="form-input w-full px-4 py-2 bg-gray-100 border border-black text-left" />
                </div>
                <div className="mb-4">
                    <input type="text" name="LST_Location" placeholder="Location" value={formData.LST_Location} onChange={handleChange} className="form-input w-full px-4 py-2 bg-gray-100 border border-black text-left" />
                </div>
                <div className="mb-4">
                    <select name="LST_Condition" value={formData.LST_Condition} onChange={handleSelectChange} className="form-select w-full px-4 py-2 bg-gray-100 border border-black text-left">
                        <option value="">Select Condition</option>
                        <option value="Near Mint or Better">Near Mint or Better</option>
                        <option value="Lightly Played--Excellent">Lightly Played (Excellent)</option>
                        <option value="Moderately Played--Good">Moderately Played (Good)</option>
                        <option value="Heavily Played--Poor">Heavily Played (Poor)</option>
                    </select>
                </div>
                <div className="mb-4">
                    <input type="text" name="LST_ShipOption" placeholder="Shipping Option" value={formData.LST_ShipOption} onChange={handleChange} className="form-input w-full px-4 py-2 bg-gray-100 border border-black text-left" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font py-2 px-4 rounded">
                    Update
                </button>
                <a href={"/deletelisting?IDQuery=" + listing.LST_ID}>
                    <button className="delete-listing">Delete Listing</button>
                </a>
            </form>
        </div>
    );
};

export default UpdateListingForm;
