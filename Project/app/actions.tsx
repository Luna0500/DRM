'use server'

// Import necessary functions for CRUD operations on listings
import { fetchListingsByPRD_ID, createListing, updateListing, deleteListing } from '@/app/lib/data';

// Fetch listings by PRD_ID server action
export async function fetchListingsByPRD_IDServerAction(PRD_ID: string) {
    try {
        // Fetch the listing by ID
        const listings = await fetchListingsByPRD_ID(PRD_ID);

        // If listings are found, return it; otherwise, return null
        return listings || null;
    } catch (error) {
        console.error('Server Action Error:', error);
        throw new Error('Failed to fetch listing by PRD_ID.');
    }
}


// Create listing server action
export async function createListingServerAction(listingData: any, userEmail: any) {
    try {
        const newListing = await createListing(listingData, userEmail);
        return newListing;
    } catch (error) {
        console.error('Server Action Error:', error);
        throw new Error('Failed to create listing.');
    }
}

// Update listing server action
export async function updateListingServerAction(listingId: number, updatedData: any) {
    try {
        const updatedListing = await updateListing(listingId, updatedData);
        return updatedListing;
    } catch (error) {
        console.error('Server Action Error:', error);
        throw new Error('Failed to update listing.');
    }
}

// Delete listing server action
export async function deleteListingServerAction(listingId: number) {
    try {
        const deletedListing = await deleteListing(listingId);
        return deletedListing;
    } catch (error) {
        console.error('Server Action Error:', error);
        throw new Error('Failed to delete listing.');
    }
}
