import { useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2Icon, MoreVertical } from "lucide-react";
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";

const ResumeCardItem = ({
  resume,
  refreshData,
  setResumeList,
}) => {
  const navigation = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

 const onDelete = async () => {
  try {
    setLoading(true);

    await GlobalApi.DeleteResumeById(
      resume.documentId
    );

    await refreshData();

    toast.success("Resume Deleted!");
    setOpenAlert(false);
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete resume");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div
        onClick={() =>
          navigation(
            `/dashboard/resume/${resume.documentId}/edit`
          )
        }
        className="block cursor-pointer"
      >
        <div
          className="
            relative overflow-hidden
            h-[280px]
            rounded-3xl
            bg-gradient-to-br
            from-sky-50
            via-white
            to-violet-100
            border border-white/60
            shadow-lg
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
            group
          "
        >
          {/* Background Glow */}
          <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-pink-300/20 blur-3xl" />
          <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl" />

          {/* Menu */}
          <div
            className="absolute top-3 right-3 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    h-9 w-9 rounded-full
                    bg-white/80 backdrop-blur-md
                    hover:bg-white
                    shadow-md
                  "
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-40"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      navigation(
                        `/dashboard/resume/${resume.documentId}/edit`
                      );
                    }}
                  >
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      navigation(
                        `/my-resume/${resume.documentId}/view`
                      );
                    }}
                  >
                    View
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      navigation(
                        `/my-resume/${resume.documentId}/view`
                      );
                    }}
                  >
                    Download
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-500"
                    onSelect={(e) => {
                      e.preventDefault();
                      setOpenAlert(true);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Image */}
          <div className="flex h-full items-center justify-center">
            <img
              src="/cv.png"
              alt="Resume"
              className="
                relative z-10
                w-36 h-36
                object-contain
                drop-shadow-2xl
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:rotate-2
              "
            />
          </div>

          {/* Footer */}
          <div
            className="
              absolute bottom-0 left-0 right-0
              bg-white/70 backdrop-blur-md
              border-t border-white/50
              p-4
            "
          >
            <h2 className="text-center font-semibold text-slate-700 truncate">
              {resume.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog
        open={openAlert}
        onOpenChange={setOpenAlert}
      >
        <AlertDialogContent
          onClick={(e) => e.stopPropagation()}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will
              permanently delete this resume.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              {loading ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ResumeCardItem;