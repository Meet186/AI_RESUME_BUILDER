import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../../../Context/ResumeInfoContext";
import { Input } from "../../../../../../components/ui/input";
import { Button } from "../../../../../../components/ui/button";
import { useParams } from "react-router";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
const PersonalDetails = ({ enableNext }) => {
    const params = useParams();

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const [formData, setFormData] = useState({ ...resumeInfo });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(resumeInfo?.userImage || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData({ ...resumeInfo });
        setPreviewImage(resumeInfo?.userImage || "");
    }, [resumeInfo]);

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

    const handleFileChange = (e) => {
        enableNext(false);
        const file = e.target.files?.[0] || null;
        setImageFile(file);

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const onSave = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                jobTitle: formData.jobTitle,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
            };
            if (imageFile) {
                const uploadRes = await GlobalApi.uploadUserImage(imageFile);
                const fileData = uploadRes?.data?.[0];

                if (fileData?.id) {
                    payload.userImage = fileData.id;
                }

                if (fileData?.url) {
                    const imageUrl = fileData.url.startsWith("http")
                        ? fileData.url
                        : `http://localhost:1337${fileData.url}`;
                    setPreviewImage(imageUrl);
                }
            }

            await GlobalApi.updateResumeDetails(params?.resumeId, payload);

            setResumeInfo({
                ...resumeInfo,
                ...payload,
                userImage: previewImage || resumeInfo.userImage,
            });

            toast.success("Resume updated successfully");
            enableNext(true);
        } catch (error) {
            console.error("Resume update failed", error?.response?.data || error);
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
                            defaultValue={resumeInfo?.firstName}
                            value={formData.firstName || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Last Name</label>
                        <Input
                            name="lastName"
                            required
                            defaultValue={resumeInfo?.lastName}
                            value={formData.lastName || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label>Job Title</label>
                        <Input
                            name="jobTitle"
                            required
                            defaultValue={resumeInfo?.jobTitle}
                            value={formData.jobTitle || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label>Address</label>
                        <Input
                            name="address"
                            required
                            defaultValue={resumeInfo?.address}
                            value={formData.address || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label>Phone</label>
                        <Input
                            name="phone"
                            required
                            defaultValue={resumeInfo?.phone}
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
                            defaultValue={resumeInfo?.email}
                            value={formData.email || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    {resumeInfo?.template === "creative" &&  (
                        <div className="col-span-2">
                            <label>Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            
                        </div>
                    )}

                     {resumeInfo?.template === "classic" &&  (
                        <div className="col-span-2">
                            <label>Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            
                        </div>
                    )}
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