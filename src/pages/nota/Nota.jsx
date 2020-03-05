import React, {useRef, useState, useEffect} from 'react'
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/loaderButton/LoaderButton";
import {API, Storage} from 'aws-amplify'
import config from "../../config";
import "./Nota.css";
import {s3Upload} from '../../libs/awsLib'

export default function Notes(props) {
    const file = useRef(null)
    const [note, setNote] = useState(null)
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        async function loadNote() {
            const notes = await API.get('notes', `/notes`)
            const nota = notes.filter(nota => {
                if(nota.noteId === props.match.params.id) {
                    return nota
                } 
            })
            return nota
        }

        async function onLoad() {
            try {
                const note = await loadNote()
                const {content, attachment} = note[0]

                if(attachment) {
                    note[0].attachmentURL = await Storage.vault.get(attachment)
                }

                setContent(content)
                setNote(note[0])
                console.log(note)
                console.log(content)
                console.log(attachment)
            } catch(e) {
                alert(e)
            }
        }
        onLoad()
    }, [props.match.params.id])

    function validateForm() {
        return content.length > 0;
      }
      
      function formatFilename(str) {
        return str.replace(/^\w+-/, "");
      }
      
      function handleFileChange(event) {
        file.current = event.target.files[0];
      }
      
      function saveNote(note) {
        return API.put("notes", `/notes/${props.match.params.id}`, {
          body: note
        });
      }

    async function handleSubmit(event) {
        let attachment;

        event.preventDefault();
        
        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
            `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB.`
            );
            return;
        }
        
        setIsLoading(true);
        
        try {
            if (file.current) {
            attachment = await s3Upload(file.current);
            }
        
            await saveNote({
            content,
            attachment: attachment || note.attachment
            });
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }
      
    async function handleDelete(event) {
        event.preventDefault();
        
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );
        
        if (!confirmed) {
            return;
        }
        
        setIsDeleting(true);

        try {
            await deleteNote()
            await deleteImg()
            props.history.push('/')
        } catch(e) {
            alert(e)
            setIsDeleting(false)
        }
    }

    function deleteNote() {
        return API.del("notes", `/notes/${props.match.params.id}`);
    }

    async function deleteImg() {
        if(note.attachment) {
            const result = await Storage.vault.remove(note.attachment)
            console.log('remove Img ', result)
            return result
        }
    }

    return (
        <div className="Notes">
            {note && (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="content">
                <FormControl
                    value={content}
                    componentClass="textarea"
                    onChange={e => setContent(e.target.value)}
                />
                </FormGroup>
                {note.attachment && (
                    <FormGroup>
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl.Static>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={note.attachmentURL}
                        >
                            {formatFilename(note.attachment)}
                        </a>
                        </FormControl.Static>
                    </FormGroup>
                )}
                <FormGroup controlId="file">
                    {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
                    <FormControl onChange={handleFileChange} type="file" />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                Save
                </LoaderButton>
                <LoaderButton
                    block
                    bsSize="large"
                    bsStyle="danger"
                    onClick={handleDelete}
                    isLoading={isDeleting}
                >
                Delete
                </LoaderButton>
            </form>
            )}
        </div>
    )
}