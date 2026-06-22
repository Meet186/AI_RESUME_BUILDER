import React, { useContext, useState, useEffect } from "react";
import { ResumeInfoContext } from "../../../../../../Context/ResumeInfoContext";
import { Input } from "../../../../../../components/ui/input";
import { Textarea } from "../../../../../../components/ui/textarea";
import { Button } from "../../../../../../components/ui/button";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from "sonner";
import { useParams } from "react-router";
import { LoaderCircle } from "lucide-react";

const Education = ({ enableNext }) => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  // Load education from context
  useEffect(() => {
    if (resumeInfo?.Education?.length) {
      setEducationalList(resumeInfo.Education);
    }
  }, [resumeInfo]);

  // Keep context updated
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      Education: educationalList,
    }));
  }, [educationalList, setResumeInfo]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setEducationalList((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]: value,
            }
          : item
      )
    );
  };

  const AddNewEducation = () => {
    setEducationalList((prev) => [
      ...prev,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList((prev) => prev.slice(0, -1));
    }
  };

  const onSave = async () => {
    try {
      setLoading(true);
      enableNext(false);

      await GlobalApi.updateResumeDetails0(resumeId, {
        Education: educationalList.map(({ id, ...rest }) => rest),
      });

      toast.success("Education updated successfully!");
      enableNext(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update education");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
          >
            <div className="col-span-2">
              <label>University Name</label>
              <Input
                name="universityName"
                value={item.universityName || ""}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div>
              <label>Degree</label>
              <Input
                name="degree"
                value={item.degree || ""}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div>
              <label>Major</label>
              <Input
                name="major"
                value={item.major || ""}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div>
              <label>Start Date</label>
              <Input
                type="date"
                name="startDate"
                value={item.startDate || ""}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div>
              <label>End Date</label>
              <Input
                type="date"
                name="endDate"
                value={item.endDate || ""}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div className="col-span-2">
              <label>Description</label>
              <Textarea
                name="description"
                value={item.description || ""}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={AddNewEducation}
          >
            + Add More Education
          </Button>

          <Button
            variant="outline"
            className="text-primary"
            onClick={RemoveEducation}
            disabled={educationalList.length === 1}
          >
            - Remove
          </Button>
        </div>

        <Button disabled={loading} onClick={onSave}>
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Education;