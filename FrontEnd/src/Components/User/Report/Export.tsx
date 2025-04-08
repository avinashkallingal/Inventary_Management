import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import PdfExport from "../../../Utilities/Pdfexport";
import ExcelExport from "../../../Utilities/ExcelExport";
import EmailExport from "../../../Utilities/EmailExport";
import { ReportData } from "../../../Interfaces/IReport";

interface dataNew{
    data:ReportData[];
    action:string;
}

const ExportButton = ({ data,action }:dataNew) => {
    console.log(action,"action in export button component%%%%%%%%%%%%%")
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);


  

    return (
        <span>
            <Button variant="contained" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}>
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
