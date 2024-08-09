import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
// import FileHandler from '@tiptap-pro/extension-file-handler'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "../../assets/css/tiptap.css"

import { FaBold, FaItalic, FaStrikethrough  } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";

import { LuPanelRightOpen } from 'react-icons/lu'


function NewPost() {

    const limit = 2000

    const editor = useEditor({
        extensions: [StarterKit, Document, Paragraph, Text, Image, Dropcursor,
            CharacterCount.configure({
                limit,
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                      return 'What’s the title?'
                    }
                
                    return 'Escreva aqui a proxima canetada da Thelma Barcellos.... (ksksksks)'
                  },                
                emptyEditorClass: 'is-editor-empty',

            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            // FileHandler.configure({
            //     allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            //     onDrop: (currentEditor, files, pos) => {
            //       files.forEach(file => {
            //         const fileReader = new FileReader()
        
            //         fileReader.readAsDataURL(file)
            //         fileReader.onload = () => {
            //           currentEditor.chain().insertContentAt(pos, {
            //             type: 'image',
            //             attrs: {
            //               src: fileReader.result,
            //             },
            //           }).focus().run()
            //         }
            //       })
            //     },
            //     onPaste: (currentEditor, files, htmlContent) => {
            //       files.forEach(file => {
            //         if (htmlContent) {
            //           // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
            //           // you could extract the pasted file from this url string and upload it to a server for example
            //           console.log(htmlContent) // eslint-disable-line no-console
            //           return false
            //         }
        
            //         const fileReader = new FileReader()
        
            //         fileReader.readAsDataURL(file)
            //         fileReader.onload = () => {
            //           currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
            //             type: 'image',
            //             attrs: {
            //               src: fileReader.result,
            //             },
            //           }).focus().run()
            //         }
            //       })
            //     },                   
            // })
                      
        ],
        content: '',
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
            <header className='flex items-center justify-between p-10'>
                <a href="/dashboard">
                    <MdKeyboardArrowLeft className='w-8 h-8 ml-16' />
                </a>
                
                <LuPanelRightOpen />

            </header>
            

                

            {editor && 
                <FloatingMenu 
                    editor={editor}
                    shouldShow={({ state }) => {
                        const { $from } = state.selection
                        const currentLineText = $from.nodeBefore?.textContent

                        return currentLineText === '/'
                    }}
                >
                    <div className="flex gap-2 p-2 bg-zinc-600 rounded-lg text-white">
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={editor.isActive('heading', { level: 1 }) ? 'text-yellow-400' : 'hover:text-yellow-400'}
                        >
                            H1
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor.isActive('heading', { level: 2 }) ? 'text-yellow-400' : 'hover:text-yellow-400'}
                        >
                            H2
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'text-yellow-400' : 'hover:text-yellow-400'}
                        >
                            Bullet list
                        </button>
                    </div>
                </FloatingMenu>
            }

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

            <div className={`character-count ${editor?.storage.characterCount.characters() === limit ? 'character-count--warning' : ''}`}>

                <div className='h-10 w-10 justify-center align-middle items-center p-[10px]'>
                    <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        >
                        <circle
                            r="10"
                            cx="10"
                            cy="10"
                            fill="#e9ecef"
                        />
                        <circle
                            r="5"
                            cx="10"
                            cy="10"
                            fill="transparent"
                            stroke="purple"
                            strokeWidth="10"
                            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                            transform="rotate(-90) translate(-20)"
                        />
                        <circle
                            r="6"
                            cx="10"
                            cy="10"
                            fill="white"
                        />
                    </svg>
                </div>

                <div>
                    {editor?.storage.characterCount.characters()} / {limit} characters
                    <br />
                    {editor?.storage.characterCount.words()} words
                </div>
            </div>
            
        </>
    )
}

export { NewPost }