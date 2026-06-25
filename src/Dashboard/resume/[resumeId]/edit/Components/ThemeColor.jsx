import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../../../../components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "../../../../../Context/ResumeInfoContext";
import { useParams } from "react-router";
import GlobalApi from "../../../../../../service/GlobalApi";
import { toast } from "sonner";

const colors = [
  "#2563EB", "#1D4ED8", "#0F766E", "#059669", "#166534",
  "#7C3AED", "#6D28D9", "#DC2626", "#EA580C", "#B45309",
  "#374151", "#111827", "#0F172A", "#1E3A8A", "#155E75",
  "#4C1D95", "#881337", "#14532D", "#3F3F46", "#334155",
];

const ThemeColor = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(
    resumeInfo?.themeColor || colors[0]
  );
  const [open, setOpen] = useState(false);

  const { resumeId } = useParams();
  const timerRef = useRef(null);

  useEffect(() => {
    if (resumeInfo?.themeColor) {
      setSelectedColor(resumeInfo.themeColor);
    }
  }, [resumeInfo]);

  const saveThemeColor = async (color) => {
    try {
      await GlobalApi.updateResumeDetails(resumeId, {
        data: {
          themeColor: color,
        },
      });

      toast.success("Theme Color Updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update theme color");
    }
  };

  const onColorSelect = (color) => {
    // Update UI immediately
    setSelectedColor(color);

    setResumeInfo((prev) => ({
      ...prev,
      themeColor: color,
    }));

    // Cancel previous pending save
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Save after 700 ms
    timerRef.current = setTimeout(async () => {
      await saveThemeColor(color);
      setOpen(false);
    }, 700);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
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
              className={`h-5 w-5 rounded-full cursor-pointer transition-all hover:scale-110 ${
                selectedColor === item
                  ? "border-2 border-black"
                  : "border"
              }`}
              style={{ backgroundColor: item }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;