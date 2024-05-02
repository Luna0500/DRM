export interface Listing {
    LST_ID: number;
    LST_UserEmail: string;
    PRD_ID: string;
    LST_Time: string;
    LST_Status: string;
    LST_Price: string;
    LST_Quantity: number;
    LST_Location: string;
    LST_Condition: string;
    LST_ShipOption: string;
}

export interface CartListing {
    CL_ID: number;
    LST_ID: number;
    CL_Email: string;
    CL_Quantity: number;
}