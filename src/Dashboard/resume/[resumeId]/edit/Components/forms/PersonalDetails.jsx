import React, { useContext, useState } from "react";
import { ResumeInfoContext } from "../../../../../../Context/ResumeInfoContext";
import { Input } from "../../../../../../components/ui/input";
import { Button } from "../../../../../../components/ui/button";
import { useParams } from "react-router";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
const PersonalDetails = ({ enableNext }) => {
    const params = useParams();

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        enableNext(false);

        const { name, value } = e.target;

        const updatedData = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedData);

        setResumeInfo({
            ...resumeInfo,
            [name]: value,
        });
    };

    const onSave = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            await GlobalApi.updateResumeDetails(params?.resumeId, {
                data: formData,
            });

            toast.success("Resume updated successfully");
            enableNext(true);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update resume");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Personal Details</h2>
            <p>Get started with the basic information</p>

            <form onSubmit={onSave}>
                <div className="grid grid-cols-2 mt-5 gap-3">
                    <div>
                        <label>First Name</label>
                        <Input
                            name="firstName"
                            required
                            value={formData.firstName || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Last Name</label>
                        <Input
                            name="lastName"
                            required
                            value={formData.lastName || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label>Job Title</label>
                        <Input
                            name="jobTitle"
                            required
                            value={formData.jobTitle || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label>Address</label>
                        <Input
                            name="address"
                            required
                            value={formData.address || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label>Phone</label>
                        <Input
                            name="phone"
                            required
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label>Email</label>
                        <Input
                            name="email"
                            type="email"
                            required
                            value={formData.email || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mt-5 flex justify-end">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalDetails;