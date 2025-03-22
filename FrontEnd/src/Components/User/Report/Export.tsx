import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PdfExport from "../../../Utilities/Pdfexport";
import ExcelExport from "../../../Utilities/ExcelExport";
import EmailExport from "../../../Utilities/EmailExport";

const ExportButton = ({ data,action }:any) => {
    console.log(action,"action in export button component%%%%%%%%%%%%%")
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleExport = (type:string) => {
        console.log(`Exporting as ${type} with data:`, data," With action : ",action);

        if (type === "PDF") {
            navigate("/pdf-export", { state: { data, action } });
            // <PdfExport data={data} action={action}/ >
            

         
        } else if (type === "Excel") {
            // Implement Excel export logic
            console.log("Generating Excel...");
        } else if (type === "Email") {
            // Implement Email sending logic
            console.log("Sending Email...");
        }

        setAnchorEl(null); // Close menu
    };

    return (
        <span>
            <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
                Export ▼
            </Button>

            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {/* <MenuItem onClick={() => handleExport("PDF")}>Export as PDF</MenuItem> */}
                <MenuItem ><PdfExport data={data} action={action}/></MenuItem>
                <MenuItem ><ExcelExport data={data} action={action}/></MenuItem>
                <MenuItem ><EmailExport data={data} action={action}/></MenuItem>
            </Menu>
        </span>
    );
};

export default ExportButton;
