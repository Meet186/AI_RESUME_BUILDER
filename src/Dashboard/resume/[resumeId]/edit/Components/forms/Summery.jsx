import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../../components/ui/button";
import { Textarea } from "../../../../../../components/ui/textarea";
import { ResumeInfoContext } from "../../../../../../Context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { Brain, LoaderCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../../../service/AIMODEL";

const Summery = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  const [loading, setLoading] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingEnhance, setLoadingEnhance] = useState(false);

  const [summery, setSummery] = useState("");
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

  // Load summary from context only once when data arrives
  useEffect(() => {
    if (resumeInfo?.summery) {
      setSummery(resumeInfo.summery);
    } else {
        enableNext(false);
    }
  }, [resumeInfo]);

  // Update local state + context
  const handleSummaryChange = (e) => {
    const value = e.target.value;

    setSummery(value);

    setResumeInfo((prev) => ({
      ...prev,
      summery: value,
    }));
  };

  // Save Summary
  const onSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      enableNext(false);

      await GlobalApi.updateResumeDetails0(resumeId, {
        summery,
      });

      toast.success("Summary updated successfully!");
      enableNext(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update summary.");
    } finally {
      setLoading(false);
    }
  };

  // Generate AI Summaries
  const GenerateSummeryFromAI = async (e) => {
    e.preventDefault();

    if (!resumeInfo?.jobTitle) {
      toast.error("Please enter Job Title first.");
      return;
    }

    const PROMPT = `
Generate 3 ATS-friendly professional resume summaries.

Job Title:
${resumeInfo.jobTitle}

Instructions:
- Generate one summary for Fresher.
- Generate one summary for Mid-Level.
- Generate one summary for Experienced.
- Each summary should contain 3-4 lines.
- Use professional language.
- ATS Friendly.
- Return ONLY JSON.

Example:

[
  {
    "experience_level":"Fresher",
    "summary":"..."
  },
  {
    "experience_level":"Mid-Level",
    "summary":"..."
  },
  {
    "experience_level":"Experienced",
    "summary":"..."
  }
]
`;

    try {
      setLoadingAI(true);

      const response = await AIChatSession(PROMPT);

      console.log("AI Response:", response);

      if (Array.isArray(response)) {
        setAiGenerateSummeryList(response);
      } else {
        toast.error("Invalid AI response.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate summaries.");
    } finally {
      setLoadingAI(false);
    }
  };

  // Enhance Existing Summary
  const EnhanceSummaryWithAI = async (e) => {
    e.preventDefault();

    if (!summery.trim()) {
      toast.error("Please write or select a summary first.");
      return;
    }

    const PROMPT = `
You are an expert ATS Resume Writer.

Improve the following resume summary.

Requirements:
- Keep the same meaning.
- Make it more professional.
- ATS Friendly.
- Strong action verbs.
- Grammatically correct.
- Keep between 3-5 lines.
- Return ONLY the improved summary.
- No headings.
- No explanation.

Resume Summary:

${summery}
`;

    try {
      setLoadingEnhance(true);

      const response = await AIChatSession(PROMPT);

      console.log("Enhanced:", response);

      let enhanced = "";

      if (typeof response === "string") {
        enhanced = response;
      } else if (response?.summary) {
        enhanced = response.summary;
      }

      if (enhanced) {
        setSummery(enhanced);

        setResumeInfo((prev) => ({
          ...prev,
          summery: enhanced,
        }));

        toast.success("Summary enhanced successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to enhance summary.");
    } finally {
      setLoadingEnhance(false);
    }
  };

  return (
    <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="text-lg font-bold">Summary</h2>

      <p className="text-gray-500">
        Add a professional summary for your resume.
      </p>

      <form className="mt-7" onSubmit={onSave}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <label className="font-medium">Resume Summary</label>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={loadingEnhance || !summery.trim()}
              onClick={EnhanceSummaryWithAI}
              className="flex gap-2 text-green-600 border-green-600"
            >
              {loadingEnhance ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Enhance Summary
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={loadingAI}
              onClick={GenerateSummeryFromAI}
              className="flex gap-2 text-primary border-primary"
            >
              {loadingAI ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Generate from AI
                </>
              )}
            </Button>
          </div>
        </div>

        <Textarea
          className="mt-5 min-h-[180px]"
          value={summery}
          onChange={handleSummaryChange}
          placeholder="Write your professional summary..."
          required
        />

        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Summary"
            )}
          </Button>
        </div>
      </form>

      {aiGeneratedSummeryList.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold">
            AI Generated Suggestions
          </h2>

          <div className="space-y-4">
            {aiGeneratedSummeryList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSummery(item.summary);

                  setResumeInfo((prev) => ({
                    ...prev,
                    summery: item.summary,
                  }));

                  toast.success("Summary selected.");
                }}
                className="p-5 transition-all bg-white border rounded-lg shadow cursor-pointer hover:border-primary hover:shadow-md"
              >
                <h3 className="mb-2 font-bold text-primary">
                  {item.experience_level}
                </h3>

                <p className="text-gray-700 whitespace-pre-line">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summery;