import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../../../components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ResumeInfoContext } from "../../../../../../Context/ResumeInfoContext";
import { Button } from "../../../../../../components/ui/button";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { useParams } from "react-router";
import { toast } from "sonner";

const Skills = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  const [loading, setLoading] = useState(false);

  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  // Load existing skills
  useEffect(() => {
    if (resumeInfo?.skills && resumeInfo.skills.length > 0) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  // Keep Resume Context updated
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: skillsList,
    }));
  }, [skillsList, setResumeInfo]);

  // Add Skill
  const AddNewSkills = () => {
    setSkillsList((prev) => [
      ...prev,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  // Remove Skill
  const RemoveSkills = () => {
    if (skillsList.length === 1) {
      toast.error("At least one skill is required.");
      return;
    }

    setSkillsList((prev) => prev.slice(0, -1));
  };

  // Handle Input Change
  const handleChange = (index, field, value) => {
    setSkillsList((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  // Save Skills
  const onSave = async () => {
    try {
      setLoading(true);
      enableNext(false);

      const payload = {
        data: {
          skills: skillsList.map(({ id, ...rest }) => rest),
        },
      };

      console.time("Update Skills");

      await GlobalApi.updateResumeDetails(resumeId, payload);

      console.timeEnd("Update Skills");

      toast.success("Skills updated successfully!");

      enableNext(true);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update skills.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 mt-10 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="text-lg font-bold">Skills</h2>
      <p className="text-sm text-gray-500 mb-5">
        Add your top professional skills.
      </p>

      <div className="space-y-4">
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-6 border rounded-lg p-4"
          >
            <div className="flex-1">
              <label className="text-xs font-medium">Skill Name</label>

              <Input
                value={item.name}
                placeholder="React, Java, Node.js..."
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
              />
            </div>

            <div>
              <label className="text-xs font-medium block mb-2">
                Rating
              </label>

              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(value) =>
                  handleChange(index, "rating", value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex gap-3">
          <Button variant="outline" onClick={AddNewSkills}>
            + Add Skill
          </Button>

          <Button variant="outline" onClick={RemoveSkills}>
            - Remove
          </Button>
        </div>

        <Button disabled={loading} onClick={onSave}>
          {loading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Skills;