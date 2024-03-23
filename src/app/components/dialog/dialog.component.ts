import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteData } from 'src/app/core/interfaces/note-data';
import { NotesService } from 'src/app/core/services/notes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(private _NotesService:NotesService, private _ToastrService:ToastrService ,  public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteData,){}

  noteForm:FormGroup = new FormGroup({
    title:new FormControl(this.data.title?this.data.title : '' ) ,
    content:new FormControl(this.data.content?this.data.content : '') ,
  })

  AddAndUpdateNotes(){
    console.log(this.noteForm);
    if(!this.data.title && !this.data.content)
    {
      this.addNewNote(this.noteForm.value)
      this._ToastrService.success('the note is added successfully')
    }
    else
    {
      this.updateNewNote(this.noteForm.value)
      this._ToastrService.success('the note is updated successfully')
    }
  }


  addNewNote(newnote:NoteData){
    this._NotesService.addNoteApi(newnote).subscribe({
      next:(res)=>
      {
        if(res.msg === 'done')
        {
          console.log(res);
          this.dialogRef.close() ;
        }
      }
    })
  }


  updateNewNote(newnote:NoteData){
    this._NotesService.updateUserNoteApi(newnote, this.data._id).subscribe({
      next:(res)=>
      {
        if(res.msg === 'done')
        {
          console.log(res);
          this.dialogRef.close() ;
        }
      }
    })
  }


 
}
