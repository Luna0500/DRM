import CreateListingForm from '@/app/ui/listings/createListingForm';

export default async function Page(){
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
            <h1 className="text-5xl text-black">Create Listing</h1>
            <CreateListingForm />
        </main>
    );
}