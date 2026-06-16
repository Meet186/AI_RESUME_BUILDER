import { useState } from 'react';
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
const RichTextEditor = ({onRichTextEditorChange}) => {
    const [value, setValue] = useState('simple text');

    function onChange(e) {
        setValue(e.target.value);
    }

    return (
        <div>
           
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
