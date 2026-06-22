import React, { useEffect, useState } from "react";
import Header from "../../../components/ui/Custom/Header";
import { Button } from "../../../components/ui/button";
import ResumePreview from "../../../Dashboard/resume/[resumeId]/edit/Components/ResumePreview";
import { ResumeInfoContext } from "../../../Context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Download,
  Share2,
  Copy,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState(null);
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = async () => {
    try {
      const response = await GlobalApi.GetResumeById(
        resumeId
      );

      setResumeInfo(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load resume");
    }
  };

 const HandleDownload = async () => {
  try {
    toast.loading("Generating PDF...", {
      id: "pdf",
    });

    const element = document.getElementById("print-area");

    if (!element) {
      toast.error("Resume not found", {
        id: "pdf",
      });
      return;
    }

    // Clone the resume
    const clone = element.cloneNode(true);

    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "210mm";
    clone.style.background = "#ffffff";
    clone.style.color = "#000000";

    document.body.appendChild(clone);

    // Force safe colors
    clone.querySelectorAll("*").forEach((node) => {
      node.style.boxShadow = "none";

      const computed = window.getComputedStyle(node);

      if (
        computed.backgroundColor.includes("oklch")
      ) {
        node.style.backgroundColor = "#ffffff";
      }

      if (
        computed.color.includes("oklch")
      ) {
        node.style.color = "#000000";
      }

      if (
        computed.borderColor.includes("oklch")
      ) {
        node.style.borderColor = "#d1d5db";
      }
    });

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL(
      "image/jpeg",
      1
    );

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;

    const imgHeight =
      (canvas.height * imgWidth) /
      canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pdfHeight;
    }

    pdf.save(
      `${resumeInfo?.firstName || "Resume"}_${
        resumeInfo?.lastName || ""
      }.pdf`
    );

    toast.success(
      "Resume downloaded successfully!",
      {
        id: "pdf",
      }
    );
  } catch (error) {
    console.error(error);

    toast.error(
      "Failed to generate PDF",
      {
        id: "pdf",
      }
    );
  }
};

  const HandleShare = async () => {
    const shareUrl =
      window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${resumeInfo?.firstName || ""} ${
            resumeInfo?.lastName || ""
          } Resume`,
          text: "Check out my resume",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(
          shareUrl
        );

        toast.success(
          "Share not supported. Link copied!"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      toast.success(
        "Resume link copied successfully!"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ResumeInfoContext.Provider
      value={{
        resumeInfo,
        setResumeInfo,
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">

        {/* Top Section */}
        <Header />

        <div className="max-w-6xl mx-auto px-6 py-10">

          <div className="bg-white rounded-3xl border shadow-xl p-10 text-center">

            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="w-14 h-14 text-green-600" />
              </div>
            </div>

            <h1 className="text-4xl font-bold mt-6">
              Resume Ready 🎉
            </h1>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Your AI generated resume is
              ready. Download it as a PDF
              or share it with recruiters
              instantly.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">

              <Button
                size="lg"
                onClick={
                  HandleDownload
                }
                className="gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={HandleShare}
                className="gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Resume
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={
                  HandleCopyLink
                }
                className="gap-2"
              >
                <Copy className="w-5 h-5" />
                Copy Link
              </Button>

            </div>

            <div className="mt-8 max-w-3xl mx-auto">
              <div className="bg-slate-100 border rounded-xl p-4 flex items-center justify-between">

                <span className="text-sm text-slate-600 truncate">
                  {window.location.href}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={
                    HandleCopyLink
                  }
                >
                  Copy
                </Button>

              </div>
            </div>

          </div>

        </div>

        {/* Resume Preview */}
        <div className="max-w-6xl mx-auto px-6 pb-20">

          <div
            className="bg-white shadow-2xl rounded-2xl overflow-hidden"
          >
            <div
              id="print-area"
              className="bg-white mx-auto"
              style={{
                width: "210mm",
                minHeight: "297mm",
              }}
            >
              {resumeInfo ? (
                <ResumePreview />
              ) : (
                <div className="p-20 text-center">
                  <LoaderCircle className="w-10 h-10 mx-auto animate-spin text-gray-500" />
                  Loading Resume...
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;