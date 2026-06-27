import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "../../../../../../Context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from "sonner";

function Education({ enableNext }) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

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

  // Load data from context
  useEffect(() => {
    if (resumeInfo?.Education?.length) {
      setEducationalList(resumeInfo.Education);
    }
  }, [resumeInfo?.Education]);

  const updateEducationData = (newList) => {
    setEducationalList(newList);

    setResumeInfo((prev) => ({
      ...prev,
      Education: newList,
    }));
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    const newEntries = [...educationalList];
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };

    updateEducationData(newEntries);
  };

  const AddNewEducation = () => {
    const newList = [
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];

    updateEducationData(newList);
  };

  const RemoveEducation = () => {
    if (educationalList.length <= 1) return;

    const newList = educationalList.slice(0, -1);
    updateEducationData(newList);
  };

  const onSave = async () => {

    setLoading(true);

    const data = {
      data: {
        Education: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    try {
      enableNext(false);
      const resp = await GlobalApi.updateResumeDetails(
        params.resumeId,
        data
      );
      console.log("Save Response:", resp);
      toast.success("Education details updated!");
      enableNext(true);
    } catch (error) {
      console.error(error);
      toast.error("Server Error, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your Educational Details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={item?.id || index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  value={item?.universityName || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  value={item?.degree || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Major</label>
                <Input
                  name="major"
                  value={item?.major || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item?.startDate || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item?.endDate || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  value={item?.description || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            + Add More Education
          </Button>

          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
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
}

export default Education;