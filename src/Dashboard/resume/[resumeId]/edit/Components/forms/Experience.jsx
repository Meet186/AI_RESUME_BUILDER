import React, {
  useEffect,
  useState,
  useContext,
} from "react";
import { ResumeInfoContext } from "../../../../../../Context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "../../../../../../components/ui/button";
import RichTextEditor from "../RichTextEditor";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  workSummery: "",
};

const Experience = ({ enableNext }) => {
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } =
    useContext(ResumeInfoContext);

  const [experinceList, setExperinceList] = useState([]);

  const { resumeId } = useParams();

  useEffect(() => {
    if (resumeInfo?.personal_Experience?.length) {
      setExperinceList(resumeInfo.personal_Experience);
    } else {
      setExperinceList([{ ...formField }]);
      enableNext(false);
    }
  }, [resumeInfo]);

  const updateExperience = (newEntries) => {
    setExperinceList(newEntries);

    setResumeInfo((prev) => ({
      ...prev,
      personal_Experience: newEntries,
    }));
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;

    const newEntries = [...experinceList];

    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };

    updateExperience(newEntries);
  };

  const handleRichTextEditor = (
    e,
    name,
    index
  ) => {
    const newEntries = [...experinceList];

    newEntries[index] = {
      ...newEntries[index],
      [name]: e.target.value,
    };

    updateExperience(newEntries);
  };

  const handleCurrentlyWorking = (
    index,
    checked
  ) => {
    const newEntries = [...experinceList];

    newEntries[index] = {
      ...newEntries[index],
      currentlyWorking: checked,
      endDate: checked
        ? "Currently Working"
        : "",
    };

    updateExperience(newEntries);
  };

  const AddNewExperience = () => {
    const newEntries = [
      ...experinceList,
      { ...formField },
    ];

    updateExperience(newEntries);
  };

  const RemoveExperience = () => {
    if (experinceList.length <= 1) return;

    const newEntries = experinceList.slice(0, -1);

    updateExperience(newEntries);
  };

  const onSave = async () => {
    try {
      setLoading(true);
      enableNext(false);

      const data = {
        data: {
          personal_Experience:
            experinceList.map(
              ({ id, ...rest }) => rest
            ),
        },
      };

      await GlobalApi.updateResumeDetails(
        resumeId,
        data
      );

      toast.success(
        "Experience Updated Successfully"
      );

      enableNext(true);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update experience"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">
        Professional Experience
      </h2>

      <p>Add your previous work experience</p>

      <div>
        {experinceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">

              <div>
                <label className="text-xs">
                  Position Title
                </label>

                <Input
                  name="title"
                  value={item.title || ""}
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                />
              </div>

              <div>
                <label className="text-xs">
                  Company Name
                </label>

                <Input
                  name="companyName"
                  value={
                    item.companyName || ""
                  }
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                />
              </div>

              <div>
                <label className="text-xs">
                  City
                </label>

                <Input
                  name="city"
                  value={item.city || ""}
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                />
              </div>

              <div>
                <label className="text-xs">
                  State
                </label>

                <Input
                  name="state"
                  value={item.state || ""}
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                />
              </div>

              <div>
                <label className="text-xs">
                  Start Date
                </label>

                <Input
                  type="date"
                  name="startDate"
                  value={
                    item.startDate || ""
                  }
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                />
              </div>

              <div>
                <label className="text-xs">
                  End Date
                </label>

                <Input
                  type="date"
                  name="endDate"
                  disabled={
                    item.currentlyWorking
                  }
                  value={
                    item.currentlyWorking
                      ? ""
                      : item.endDate || ""
                  }
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                />

                <div className="flex items-center gap-2 mt-2">
                  <input
                    id={`current-${index}`}
                    type="checkbox"
                    checked={
                      item.currentlyWorking ||
                      false
                    }
                    onChange={(e) =>
                      handleCurrentlyWorking(
                        index,
                        e.target.checked
                      )
                    }
                  />

                  <label
                    htmlFor={`current-${index}`}
                    className="text-xs cursor-pointer"
                  >
                    Currently Working
                  </label>
                </div>
              </div>

              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={
                    item.workSummery || ""
                  }
                  onRichTextEditorChange={(
                    event
                  ) =>
                    handleRichTextEditor(
                      event,
                      "workSummery",
                      index
                    )
                  }
                />
              </div>
                          </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewExperience}
          >
            + Add More Experience
          </Button>

          <Button
            variant="outline"
            onClick={RemoveExperience}
            disabled={experinceList.length <= 1}
          >
            - Remove
          </Button>
        </div>

        <Button
          disabled={loading}
          onClick={onSave}
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
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

export default Experience;