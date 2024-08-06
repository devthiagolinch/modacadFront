import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { InitialContent } from "../assets/utils/content";

function NewPost() {

    const editor = useEditor({
        extensions: [StarterKit],
        content: InitialContent,
        editorProps: {
            attributes: {
                class: 'outline-none'
            }
        }
    })
    
    return(
        <EditorContent
        className="max-w-[700px] mx-auto pt-16 prose prose-violet"
        editor={editor} />
    )
}

export { NewPost }