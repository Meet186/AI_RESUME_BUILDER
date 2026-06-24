import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../../../../../components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '../../../../../Context/ResumeInfoContext'
import { useParams } from 'react-router'
import GlobalApi from '../../../../../../service/GlobalApi'
import { toast } from 'sonner'

const colors = [
    "#2563EB", "#1D4ED8", "#0F766E", "#059669", "#166534",
    "#7C3AED", "#6D28D9", "#DC2626", "#EA580C", "#B45309",
    "#374151", "#111827", "#0F172A", "#1E3A8A", "#155E75",
    "#4C1D95", "#881337", "#14532D", "#3F3F46", "#334155",
];

const ThemeColor = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor);
    const [open, setOpen] = useState(false);

    const { resumeId } = useParams();

    const onColorSelect = async (color) => {
        setSelectedColor(color);

        setResumeInfo({
            ...resumeInfo,
            themeColor: color,
        });

        const data = {
            data: {
                themeColor: color,
            },
        };

        try {
            await GlobalApi.updateResumeDetails(resumeId, data);
            toast.success("Theme Color Updated");

            // Close popup after selection
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update theme color");
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-2"
                >
                    <LayoutGrid className="h-4 w-4" />
                    Theme
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                <h2 className="mb-2 text-sm font-bold">
                    Select Theme Color
                </h2>

                <div className="grid grid-cols-5 gap-3">
                    {colors.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onColorSelect(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer border hover:scale-110 transition-all
                                ${selectedColor === item ? 'border-2 border-black' : ''}
                            `}
                            style={{
                                backgroundColor: item,
                            }}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ThemeColor;