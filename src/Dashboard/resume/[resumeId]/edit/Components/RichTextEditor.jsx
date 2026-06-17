import { Brain, LoaderCircle } from 'lucide-react';
import { useContext, useState } from 'react';
import Editor, {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg';
import { Button } from '../../../../../components/ui/button';
import { toast } from 'sonner';
import { ResumeInfoContext } from '../../../../../Context/ResumeInfoContext';
import { AIChatSession } from '../../../../../../service/AIMODEL';
const RichTextEditor = ({ onRichTextEditorChange, index }) => {
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    // const normalizeListHtml = (html) => {
    //     if (!html) return "";

    //     return html
    //         .replace(
    //             /<ul>/g,
    //             '<ul style="list-style-type: disc; padding-left: 1.25rem; margin: 0.25rem 0;">'
    //         )
    //         .replace(
    //             /<ol>/g,
    //             '<ol style="list-style-type: decimal; padding-left: 1.25rem; margin: 0.25rem 0;">'
    //         )
    //         .replace(
    //             /<li>/g,
    //             '<li style="margin-bottom: 0.25rem;">'
    //         );
    // };
    function onChange(e) {
        setValue(e.target.value);
    }
    const GenerateSummeryFromAI = async () => {
        const PROMPT = `
Position Title: {positionTitle}

Generate 5-7 professional resume experience points.

Return ONLY JSON:

{
  "experience_points": [
    "point 1",
    "point 2",
    "point 3"
  ]
}

No HTML.
No Markdown.
No explanation.
`;

        const experienceTitle =
            resumeInfo?.experience?.[index]?.title;

        if (!experienceTitle) {
            toast.error("Please Add Position Title");
            return;
        }

        setLoading(true);

        try {
            const prompt = PROMPT.replace(
                "{positionTitle}",
                experienceTitle
            );

            const result = await AIChatSession(prompt);

            console.log("Raw AI Response:", result);

            if (!Array.isArray(result?.experience_points)) {
                toast.error("Invalid AI response");
                return;
            }

            // Create editable paragraphs
            const htmlContent = result.experience_points
                .map(
                    (point) =>
                        `<p>${point}</p>`
                )
                .join("");

            setValue(htmlContent);

            onRichTextEditorChange({
                target: {
                    value: htmlContent,
                },
            });

            toast.success(
                "Experience generated successfully!"
            );
        } catch (error) {
            console.error(error);
            toast.error(
                "Failed to generate experience summary"
            );
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>

            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summery</label>
                <Button variant="outline" size="sm"
                    onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary">
                    {loading ?
                        <LoaderCircle className='animate-spin' /> :
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    }
                </Button>
            </div>
            <Editor value={value} onChange={(e) => {
                setValue(e.target.value);
                onRichTextEditorChange(e)
            }}>
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />


                </Toolbar>
            </Editor>

        </div>
    );
}

export default RichTextEditor
