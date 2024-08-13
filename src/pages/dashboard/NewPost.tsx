import CharacterCount from '@tiptap/extension-character-count'
import Blockquote from '@tiptap/extension-blockquote'
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "../../assets/css/tiptap.css";
import imageBanner from "../../assets/imgs/model.jpg"

import { FaBold, FaItalic, FaStrikethrough  } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";

import { LuPanelRightOpen } from 'react-icons/lu'
import { useState } from 'react'


function NewPost() {
    const [editorContent, setEditorContent] = useState("");

    

    const limit = 2000

    const editor = useEditor({
        extensions: [StarterKit, Document, Paragraph, Text, Image, Dropcursor, Blockquote, TableRow,
            TableHeader,
            TableCell,
            CharacterCount.configure({
                limit,
            }),
            Blockquote.configure({
                HTMLAttributes: {
                  class: 'blockquote',
                },
              }),
              Heading.configure({
                levels: [1, 2, 3],
              }),
              Heading.configure({
                HTMLAttributes: {
                  class: 'my-custom-class',
                },
              }),              
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                      return 'What’s the title?'
                    }
                
                    return 'Escreva aqui a proxima canetada da Thelma Barcellos...'
                  },                
                emptyEditorClass: 'is-editor-empty',

            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Table.configure({
                HTMLAttributes: {
                  class: 'table',
                  resizable: true,
                },
              }),
            
                      
        ],
        content: '',
        onUpdate({ editor }) {
            setEditorContent(editor.getHTML());
            console.log(editorContent)
          },
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
        <div>          
            <header className='flex items-center justify-between p-10'>
                <a href="/">
                    <MdKeyboardArrowLeft className='w-8 h-8 ml-16' />
                </a>
                
                <LuPanelRightOpen />

            </header>
            

            <div className='flex flex-col gap-5 ml-[215px]'>
                <div className='flex items-center'>
                    <img src={imageBanner} alt="" className='h-[500px] object-cover' />
                </div>

                <div className='w-[70%]'>
                    <input type="text" placeholder='Digite aqui o titulo dessa canetada'
                        className='w-full mb-[20px] bg-transparent
                                text-[36px] font-montserratRegular
                                shadow-sm placeholder-[#7d7d7d] text-left
                                focus:outline-none
                                disabled:bg-slate-50 disabled:text-[#202020] disabled:border-slate-200 disabled:shadow-none'
                    />
                </div>

                <div>
                    <input type="text" placeholder='Descrição descreva seu texto em poucas palavras...'
                        className='w-full mb-[20px] bg-transparent
                        text-[16px] font-montserratLight
                        shadow-sm placeholder-[#7d7d7d] text-left
                        focus:outline-none
                        disabled:bg-slate-50 disabled:text-[#202020] disabled:border-slate-200 disabled:shadow-none'
                    />
                </div>
            </div>

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
                    
                    <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={editor.isActive('blockquote') ? 'is-active' : ''}
                        >
                            Toggle blockquote
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setBlockquote().run()}
                            disabled={!editor.can().setBlockquote()}
                        >
                            Set blockquote
                        </button>
                        <button
                            onClick={() => editor.chain().focus().unsetBlockquote().run()}
                            disabled={!editor.can().unsetBlockquote()}
                        >
                            Unset blockquote
                        </button>
                </div>
            </BubbleMenu>}
            
            <EditorContent
                className="xl:min-w-[70%] xl:max-w-[80%] mx-auto pt-16 prose"
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
            
        </div>
    )
}

export { NewPost }