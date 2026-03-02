"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { generateExcelReport, ExportMetadata, ReportStats } from "@/services/exportService";
import { formatApplicationsForExcel } from "@/utils/excel/excelFormatter";

/**
 * ExportButton.tsx
 * Reusable UI component for Excel Export functionality.
 * Single Responsibility: Handle the "Click" event and UI state.
 */

interface ExportButtonProps {
    data: any[]; // The raw data stream (e.g. applications)
    metadata: ExportMetadata;
    stats: ReportStats;
    fileName?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    className?: string;
}

export const ExportButton = ({ data, metadata, stats, fileName, variant = "outline", className }: ExportButtonProps) => {
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        if (exporting) return;

        setExporting(true);
        try {
            // Flatten the data for formatting/analysis
            const flattenedData = formatApplicationsForExcel(data);

            // Execute the service to generate and download Excel
            await generateExcelReport(flattenedData, metadata, stats, fileName);

            console.log("Excel report exported successfully");
        } catch (error) {
            console.error("Export failed:", error);
            // Optionally, we could pass an onError prop or toast to the parent 
            alert("Export failed. Please check the console for details.");
        } finally {
            setExporting(false);
        }
    };

    return (
        <Button
            onClick={handleExport}
            disabled={exporting || data.length === 0}
            variant={variant}
            className={`rounded-xl ${className || ""}`}
        >
            {exporting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-zinc-500" />
                    Exporting...
                </>
            ) : (
                <>
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                </>
            )}
        </Button>
    );
};
