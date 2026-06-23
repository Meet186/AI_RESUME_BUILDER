import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../../../Context/ResumeInfoContext";
import { Input } from "../../../../../../components/ui/input";
import { Textarea } from "../../../../../../components/ui/textarea";
import { Button } from "../../../../../../components/ui/button";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from "sonner";
import { useParams } from "react-router";
import { LoaderCircle } from "lucide-react";

const defaultEducation = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

const Education = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } =
    useContext(ResumeInfoContext);

  const { resumeId } = useParams();

  const [loading, setLoading] = useState(false);

  const [educationalList, setEducationalList] = useState([
    defaultEducation,
  ]);

  // Load saved data
  useEffect(() => {
    if (
      resumeInfo?.Education &&
      Array.isArray(resumeInfo.Education)
    ) {
      setEducationalList(
        resumeInfo.Education.length
          ? resumeInfo.Education
          : [defaultEducation]
      );
    }
  }, [resumeInfo]);

  // Keep context updated
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      Education: educationalList,
    }));
  }, [educationalList]);

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
      { ...defaultEducation },
    ]);
  };

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList((prev) =>
        prev.slice(0, prev.length - 1)
      );
    }
  };

  const onSave = async () => {
    try {
      setLoading(true);

      const payload = {
        data: {
          Education: educationalList.map(
            ({
              id,
              documentId,
              createdAt,
              updatedAt,
              publishedAt,
              ...rest
            }) => rest
          ),
        },
      };

      console.log(
        "Education Payload:",
        JSON.stringify(payload, null, 2)
      );

      const response =
        await GlobalApi.updateResumeDetails(
          resumeId,
          payload
        );

      console.log(
        "Education Saved:",
        response?.data
      );

      setResumeInfo((prev) => ({
        ...prev,
        Education: educationalList,
      }));

      enableNext?.(true);

      toast.success(
        "Education Updated Successfully"
      );
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to update education"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10">
      <h2 className="font-bold text-lg">
        Education
      </h2>

      <p className="text-sm text-gray-500">
        Add your educational details
      </p>

      {educationalList.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-3 border p-4 rounded-lg my-5"
        >
          <div className="col-span-2">
            <label>University Name</label>
            <Input
              name="universityName"
              value={item?.universityName || ""}
              onChange={(e) =>
                handleChange(e, index)
              }
            />
          </div>

          <div>
            <label>Degree</label>
            <Input
              name="degree"
              value={item?.degree || ""}
              onChange={(e) =>
                handleChange(e, index)
              }
            />
          </div>

          <div>
            <label>Major</label>
            <Input
              name="major"
              value={item?.major || ""}
              onChange={(e) =>
                handleChange(e, index)
              }
            />
          </div>

          <div>
            <label>Start Date</label>
            <Input
              type="date"
              name="startDate"
              value={item?.startDate || ""}
              onChange={(e) =>
                handleChange(e, index)
              }
            />
          </div>

          <div>
            <label>End Date</label>
            <Input
              type="date"
              name="endDate"
              value={item?.endDate || ""}
              onChange={(e) =>
                handleChange(e, index)
              }
            />
          </div>

          <div className="col-span-2">
            <label>Description</label>
            <Textarea
              name="description"
              value={item?.description || ""}
              onChange={(e) =>
                handleChange(e, index)
              }
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
          >
            + Add More
          </Button>

          <Button
            variant="outline"
            disabled={
              educationalList.length === 1
            }
            onClick={RemoveEducation}
          >
            - Remove
          </Button>
        </div>

        <Button
          onClick={onSave}
          disabled={loading}
        >
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