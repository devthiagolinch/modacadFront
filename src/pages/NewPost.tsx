import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Dropcursor from '@tiptap/extension-dropcursor'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { FaBold, FaItalic, FaStrikethrough  } from "react-icons/fa";


import { InitialContent } from "../assets/utils/content";

function NewPost() {
    const limit = 500

    const editor = useEditor({
        extensions: [StarterKit, Document, Paragraph, Text, Image, Dropcursor,
            CharacterCount.configure({
                limit,
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            FileHandler.configure({
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                onDrop: (currentEditor, files, pos) => {
                  files.forEach(file => {
                    const fileReader = new FileReader()
        
                    fileReader.readAsDataURL(file)
                    fileReader.onload = () => {
                      currentEditor.chain().insertContentAt(pos, {
                        type: 'image',
                        attrs: {
                          src: fileReader.result,
                        },
                      }).focus().run()
                    }
                  })
                },
                onPaste: (currentEditor, files, htmlContent) => {
                  files.forEach(file => {
                    if (htmlContent) {
                      // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                      // you could extract the pasted file from this url string and upload it to a server for example
                      console.log(htmlContent) // eslint-disable-line no-console
                      return false
                    }
        
                    const fileReader = new FileReader()
        
                    fileReader.readAsDataURL(file)
                    fileReader.onload = () => {
                      currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                        type: 'image',
                        attrs: {
                          src: fileReader.result,
                        },
                      }).focus().run()
                    }
                  })
                },                   
            })
                      
        ],
        content: InitialContent,
        editorProps: {
            attributes: {
                class: 'outline-none'
            }
        }
    })

    const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0

    
    return(
        <>
            <div className={`flex float-right text-[0.75rem] p-5 ${editor?.storage.characterCount.characters() === limit ? '' : ''}`}>

                <div className='h-10 w-10 justify-center align-middle items-center p-[10px]'>
                    <svg>
                        <circle
                            r="5"
                            cx="10"
                            cy="10"
                            fill="transparent"
                            stroke="purple"
                            strokeWidth="10"
                            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                            transform="rotate(-90) translate(-20)" />

                        <circle
                            r="6"
                            cx="10"
                            cy="10"
                            fill="white" />
                    </svg>
                </div>

                <div>
                    {editor?.storage.characterCount.characters()} / {limit} characters
                    <br />
                    {editor?.storage.characterCount.words()} words
                </div>

            </div>

            {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="flex p-2 gap-2 bg-gray-950 drop-shadow-xl text-zinc-300 text-sm rounded-lg overflow-hidden leading-none">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'text-yellow-400 p-1' : 'p-1 items-center'}
                    >
                        <FaBold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'text-yellow-400 p-1' : ''}
                    >
                        <FaItalic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'text-yellow-400 p-1' : 'p-1'}
                    >
                        <FaStrikethrough />
                    </button>
                </div>
            </BubbleMenu>}
            
            <EditorContent
                className="max-w-[700px] mx-auto pt-16 prose prose-violet"
                editor={editor} 
            />
        </>
    )
}

export { NewPost }