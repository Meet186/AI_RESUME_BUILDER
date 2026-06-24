import React, { useEffect, useState } from "react";
import Header from "../../../components/ui/Custom/Header";
import { Button } from "../../../components/ui/button";
import ResumePreview from "../../../Dashboard/resume/[resumeId]/edit/Components/ResumePreview";
import { ResumeInfoContext } from "../../../Context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router";
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
      const response = await GlobalApi.GetResumeById(resumeId);
      setResumeInfo(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load resume");
    }
  };

  /* =========================
     PRINT DOWNLOAD (CLEAN)
     ========================= */
  const HandleDownload = () => {
    window.print();
  };

  const HandleShare = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${resumeInfo?.firstName || ""} ${resumeInfo?.lastName || ""} Resume`,
          text: "Check out my resume",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">

        {/* HEADER (hidden in print via CSS) */}
        <div className="no-print">
          <Header />
        </div>

        {/* TOP CARD */}
        <div className="max-w-6xl mx-auto px-6 py-10 no-print">

          <div className="bg-white rounded-3xl border shadow-xl p-10 text-center">

            <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto" />

            <h1 className="text-4xl font-bold mt-6">
              Resume Ready 🎉
            </h1>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Download or share your resume instantly.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">

              <Button size="lg" onClick={HandleDownload} className="gap-2">
                <Download className="w-5 h-5" />
                Download PDF
              </Button>

              <Button variant="outline" size="lg" onClick={HandleShare}>
                <Share2 className="w-5 h-5" />
                Share
              </Button>

              <Button variant="secondary" size="lg" onClick={HandleCopyLink}>
                <Copy className="w-5 h-5" />
                Copy Link
              </Button>

            </div>

          </div>
        </div>

        {/* RESUME AREA (ONLY THIS PRINTS) */}
        <div className="max-w-6xl mx-auto px-6 pb-20">

          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">

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