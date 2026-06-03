import React, { useState } from "react";
import { Loader2, PlusSquare } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../../components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from '@clerk/react'
import { useNavigate, useNavigation } from "react-router";
const AddResume = () => {
    const [dialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState("");
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();
    const onCreate = async () => {
        setLoading(true);
        const title = resumeTitle.trim();
        if (!title) return;
        const uuid = uuidv4();
        const data = {
            title: resumeTitle,
            resume_id: uuid,
            user_email: user?.primaryEmailAddress?.emailAddress,
            user_name: user?.fullName
        };
        try {
            const resp = await GlobalApi.CreateNewResume(data);
            

            if (resp) {
                setLoading(false);
                navigation('/dashboard/resume/' + resp.data.data.documentId + '/edit')
            }
        } catch (error) {
            console.log("Full Error:", error);
            console.log("Response:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div
                className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>

            <Dialog open={dialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>

                        <DialogDescription>
                            Add a title for your resume
                        </DialogDescription>

                        <Input
                            className="my-2"
                            placeholder="Ex. Full Stack Resume"
                            value={resumeTitle}
                            onChange={(e) => setResumeTitle(e.target.value)}
                        />

                        <div className="flex justify-end gap-5">
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setResumeTitle("");
                                    setOpenDialog(false);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                disabled={!resumeTitle.trim() || loading}
                                onClick={onCreate}

                            >
                                {
                                    loading ?
                                        <Loader2 className="animate-spin" /> : 'Create'
                                }
                                Create
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddResume;