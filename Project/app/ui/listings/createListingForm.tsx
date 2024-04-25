'use client';

import React, { useState } from 'react';
import { SubmitButton } from '@/app/ui/submitButton';
import { createListingServerAction } from '@/app/actions';
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

interface CreateListingFormProps {
    IDQuery: string;
}

const CreateListingForm = (props: CreateListingFormProps) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const userEmail = session?.user?.email;
    console.log(props.IDQuery);

    const initialFormData = {
        PRD_ID: props.IDQuery,
        LST_Status: '', // Assuming this is a dropdown/select field
        LST_Price: '',
        LST_Quantity: '',
        LST_Location: '',
        LST_Condition: '', 
        LST_ShipOption: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [showConditionGuide, setShowConditionGuide] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createListingServerAction(formData, userEmail);
            router.push('/carddetail?IDQuery=' + formData.PRD_ID);
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

    const toggleConditionGuide = () => {
        setShowConditionGuide(!showConditionGuide);
    };

    return (
        <div className="rounded-lg bg-white p-6 overflow-auto"> 
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
                    <div className="mb-4 flex justify-between items-center">
                    <select name="LST_Condition" value={formData.LST_Condition} onChange={handleSelectChange} className="form-select w-full px-4 py-2 bg-gray-100 border border-black text-left">
                        <option value="">Select Condition</option>
                        <option value="Near Mint or Better">Near Mint or Better</option>
                        <option value="Lightly Played--Excellent">Lightly Played (Excellent)</option>
                        <option value="Moderately Played--Good">Moderately Played (Very good)</option>
                        <option value="Heavily Played--Poor">Heavily Played (Poor)</option>
                        </select>

                </div>
                </div>
                <div className="mb-4">
                    <a href="#" onClick={toggleConditionGuide} className="text-blue-500 text-sm">How do I determine the condition of my card?</a>

                    {showConditionGuide && (
                        <div className={`mt-2 overflow-x-auto transition-opacity duration-500 ${showConditionGuide ? 'opacity-100' : 'opacity-0'}`}>
                            <table className="w-full border-collapse border border-black bg-white">
                                <thead>
                                    <tr>
                                        <th className="border border-black">Condition</th>
                                        <th className="border border-black">Corners</th>
                                        <th className="border border-black">Edges</th>
                                        <th className="border border-black">Discoloration</th>
                                        <th className="border border-black">Surface Indentations</th>
                                        <th className="border border-black">Creases</th>
                                        <th className="border border-black">Scratches/Scuffing</th>
                                        <th className="border border-black">Staining</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-black">Near Mint or Better</td>
                                        <td className="border border-black">None</td>
                                        <td className="border border-black">None</td>
                                        <td className="border border-black">None</td>
                                        <td className="border border-black">Minor</td>
                                        <td className="border border-black">None</td>
                                        <td className="border border-black">Minor</td>
                                        <td className="border border-black">None</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black">Lightly Played (Excellent)</td>
                                        <td className="border border-black">Minor chipping</td>
                                        <td className="border border-black">Minor chipping</td>
                                        <td className="border border-black">Minor</td>
                                        <td className="border border-black">Moderate</td>
                                        <td className="border border-black">Minor surface wrinkles</td>
                                        <td className="border border-black">Minor</td>
                                        <td className="border border-black">Minor</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black">Moderately Played (Good)</td>
                                        <td className="border border-black">Moderate chipping/whitening</td>
                                        <td className="border border-black">Slightly rough edges and/or light indentations</td>
                                        <td className="border border-black">Moderate</td>
                                        <td className="border border-black">Moderate</td>
                                        <td className="border border-black">Moderate with multiple creases</td>
                                        <td className="border border-black">Moderate</td>
                                        <td className="border border-black">Moderate</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black">Heavily Played (Poor)</td>
                                        <td className="border border-black">Major chipping/whitening</td>
                                        <td className="border border-black">Moderate-to-heavy indentations</td>
                                        <td className="border border-black">Moderate to Major</td>
                                        <td className="border border-black">Major</td>
                                        <td className="border border-black">Multiple major creases</td>
                                        <td className="border border-black">Major with paper loss, tears, and pinholes</td>
                                        <td className="border border-black">Major</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <input type="text" name="LST_ShipOption" placeholder="Shipping Option" value={formData.LST_ShipOption} onChange={handleChange} className="form-input w-full px-4 py-2 bg-gray-100 border border-black text-left" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font py-2 px-4 rounded">
                    Add
                </button>
            </form>
        </div>
    );
};
export default CreateListingForm;






