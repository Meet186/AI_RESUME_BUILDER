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
import { useParams } from "react-router";

const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummery: "",
};

const Experience = ({ enableNext }) => {
    const [loading, setLoading] = useState(false);
    const [experinceList, setExperinceList] = useState([]);
     const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);


    const params = useParams();

    useEffect(() => {
        resumeInfo?.personal_Experience?.length > 0 && setExperinceList(resumeInfo?.personal_Experience)

    }, [])


    const handleChange = (
        index,
        event
    ) => {
        const { name, value } = event.target;

        const newEntries = [...experinceList];

        newEntries[index] = {
            ...newEntries[index],
            [name]: value,
        };

        setExperinceList(newEntries);
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

        setExperinceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperinceList([
            ...experinceList,
            { ...formField },
        ]);
    };

    const RemoveExperience = () => {
        if (experinceList.length > 1) {
            setExperinceList((prev) =>
                prev.slice(0, -1)
            );
        }
    };

    const onSave = async () => {
        try {
            enableNext(false);
            setLoading(true);

            const data = {
                data: {
                    personal_Experience:
                        experinceList.map(
                            ({ id, ...rest }) => rest
                        ),
                },
            };

            console.log(
                "FINAL PAYLOAD =>",
                JSON.stringify(data, null, 2)
            );

            const res =
                await GlobalApi.updateResumeDetails(
                    params.resumeId,
                    data
                );

            console.log(
                "SAVE RESPONSE =>",
                res.data
            );

            enableNext(true);
            toast.success(
                "Experience Updated Successfully"
            );
        } catch (error) {
            console.error(error);
            toast.error(
                "Failed to update experience"
            );
        } finally {
            setLoading(false);
        }
    };

      useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            personal_Experience:experinceList
        });
     
    },[experinceList]);

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">
                Professional Experience
            </h2>

            <p>Add Your previous Job experience</p>

            <div>
                {experinceList?.map(
                    (item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">

                                <div>
                                    <label className="text-xs">
                                        Position Title
                                    </label>

                                    <Input
                                        name="title"
                                        value={
                                            item?.title || ""
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                index,
                                                event
                                            )
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
                                            item?.companyName ||
                                            ""
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                index,
                                                event
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="text-xs">
                                        City
                                    </label>

                                    <Input
                                        name="city"
                                        value={
                                            item?.city || ""
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                index,
                                                event
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="text-xs">
                                        State
                                    </label>

                                    <Input
                                        name="state"
                                        value={
                                            item?.state || ""
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                index,
                                                event
                                            )
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
                                            item?.startDate ||
                                            ""
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                index,
                                                event
                                            )
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
                                        value={
                                            item?.endDate || ""
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                index,
                                                event
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-span-2">
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={
                                            item?.workSummery ||
                                            ""
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
                    )
                )}
            </div>

            <div className="flex justify-between">
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
                        disabled={
                            experinceList.length === 1
                        }
                    >
                        - Remove
                    </Button>
                </div>

                <Button
                    disabled={loading}
                    onClick={onSave}
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

export default Experience;